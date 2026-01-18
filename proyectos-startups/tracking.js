(function() {
    const URL = window.ANALYTICS_URL || 'https://e.javisantana.com';
    const FLUSH_MS = 1000;
    
    if (!URL) return;
    
    // Device detection (from llms.txt spec)
    const getDevice = () => {
        const ua = navigator.userAgent;
        const mobile = /Mobile|Android.*Mobile|iPhone|iPod/.test(ua);
        const tablet = /iPad|Android(?!.*Mobile)/.test(ua);
        let b = 'other', v = '';
        if (ua.includes('Firefox/')) { b = 'firefox'; v = ua.match(/Firefox\/(\d+)/)?.[1]; }
        else if (ua.includes('Edg/')) { b = 'edge'; v = ua.match(/Edg\/(\d+)/)?.[1]; }
        else if (ua.includes('Chrome/')) { b = 'chrome'; v = ua.match(/Chrome\/(\d+)/)?.[1]; }
        else if (ua.includes('Safari/') && !ua.includes('Chrome')) { b = 'safari'; v = ua.match(/Version\/(\d+)/)?.[1]; }
        return { b, v: v || '', m: mobile ? 1 : 0, t: tablet ? 1 : 0 };
    };
    
    // Session context
    const sid = Math.random().toString(36).slice(2, 11);
    const t0 = Date.now();
    const d = getDevice();
    
    let q = []; // event queue
    let maxP = 0;
    let sections = new Set();
    let lastT = t0;
    let reading = true;
    
    // Event codes: 0=start, 1=end, 2=scroll, 3=section_in, 4=section_out,
    // 5=click, 6=select, 7=copy, 8=blur, 9=focus, 10=reached_end
    
    function t(code, data) {
        const dt = Date.now() - t0;
        q.push(data !== undefined ? [code, dt, data] : [code, dt]);
    }
    
    function flush() {
        if (!q.length) return;
        
        // Batch with shared context (per llms.txt spec)
        const batch = {
            sid: sid,
            u: location.pathname,
            r: document.referrer || undefined,
            w: innerWidth,
            events: q.splice(0)
        };
        
        // Include device only on first flush
        if (!flush.sent) {
            batch.d = d;
            flush.sent = true;
        }
        
        const body = JSON.stringify(batch);
        navigator.sendBeacon
            ? navigator.sendBeacon(URL + '/e', body)
            : fetch(URL + '/e', { method: 'POST', body, keepalive: true }).catch(() => {});
    }
    
    function getProgress() {
        const h = document.documentElement.scrollHeight - innerHeight;
        return h > 0 ? Math.round((scrollY / h) * 100) : 0;
    }
    
    function updateSections() {
        const vTop = scrollY;
        const vBot = vTop + innerHeight;
        
        document.querySelectorAll('.section').forEach((el, i) => {
            const rect = el.getBoundingClientRect();
            const top = rect.top + scrollY;
            const bot = top + rect.height;
            const vis = Math.min(bot, vBot) - Math.max(top, vTop) > rect.height * 0.5;
            
            if (vis && !sections.has(i)) {
                sections.add(i);
                t(3, i);
            } else if (!vis && sections.has(i)) {
                sections.delete(i);
                t(4, i);
            }
        });
    }
    
    // Scroll
    let scrollTimer;
    addEventListener('scroll', () => {
        const p = getProgress();
        if (p > maxP) maxP = p;
        lastT = Date.now();
        reading = true;
        
        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(() => {
            updateSections();
            t(2, [p, p > maxP ? 1 : 0]);
        }, 150);
    }, { passive: true });
    
    // Click
    document.addEventListener('click', e => {
        const el = e.target;
        const data = [e.clientX, e.clientY, el.tagName[0]];
        if (el.tagName === 'A') data.push(el.href.slice(0, 50));
        t(5, data);
    });
    
    // Selection
    let selTimer;
    document.addEventListener('selectionchange', () => {
        const txt = getSelection().toString().trim();
        if (txt.length > 3 && txt.length < 500) {
            clearTimeout(selTimer);
            selTimer = setTimeout(() => t(6, [txt.slice(0, 100), txt.length]), 500);
        }
    });
    
    // Visibility
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            reading = false;
            t(8);
            flush();
        } else {
            reading = true;
            lastT = Date.now();
            t(9);
        }
    });
    
    // Copy
    document.addEventListener('copy', () => {
        const txt = getSelection().toString();
        t(7, [txt.slice(0, 100), txt.length]);
    });
    
    // Reached end
    let ended = false;
    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !ended) {
                ended = true;
                t(10, Math.round((Date.now() - t0) / 1000));
            }
        });
    }, { threshold: 0.5 });
    
    const footer = document.querySelector('footer');
    if (footer) obs.observe(footer);
    
    // Init
    t(0, d);
    updateSections();
    
    setInterval(flush, FLUSH_MS);
    
    addEventListener('beforeunload', () => {
        t(1, [Math.round((Date.now() - t0) / 1000), maxP, ended ? 1 : 0]);
        flush();
    });
})();
