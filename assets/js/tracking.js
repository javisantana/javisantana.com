(function() {
    const URL = window.ANALYTICS_URL || 'https://e.javisantana.com';
    const FLUSH_MS = 1000;
    const ANALYTICS_VERSION = '2026-08-06';
    
    if (!URL) return;
    if (
        location.protocol === 'file:' ||
        /^(localhost|127(?:\.[0-9]+){3}|\[::1\])$/.test(location.hostname)
    ) return;
    
    // Device detection
    const getDevice = () => {
        const ua = navigator.userAgent;
        const mobile = /Mobile|Android.*Mobile|iPhone|iPod/.test(ua);
        const tablet = /iPad|Android(?!.*Mobile)/.test(ua);
        let browser = 'other', version = '';
        if (ua.includes('Firefox/')) { browser = 'firefox'; version = ua.match(/Firefox\/(\d+)/)?.[1]; }
        else if (ua.includes('Edg/')) { browser = 'edge'; version = ua.match(/Edg\/(\d+)/)?.[1]; }
        else if (ua.includes('Chrome/')) { browser = 'chrome'; version = ua.match(/Chrome\/(\d+)/)?.[1]; }
        else if (ua.includes('Safari/') && !ua.includes('Chrome')) { browser = 'safari'; version = ua.match(/Version\/(\d+)/)?.[1]; }
        return { browser, version: version || '', mobile: mobile ? 1 : 0, tablet: tablet ? 1 : 0 };
    };
    
    // Session context
    const sessionId = Math.random().toString(36).slice(2, 11);
    const sessionStart = Date.now();
    const device = getDevice();
    
    let queue = [];
    let maxProgress = 0;
    let visibleSections = new Set();
    let lastActivity = sessionStart;
    let reading = true;
    // Wall-clock duration still includes backgrounded tabs; activeMs only counts
    // time while the document is visible so medians are not dominated by idle tabs.
    let activeMs = 0;
    let activeSliceStart = sessionStart;
    let pageVisible = document.visibilityState !== 'hidden';
    
    /*
     * Event types:
     *   start, end, scroll, section_enter, section_exit,
     *   click, select, copy, blur, focus, reached_end
     */
    
    function track(type, data) {
        const event = { type, timestamp: Date.now() - sessionStart };
        if (data) Object.assign(event, data);
        queue.push(event);
    }

    // Public hook so page-level scripts (e.g. the landing survey) can emit
    // custom events through this same batched, self-hosted pipeline.
    window.jsAnalytics = { track };

    function flush() {
        if (!queue.length) return;
        
        const batch = {
            sessionId,
            path: location.pathname,
            referrer: document.referrer || undefined,
            viewportWidth: innerWidth,
            analyticsVersion: ANALYTICS_VERSION,
            events: queue.splice(0)
        };
        
        // Include device and session start time only on first flush
        if (!flush.sent) {
            batch.device = device;
            batch.sessionStart = sessionStart;
            flush.sent = true;
        }
        
        const body = JSON.stringify(batch);
        navigator.sendBeacon
            ? navigator.sendBeacon(URL + '/e', body)
            : fetch(URL + '/e', { method: 'POST', body, keepalive: true }).catch(() => {});
    }
    
    function getProgress() {
        const scrollableHeight = document.documentElement.scrollHeight - innerHeight;
        if (scrollableHeight <= 0) return 100;
        return Math.max(0, Math.min(100, Math.round((scrollY / scrollableHeight) * 100)));
    }
    
    function updateSections() {
        const viewportTop = scrollY;
        const viewportBottom = viewportTop + innerHeight;
        
        document.querySelectorAll('.section').forEach((el, index) => {
            const rect = el.getBoundingClientRect();
            const top = rect.top + scrollY;
            const bottom = top + rect.height;
            const overlap = Math.max(0, Math.min(bottom, viewportBottom) - Math.max(top, viewportTop));
            const visibilityThreshold = Math.min(rect.height * 0.25, innerHeight * 0.25);
            const isVisible = overlap > 0 && overlap >= visibilityThreshold;
            const sectionName = el.dataset.analyticsSection || el.id || `section-${index}`;
            
            if (isVisible && !visibleSections.has(index)) {
                visibleSections.add(index);
                track('section_enter', { sectionIndex: index, sectionName });
            } else if (!isVisible && visibleSections.has(index)) {
                visibleSections.delete(index);
                track('section_exit', { sectionIndex: index, sectionName });
            }
        });
    }
    
    // Scroll
    let scrollTimer;
    addEventListener('scroll', () => {
        const progress = getProgress();
        const isNewMax = progress > maxProgress;
        if (progress > maxProgress) maxProgress = progress;
        lastActivity = Date.now();
        reading = true;
        
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            updateSections();
            track('scroll', { progress, isNewMax: isNewMax ? 1 : 0 });
        }, 150);
    }, { passive: true });
    
    // Click
    document.addEventListener('click', e => {
        const el = e.target;
        const link = el.closest && el.closest('a');
        if (!link) return;

        const section = el.closest && el.closest('[data-analytics-section]');
        const data = {
            x: e.clientX,
            y: e.clientY,
            element: el.tagName,
            section: section?.dataset.analyticsSection,
            href: link.href.slice(0, 200),
            label: link.dataset.analytics || link.textContent.trim().slice(0, 80)
        };
        track('click', data);
    });
    
    // Selection
    let selTimer;
    document.addEventListener('selectionchange', () => {
        const text = getSelection().toString().trim();
        if (text.length > 3 && text.length < 500) {
            clearTimeout(selTimer);
            selTimer = setTimeout(() => track('select', { length: text.length }), 500);
        }
    });
    
    function pauseActiveTime() {
        if (!pageVisible) return;
        activeMs += Date.now() - activeSliceStart;
        pageVisible = false;
    }

    function resumeActiveTime() {
        if (pageVisible) return;
        activeSliceStart = Date.now();
        pageVisible = true;
    }

    function getActiveDurationSeconds() {
        const live = pageVisible ? (Date.now() - activeSliceStart) : 0;
        return Math.round((activeMs + live) / 1000);
    }

    // Visibility
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            reading = false;
            pauseActiveTime();
            track('blur');
            flush();
        } else {
            reading = true;
            lastActivity = Date.now();
            resumeActiveTime();
            track('focus');
        }
    });
    
    // Copy
    document.addEventListener('copy', () => {
        const text = getSelection().toString();
        track('copy', { length: text.length });
    });
    
    // Reached end — prefer the instrumented landing footer when present
    let reachedEnd = false;
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !reachedEnd) {
                reachedEnd = true;
                track('reached_end', {
                    secondsToReach: Math.round((Date.now() - sessionStart) / 1000),
                    activeSecondsToReach: getActiveDurationSeconds()
                });
            }
        });
    }, { threshold: 0.5 });
    
    const footer =
        document.querySelector('[data-analytics-section="footer"]') ||
        document.querySelector('footer');
    if (footer) observer.observe(footer);
    
    // Init
    track('start', { device });
    updateSections();
    
    setInterval(flush, FLUSH_MS);
    
    let sessionEnded = false;
    addEventListener('pagehide', () => {
        if (sessionEnded) return;
        sessionEnded = true;
        pauseActiveTime();
        track('end', {
            duration: Math.round((Date.now() - sessionStart) / 1000),
            activeDuration: getActiveDurationSeconds(),
            maxProgress,
            reachedEnd: reachedEnd ? 1 : 0
        });
        flush();
    });
})();
