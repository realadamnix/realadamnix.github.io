document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    // Check if the user has a preference stored in localStorage
    const userPreference = localStorage.getItem('darkModePreference');
    if (userPreference === 'dark') {
        enableDarkMode();
    }

    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
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
        document.querySelectorAll('.navbar a').forEach(link => link.classList.add('dark-mode'));
        document.querySelector('.menu-toggle').classList.add('dark-mode');
        localStorage.setItem('darkModePreference', 'dark');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        document.querySelector('header').classList.remove('dark-mode');
        document.querySelector('main').classList.remove('dark-mode');
        document.querySelector('footer').classList.remove('dark-mode');
        document.querySelectorAll('.welcome-box').forEach(box => box.classList.remove('dark-mode'));
        document.querySelectorAll('section').forEach(section => section.classList.remove('dark-mode'));
        document.querySelectorAll('.navbar a').forEach(link => link.classList.remove('dark-mode'));
        document.querySelector('.menu-toggle').classList.remove('dark-mode');
        localStorage.removeItem('darkModePreference');
    }
});
