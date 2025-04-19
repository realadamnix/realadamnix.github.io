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
