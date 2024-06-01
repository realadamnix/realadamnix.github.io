document.addEventListener('DOMContentLoaded', () => {
    // Smooth Scroll for internal links
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    for (const link of internalLinks) {
        link.addEventListener('click', smoothScroll);
    }

    function smoothScroll(event) {
        event.preventDefault();
        const targetId = event.currentTarget.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

    // Back to Top Button
    const backToTopButton = document.createElement('button');
    backToTopButton.textContent = '↑';
    backToTopButton.classList.add('back-to-top');
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 200) {
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Modal Functionality
    const modal = document.createElement('div');
    modal.classList.add('modal');
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    const closeModal = document.createElement('span');
    closeModal.classList.add('close');
    closeModal.innerHTML = '&times;';
    modalContent.appendChild(closeModal);
    modal.appendChild(modalContent);
    document.body.appendChild(modal);

    const projectLinks = document.querySelectorAll('a[target="_blank"]');
    for (const link of projectLinks) {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const projectDetail = event.currentTarget.textContent;
            modalContent.innerHTML = `<span class="close">&times;</span><p>${projectDetail}</p>`;
            modal.classList.add('show');
        });
    }

    closeModal.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    window.addEventListener('click', (event) => {
        if (event.target == modal) {
            modal.classList.remove('show');
        }
    });
});
