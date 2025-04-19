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
        userPreference === 'dark' ? enableDarkMode() : disableDarkMode();
    };

    // Event Listeners
    document.querySelectorAll('#dark-mode-toggle').forEach(toggle => {
        toggle.addEventListener('click', () => {
            body.classList.contains('dark-mode') ? disableDarkMode() : enableDarkMode();
        });
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
