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

(function trackVisitor() {
    fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => {
            const payload = {
                Timestamp: new Date().toISOString(),
                IP: data.ip // Adjusted for ipify response
            };

            console.log('Payload being sent:', payload); // Debugging

            fetch('https://script.google.com/macros/s/AKfycby18EaOPhs0YB8kyM-gpU0l5jwiatHMZvvhCXlY1nF19DM-RWjCKCbFiz3s4BUIGF99lA/exec?action=visitorData', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status} ${response.statusText}`);
                }
                return response.json();
            })
            .then(result => console.log('Data sent successfully:', result))
            .catch(error => console.error('Error sending data:', error));
        })
        .catch(error => console.error('Error fetching IP address:', error));
})();



 // Handle form submission
 const contactForm = document.getElementById('contact-form');
 contactForm.addEventListener('submit', event => {
     event.preventDefault();
     const formData = new FormData(contactForm);

     fetch('https://script.google.com/macros/s/AKfycbw0sBEswu-mIWwc73ObNTXUB5x4uBg7SidWAL30zkUN5jqZKVf89431syu2Q9SStOlWdQ/exec', { 
         method: 'POST',
         body: formData
     })
     .then(() => {
         window.location.href = 'thankyou.html';
     })
     .catch(err => console.error(err));
 });

