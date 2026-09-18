(function () {
  'use strict';

  function ready() {
    const article = document.querySelector('#fde-article .fde-content');
    const trigger = document.getElementById('fde-ask-trigger');
    const panel = document.getElementById('fde-ask-panel');
    const form = document.getElementById('fde-ask-form');
    const closeButton = document.getElementById('fde-ask-close');
    const quote = document.getElementById('fde-ask-quote');
    const question = document.getElementById('fde-ask-question');
    const status = document.getElementById('fde-ask-status');
    const readingTime = document.getElementById('fde-reading-time');
    if (!article || !trigger || !panel || !form) return;

    const track = (type, data) => {
      if (window.jsAnalytics && typeof window.jsAnalytics.track === 'function') {
        window.jsAnalytics.track(type, data);
      }
    };

    const words = article.textContent.trim().split(/\s+/).filter(Boolean).length;
    const minutes = Math.max(1, Math.ceil(words / 210));
    readingTime.textContent = `${minutes} min de lectura`;

    const headings = Array.from(article.querySelectorAll(':scope > h1'));
    headings.forEach((heading, index) => {
      heading.dataset.fdeSection = heading.textContent.trim().slice(0, 120);
      heading.dataset.fdeSectionIndex = String(index);
    });
    track('fde_article_ready', { words, sections: headings.length, readingMinutes: minutes });

    let currentSection = null;
    let sectionStartedAt = 0;
    let sectionFrame = 0;

    function exitCurrentSection() {
      if (!currentSection) return;
      track('fde_section_exit', {
        section: currentSection.dataset.fdeSection,
        sectionIndex: Number(currentSection.dataset.fdeSectionIndex),
        seconds: Math.max(0, Math.round((Date.now() - sectionStartedAt) / 1000))
      });
      currentSection = null;
    }

    function sectionAtViewport() {
      const marker = innerHeight * 0.35;
      let found = headings[0] || null;
      headings.forEach(heading => {
        if (heading.getBoundingClientRect().top <= marker) found = heading;
      });
      return found;
    }

    function updateSection() {
      sectionFrame = 0;
      const next = sectionAtViewport();
      if (!next || next === currentSection) return;
      exitCurrentSection();
      currentSection = next;
      sectionStartedAt = Date.now();
      track('fde_section_enter', {
        section: next.dataset.fdeSection,
        sectionIndex: Number(next.dataset.fdeSectionIndex)
      });
    }

    function requestSectionUpdate() {
      if (!sectionFrame) sectionFrame = requestAnimationFrame(updateSection);
    }

    addEventListener('scroll', requestSectionUpdate, { passive: true });
    addEventListener('resize', requestSectionUpdate, { passive: true });
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) exitCurrentSection();
      else updateSection();
    }, { capture: true });
    updateSection();

    let selectedText = '';
    let selectedSection = '';
    let selectionTimer = 0;
    const coarsePointer = matchMedia('(pointer: coarse)').matches;

    function headingForNode(node) {
      const element = node.nodeType === Node.ELEMENT_NODE ? node : node.parentElement;
      if (!element || !article.contains(element)) return null;
      let previous = element;
      while (previous && previous !== article) {
        let sibling = previous.previousElementSibling;
        while (sibling) {
          if (sibling.matches('h1')) return sibling;
          sibling = sibling.previousElementSibling;
        }
        previous = previous.parentElement;
      }
      return headings[0] || null;
    }

    function hideTrigger() {
      trigger.hidden = true;
    }

    function showTriggerForSelection() {
      if (!panel.hidden) return;
      const selection = getSelection();
      if (!selection || selection.isCollapsed || !selection.rangeCount) {
        hideTrigger();
        return;
      }
      const range = selection.getRangeAt(0);
      const common = range.commonAncestorContainer;
      if (!article.contains(common.nodeType === Node.ELEMENT_NODE ? common : common.parentElement)) {
        hideTrigger();
        return;
      }
      const text = selection.toString().replace(/\s+/g, ' ').trim();
      if (text.length < 4) {
        hideTrigger();
        return;
      }

      selectedText = text.slice(0, 1200);
      selectedSection = headingForNode(range.startContainer)?.dataset.fdeSection || '';
      const rect = range.getBoundingClientRect();
      const width = 48;
      const left = Math.min(innerWidth - width - 8, Math.max(8, rect.left + rect.width / 2 - width / 2));
      const top = rect.top > 48 ? rect.top - 40 : Math.min(innerHeight - 40, rect.bottom + 8);
      trigger.style.left = `${left}px`;
      trigger.style.top = `${Math.max(8, top)}px`;
      trigger.hidden = false;
    }

    function scheduleSelectionCheck(delay) {
      clearTimeout(selectionTimer);
      selectionTimer = setTimeout(showTriggerForSelection, delay);
    }

    document.addEventListener('selectionchange', () => {
      // iOS updates the range several times while its native selection handles
      // are being positioned. Waiting avoids placing our button in their way.
      scheduleSelectionCheck(coarsePointer ? 650 : 80);
    });
    article.addEventListener('pointerup', () => {
      scheduleSelectionCheck(coarsePointer ? 650 : 0);
    });
    article.addEventListener('keyup', showTriggerForSelection);
    addEventListener('scroll', hideTrigger, { passive: true });

    function closePanel() {
      panel.hidden = true;
      status.textContent = '';
      question.value = '';
      trigger.focus();
    }

    trigger.addEventListener('click', () => {
      hideTrigger();
      quote.textContent = `“${selectedText}”`;
      panel.hidden = false;
      track('fde_ask_open', {
        section: selectedSection,
        selectionLength: selectedText.length
      });
      question.focus();
    });

    closeButton.addEventListener('click', closePanel);
    panel.addEventListener('click', event => {
      if (event.target === panel) closePanel();
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && !panel.hidden) closePanel();
    });

    form.addEventListener('submit', event => {
      event.preventDefault();
      const value = question.value.trim();
      if (!value) return;
      track('fde_question', {
        section: selectedSection,
        selectedText,
        selectionLength: selectedText.length,
        question: value,
        questionLength: value.length
      });
      status.textContent = 'enviada';
      question.value = '';
      form.querySelector('[type="submit"]').disabled = true;
      setTimeout(() => {
        form.querySelector('[type="submit"]').disabled = false;
        closePanel();
      }, 700);
    });

    // Capture runs before the site's bubble-phase pagehide handler, so this
    // final event is included in the same sendBeacon flush.
    addEventListener('pagehide', exitCurrentSection, { capture: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ready, { once: true });
  } else {
    ready();
  }
})();
