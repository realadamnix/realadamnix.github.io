document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdown = document.querySelector('.dropdown');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check if the user has a preference stored in localStorage
    const userPreference = localStorage.getItem('darkModePreference');
    if (userPreference === 'dark') {
        enableDarkMode();
    } else if (userPreference === 'light') {
        disableDarkMode();
    }

    menuToggle.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });

    darkModeToggle.addEventListener('click', () => {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    });

    function enableDarkMode() {
        body.classList.add('dark-mode');
        document.querySelector('header').classList.add('dark-mode');
        document.querySelector('main').classList.add('dark-mode');
        document.querySelector('footer').classList.add('dark-mode');
        document.querySelectorAll('.welcome-box').forEach(box => box.classList.add('dark-mode'));
        document.querySelectorAll('section').forEach(section => section.classList.add('dark-mode'));

        // Store the user's preference in localStorage
        localStorage.setItem('darkModePreference', 'dark');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        document.querySelector('header').classList.remove('dark-mode');
        document.querySelector('main').classList.remove('dark-mode');
        document.querySelector('footer').classList.remove('dark-mode');
        document.querySelectorAll('.welcome-box').forEach(box => box.classList.remove('dark-mode'));
        document.querySelectorAll('section').forEach(section => section.classList.remove('dark-mode'));

        // Store the user's preference in localStorage
        localStorage.setItem('darkModePreference', 'light');
    }

    // Add code to enable dark mode on page load if the user preference is not set to light
    if (userPreference !== 'light' && userPreference !== 'dark') {
        localStorage.setItem('darkModePreference', 'light'); // Set default to light mode
    }
});
