// Countdown Timer
function updateCountdown() {
    const countdownDate = new Date();
    countdownDate.setDate(countdownDate.getDate() + 1); // 24 hours from now

    const now = new Date().getTime();
    const distance = countdownDate.getTime() - now;

    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById('hours')?.textContent = hours.toString().padStart(2, '0');
    document.getElementById('minutes')?.textContent = minutes.toString().padStart(2, '0');
    document.getElementById('seconds')?.textContent = seconds.toString().padStart(2, '0');
}

// Update countdown every second
setInterval(updateCountdown, 1000);
updateCountdown(); // Initial call

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            targetElement.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Robot Network Animation
function createOrbitingAvatars() {
    const orbits = document.querySelectorAll('.orbit');
    const avatarEmojis = ['🚀', '💫', '⭐', '✨', '💡', '🌟'];

    orbits.forEach((orbit, index) => {
        const numberOfAvatars = 3 + index; // More avatars for outer orbits
        const angleStep = 360 / numberOfAvatars;

        for (let i = 0; i < numberOfAvatars; i++) {
            const avatar = document.createElement('div');
            avatar.className = 'avatar';
            avatar.textContent = avatarEmojis[Math.floor(Math.random() * avatarEmojis.length)];

            const angle = angleStep * i;
            const radius = parseInt(orbit.style.width) / 2;

            avatar.style.left = `${radius + Math.cos(angle * Math.PI / 180) * radius}px`;
            avatar.style.top = `${radius + Math.sin(angle * Math.PI / 180) * radius}px`;

            orbit.appendChild(avatar);
        }
    });
}

// Initialize robot network animation
document.addEventListener('DOMContentLoaded', createOrbitingAvatars);

// Intersection Observer for fade-in animations
const fadeElements = document.querySelectorAll('.fade-in');

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    fadeObserver.observe(element);
});

// Form validation
const forms = document.querySelectorAll('form');

forms.forEach(form => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Basic form validation
        const requiredFields = form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });

        if (isValid) {
            // Show success message
            const successMessage = document.createElement('div');
            successMessage.className = 'success-message';
            successMessage.textContent = 'Terima kasih! Kami akan hubungi anda segera.';
            
            form.appendChild(successMessage);
            form.reset();

            // Remove success message after 3 seconds
            setTimeout(() => {
                successMessage.remove();
            }, 3000);
        }
    });
});

// Performance optimization
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('loading');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // Preload critical resources
    const preloadLinks = [
        '/fonts/inter.woff2',
        '/images/hero-bg.svg'
    ];

    preloadLinks.forEach(link => {
        const preloadLink = document.createElement('link');
        preloadLink.rel = 'preload';
        preloadLink.as = link.endsWith('.woff2') ? 'font' : 'image';
        preloadLink.href = link;
        if (link.endsWith('.woff2')) {
            preloadLink.crossOrigin = 'anonymous';
        }
        document.head.appendChild(preloadLink);
    });
});