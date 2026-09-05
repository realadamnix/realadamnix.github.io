// Initial theme is applied by a small inline script in each page's <body> so it
// takes effect before first paint (no flash of light mode before this file loads).

document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Elements
    const body = document.body;
    const yearSpan = document.getElementById('year');

    // Dark Mode Functions
    const toggles = document.querySelectorAll('#dark-mode-toggle');

    const reflectToggleState = isDark => {
        toggles.forEach(t => t.setAttribute('aria-pressed', String(isDark)));
    };

    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        localStorage.setItem('darkModePreference', 'dark');
        reflectToggleState(true);
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkModePreference', 'light');
        reflectToggleState(false);
    };

    // Initialize Dark Mode
    const initializeDarkMode = () => {
        const userPreference = localStorage.getItem('darkModePreference');
        const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (userPreference === null) {
            // If no saved preference, use system preference
            systemPreference ? enableDarkMode() : disableDarkMode();
        } else {
            // Use saved preference
            userPreference === 'dark' ? enableDarkMode() : disableDarkMode();
        }
    };

    // Event Listeners
    toggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            body.classList.contains('dark-mode') ? disableDarkMode() : enableDarkMode();
        });
    });

    // Listen for system preference changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (localStorage.getItem('darkModePreference') === null) {
            e.matches ? enableDarkMode() : disableDarkMode();
        }
    });

    // Initial Setup
    initializeDarkMode();
    initTerminal();
    initStatCounters();

    // Update footer year
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });

        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

const prefersReducedMotion = () =>
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function initTerminal() {
    const output = document.getElementById('terminal-output');
    if (!output) return;

    const script = [
        { cmd: 'ping adamnix.com -c 3' },
        { out: 'PING adamnix.com (185.199.108.153): 56 data bytes', d: 300 },
        { out: '64 bytes from 185.199.108.153: icmp_seq=1 ttl=54 time=12.4 ms', d: 700, cls: 't-success' },
        { out: '64 bytes from 185.199.108.153: icmp_seq=2 ttl=54 time=11.8 ms', d: 700, cls: 't-success' },
        { out: '64 bytes from 185.199.108.153: icmp_seq=3 ttl=54 time=12.1 ms', d: 700, cls: 't-success' },
        { out: '3 packets transmitted, 3 received, 0% packet loss', d: 200, cls: 't-dim' },
        { blank: true, d: 500 },
        { cmd: 'show vlan brief', d: 300 },
        { out: 'VLAN  Name                Status    Ports', d: 400 },
        { out: '1     default             active    Gi0/0, Gi0/1', d: 250, cls: 't-success' },
        { out: '10    MANAGEMENT          active    Gi0/2',         d: 250, cls: 't-success' },
        { out: '20    SERVERS             active    Gi0/3',         d: 250, cls: 't-success' },
        { out: '30    GUEST_WIFI          active    Gi1/0',         d: 250, cls: 't-success' },
        { blank: true, d: 500 },
        { cmd: 'whoami', d: 300 },
        { out: 'adam — Final-Year Networking Student  ·  Former IT Intern @ Dell Technologies', d: 300, cls: 't-warn' },
        { blank: true, d: 100 },
        { done: true },
    ];

    const reduceMotion = prefersReducedMotion();
    const sleep = ms => reduceMotion ? Promise.resolve() : new Promise(r => setTimeout(r, ms));

    async function typeCmd(text) {
        output.querySelector('.cursor-line')?.remove();
        const div = document.createElement('div');
        div.className = 'terminal-line';
        const prompt = document.createElement('span');
        prompt.className = 't-prompt';
        prompt.textContent = 'adam@network-lab:~$ ';
        const typed = document.createElement('span');
        div.append(prompt, typed);
        output.appendChild(div);
        if (reduceMotion) {
            typed.textContent = text;
            return;
        }
        for (const ch of text) {
            typed.textContent += ch;
            await sleep(42 + Math.random() * 32);
        }
        await sleep(180);
    }

    function addOut(text, cls) {
        const div = document.createElement('div');
        div.className = `terminal-line${cls ? ' ' + cls : ''}`;
        div.textContent = text;
        output.appendChild(div);
        output.scrollTop = output.scrollHeight;
    }

    async function run() {
        output.innerHTML = '';
        for (const item of script) {
            if (item.d) await sleep(item.d);
            if (item.cmd !== undefined)  { await typeCmd(item.cmd); }
            else if (item.out !== undefined) { addOut(item.out, item.cls); }
            else if (item.blank) { output.appendChild(document.createElement('br')); }
            else if (item.done) {
                const div = document.createElement('div');
                div.className = 'terminal-line cursor-line';
                const prompt = document.createElement('span');
                prompt.className = 't-prompt';
                prompt.textContent = 'adam@network-lab:~$ ';
                const cursor = document.createElement('span');
                cursor.className = 'terminal-cursor';
                cursor.setAttribute('aria-hidden', 'true');
                div.append(prompt, cursor);
                output.appendChild(div);
            }
            output.scrollTop = output.scrollHeight;
        }
    }

    const termCard = output.closest('.card');
    if (!termCard) { run(); return; }
    const obs = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { obs.disconnect(); run(); }
    }, { threshold: 0.1 });
    requestAnimationFrame(() => obs.observe(termCard));
}

function initStatCounters() {
    const counters = document.querySelectorAll('.stat-number');
    if (!counters.length) return;

    const animate = el => {
        const target = Number.parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        if (prefersReducedMotion()) {
            el.textContent = target + suffix;
            return;
        }
        const duration = 1400;
        const start = performance.now();
        const tick = now => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            el.textContent = Math.round(eased * target) + suffix;
            if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };

    const obs = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) { animate(entry.target); obs.unobserve(entry.target); }
        });
    }, { threshold: 0.1 });

    requestAnimationFrame(() => counters.forEach(c => obs.observe(c)));
}
