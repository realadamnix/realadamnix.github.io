document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdown = document.querySelector('.dropdown');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;

    menuToggle.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });

    darkModeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');
        document.querySelector('header').classList.toggle('dark-mode');
        document.querySelector('main').classList.toggle('dark-mode');
        document.querySelector('footer').classList.toggle('dark-mode');
        document.querySelectorAll('.welcome-box').forEach(box => box.classList.toggle('dark-mode'));
        document.querySelectorAll('section').forEach(section => section.classList.toggle('dark-mode'));
    });
});
