(function() {
    const URL = window.ANALYTICS_URL || 'https://e.javisantana.com';
    const FLUSH_MS = 1000;
    const ANALYTICS_VERSION = "2026-11-06";

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
    const visitor = (() => { try { const K = "ja_v", now = Date.now(); let v = JSON.parse(localStorage.getItem(K) || "null"); if (!v || !v.id) v = { id: (crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).slice(2) + now.toString(36)), first: now, last: 0, n: 0 }; const gap = v.last ? now - v.last : null; if (!v.last || gap > 1800000) v.n++; v.last = now; if (/[?&]me=1\b/.test(location.search)) v.owner = 1; localStorage.setItem(K, JSON.stringify(v)); return { id: v.id, firstSeen: v.first, visitN: v.n, sinceLastMs: gap, owner: v.owner || 0 }; } catch (e) { return null; } })();
    const navType = (performance.getEntriesByType && performance.getEntriesByType("navigation")[0] || {}).type;
    let fpDigest = null;
    const fp = (() => {
        try {
            const fnv = (s) => {
                let h = 2166136261;
                const str = String(s == null ? "" : s);
                for (let i = 0; i < str.length; i++) {
                    h ^= str.charCodeAt(i);
                    h = Math.imul(h, 16777619);
                }
                return (h >>> 0).toString(36);
            };
            const mq = (q) => (window.matchMedia && matchMedia(q).matches) ? 1 : 0;
            const uaData = navigator.userAgentData || {};
            const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection || {};
            const digest = (o) => {
                o.hash = fnv([
                    o.screenW, o.screenH, o.availW, o.availH, o.availX, o.availY, o.dpr, o.colorDepth,
                    o.tz, o.tzOffset, o.lang, o.langs, o.platform, o.cores, o.memory, o.touch,
                    o.dark, o.brands, o.uaPlatform, o.canvas, o.glUnmaskedVendor, o.glUnmaskedRenderer,
                    o.glExts, o.fonts, o.audio, o.architecture, o.bitness, o.model, o.platformVersion,
                    o.colorGamut, o.hdr, o.pdf, o.math
                ].join("|"));
                return o;
            };
            let ls = 0, ss = 0;
            try { ls = window.localStorage ? 1 : 0; } catch (e) {}
            try { ss = window.sessionStorage ? 1 : 0; } catch (e) {}
            const out = {
                screenW: screen.width,
                screenH: screen.height,
                availW: screen.availWidth,
                availH: screen.availHeight,
                availX: screen.availLeft || 0,
                availY: screen.availTop || 0,
                dpr: devicePixelRatio || 1,
                colorDepth: screen.colorDepth,
                viewH: innerHeight,
                tz: (Intl.DateTimeFormat().resolvedOptions().timeZone || ""),
                tzOffset: new Date().getTimezoneOffset(),
                lang: navigator.language || "",
                langs: (navigator.languages || []).slice(0, 8).join(","),
                platform: navigator.platform || "",
                cores: navigator.hardwareConcurrency || 0,
                memory: navigator.deviceMemory || 0,
                touch: navigator.maxTouchPoints || 0,
                dark: mq("(prefers-color-scheme: dark)"),
                brands: (uaData.brands || []).map(b => b.brand + "/" + b.version).join(","),
                uaMobile: uaData.mobile ? 1 : 0,
                uaPlatform: uaData.platform || "",
                net: conn.effectiveType || "",
                vendor: navigator.vendor || "",
                cookie: navigator.cookieEnabled ? 1 : 0,
                ls: ls,
                ss: ss,
                idb: window.indexedDB ? 1 : 0,
                pdf: navigator.pdfViewerEnabled ? 1 : 0,
                colorGamut: mq("(color-gamut: rec2020)") ? "rec2020" : mq("(color-gamut: p3)") ? "p3" : mq("(color-gamut: srgb)") ? "srgb" : "",
                hdr: mq("(dynamic-range: high)"),
                motion: mq("(prefers-reduced-motion: reduce)"),
                contrast: mq("(prefers-contrast: more)") ? "more" : mq("(prefers-contrast: less)") ? "less" : "",
                inverted: mq("(inverted-colors: inverted)"),
                forcedColors: mq("(forced-colors: active)"),
                hover: mq("(hover: hover)"),
                pointer: mq("(pointer: fine)") ? "fine" : mq("(pointer: coarse)") ? "coarse" : "",
                orient: ((screen.orientation && screen.orientation.type) || "") + ":" + ((screen.orientation && screen.orientation.angle) || 0),
                math: [Math.tan(-1e300), Math.pow(Math.PI, -100), Math.expm1(1)].join(",")
            };
            try {
                const c = document.createElement("canvas");
                c.width = 280;
                c.height = 60;
                const ctx = c.getContext("2d");
                if (ctx) {
                    ctx.textBaseline = "alphabetic";
                    ctx.fillStyle = "#f60";
                    ctx.fillRect(125, 1, 62, 20);
                    ctx.fillStyle = "#069";
                    ctx.font = "11pt Arial";
                    ctx.fillText("Cwm fjordbank glyphs vext quiz \ud83d\ude00", 2, 15);
                    ctx.fillStyle = "rgba(102, 204, 0, 0.7)";
                    ctx.font = "18pt Times New Roman";
                    ctx.fillText("Cwm fjordbank glyphs vext quiz \ud83d\ude00", 4, 45);
                    ctx.globalCompositeOperation = "multiply";
                    ctx.beginPath();
                    ctx.fillStyle = "rgb(255,0,255)";
                    ctx.arc(50, 30, 20, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.fillStyle = "rgb(0,255,255)";
                    ctx.arc(70, 30, 20, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.beginPath();
                    ctx.fillStyle = "rgb(255,255,0)";
                    ctx.arc(60, 45, 20, 0, Math.PI * 2);
                    ctx.fill();
                    out.canvas = fnv(c.toDataURL());
                }
            } catch (e) {}
            try {
                const gc = document.createElement("canvas");
                const gl = gc.getContext("webgl") || gc.getContext("experimental-webgl");
                if (gl) {
                    const ext = gl.getExtension("WEBGL_debug_renderer_info");
                    out.glVendor = gl.getParameter(gl.VENDOR) || "";
                    out.glRenderer = gl.getParameter(gl.RENDERER) || "";
                    out.glUnmaskedVendor = ext ? (gl.getParameter(ext.UNMASKED_VENDOR_WEBGL) || "") : "";
                    out.glUnmaskedRenderer = ext ? (gl.getParameter(ext.UNMASKED_RENDERER_WEBGL) || "") : "";
                    out.glVersion = gl.getParameter(gl.VERSION) || "";
                    out.glExts = fnv((gl.getSupportedExtensions() || []).join(","));
                }
            } catch (e) {}
            try {
                const base = ["monospace", "sans-serif", "serif"];
                const fonts = ["Arial","Arial Black","Calibri","Cambria","Comic Sans MS","Courier","Courier New","Georgia","Helvetica","Helvetica Neue","Impact","Lucida Console","Lucida Grande","Menlo","Monaco","Palatino","Tahoma","Times","Times New Roman","Trebuchet MS","Verdana","Gill Sans","Futura","Optima","Didot","American Typewriter","Andale Mono","Consolas","Ubuntu","Liberation Sans","Noto Sans","Roboto","SF Pro Text","Segoe UI","Geneva"];
                const span = document.createElement("span");
                span.style.cssText = "position:absolute;left:-9999px;font-size:72px;";
                span.textContent = "mmmmmmmmmmlli";
                document.documentElement.appendChild(span);
                const widths = {};
                for (let i = 0; i < base.length; i++) {
                    span.style.fontFamily = base[i];
                    widths[base[i]] = span.offsetWidth + "x" + span.offsetHeight;
                }
                const found = [];
                for (let i = 0; i < fonts.length; i++) {
                    const f = fonts[i];
                    for (let j = 0; j < base.length; j++) {
                        span.style.fontFamily = JSON.stringify(f) + "," + base[j];
                        if (span.offsetWidth + "x" + span.offsetHeight !== widths[base[j]]) {
                            found.push(f);
                            break;
                        }
                    }
                }
                span.remove();
                out.fonts = found.join(",");
            } catch (e) {}
            try {
                const Ctx = window.OfflineAudioContext || window.webkitOfflineAudioContext;
                if (Ctx) {
                    const actx = new Ctx(1, 44100, 44100);
                    const osc = actx.createOscillator();
                    osc.type = "triangle";
                    osc.frequency.value = 10000;
                    const comp = actx.createDynamicsCompressor();
                    comp.threshold.value = -50;
                    comp.knee.value = 40;
                    comp.ratio.value = 12;
                    comp.attack.value = 0;
                    comp.release.value = 0.25;
                    osc.connect(comp);
                    comp.connect(actx.destination);
                    osc.start(0);
                    actx.oncomplete = (ev) => {
                        try {
                            const data = ev.renderedBuffer.getChannelData(0);
                            let sum = 0;
                            for (let i = 4500; i < 5000; i++) sum += Math.abs(data[i]);
                            out.audio = String(sum);
                            digest(out);
                        } catch (e2) {}
                    };
                    actx.startRendering();
                }
            } catch (e) {}
            try {
                if (uaData.getHighEntropyValues) {
                    uaData.getHighEntropyValues(["architecture","bitness","model","platformVersion","fullVersionList","uaFullVersion"]).then((hi) => {
                        out.architecture = hi.architecture || "";
                        out.bitness = hi.bitness || "";
                        out.model = hi.model || "";
                        out.platformVersion = hi.platformVersion || "";
                        out.uaFullVersion = hi.uaFullVersion || "";
                        out.fullVersionList = (hi.fullVersionList || []).map(b => b.brand + "/" + b.version).join(",");
                        digest(out);
                    }).catch(() => {});
                }
            } catch (e) {}
            try {
                if (navigator.mediaDevices && navigator.mediaDevices.enumerateDevices) {
                    navigator.mediaDevices.enumerateDevices().then((devs) => {
                        out.media = devs.map(d => d.kind.charAt(0)).sort().join("");
                        digest(out);
                    }).catch(() => {});
                }
            } catch (e) {}
            fpDigest = digest;
            return digest(out);
        } catch (e) {
            return null;
        }
    })();
    
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
            if (location.search) batch.search = location.search.slice(0, 500);
            if (visitor) batch.visitor = visitor;
            if (navType) batch.navType = navType;
            if (fp) { if (fpDigest) fpDigest(fp); batch.fp = fp; }
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
