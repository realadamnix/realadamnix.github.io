document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const dropdown = document.querySelector('.dropdown');

    menuToggle.addEventListener('click', () => {
        dropdown.classList.toggle('active');
    });
});
