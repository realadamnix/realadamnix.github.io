(function() {
    // Check system preference immediately
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedPreference = localStorage.getItem('darkModePreference');
    
    // Set initial theme based on saved preference or system preference
    if (savedPreference === 'dark' || (savedPreference === null && prefersDark)) {
        document.body.classList.add('dark-mode');
    }
})();

document.addEventListener('DOMContentLoaded', () => {
    // Dark Mode Elements
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
    const yearSpan = document.getElementById('year');

    // Dark Mode Functions
    const enableDarkMode = () => {
        body.classList.add('dark-mode');
        localStorage.setItem('darkModePreference', 'dark');
    };

    const disableDarkMode = () => {
        body.classList.remove('dark-mode');
        localStorage.setItem('darkModePreference', 'light');
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
    document.querySelectorAll('#dark-mode-toggle').forEach(toggle => {
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
    const progressBar = document.getElementById("scroll-progress");
    if (progressBar) {
        const updateProgress = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = progress + "%";
        };
        window.addEventListener("scroll", updateProgress);
        updateProgress();
    }

    // Typed hero text
    const heroTyped = document.getElementById('hero-typed');
    if (heroTyped) {
        const phrases = [
            'Computer Networks and Systems Management Student',
            'Network Enthusiast',
            'Aspiring Cloud Engineer'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        const typeSpeed = 100;
        const eraseSpeed = 50;
        const delayBetween = 2000;

        const type = () => {
            if (charIndex < phrases[phraseIndex].length) {
                heroTyped.textContent += phrases[phraseIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typeSpeed);
            } else {
                setTimeout(erase, delayBetween);
            }
        };

        const erase = () => {
            if (charIndex > 0) {
                heroTyped.textContent = phrases[phraseIndex].substring(0, charIndex - 1);
                charIndex--;
                setTimeout(erase, eraseSpeed);
            } else {
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, typeSpeed);
            }
        };

        heroTyped.textContent = '';
        type();
    }

    // Reveal animations
    const revealElements = document.querySelectorAll('.reveal');
    if (revealElements.length) {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        revealElements.forEach(el => observer.observe(el));
    }
});

function redirectToThankYou(event) {
    event.preventDefault(); // Prevent the default form submission behavior
    const form = event.target;

    // Submit the form data to the Google Apps Script endpoint
    fetch(form.action, {
        method: form.method,
        body: new FormData(form)
    })
    .then(response => {
        if (response.ok) {
            // Redirect to the Thank You page after successful submission
            window.location.href = "thankyou.html";
        } else {
            alert("Failed to send the message. Please try again later.");
        }
    })
    .catch(error => console.error("Error:", error));
}
