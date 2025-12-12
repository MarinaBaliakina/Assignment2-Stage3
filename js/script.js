// Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', event => {
        event.preventDefault();
        const section = document.querySelector(link.getAttribute('href'));
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact form message
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', event => {
        event.preventDefault();
        alert("Thank you for your message!");
        form.reset();
    });
}

// ORDER NOW button scrolls to contact section
const orderBtn = document.querySelector('.cta-button');
if (orderBtn) {
    orderBtn.addEventListener('click', () => {
        const contact = document.querySelector('#contact');
        if (contact) {
            contact.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Reveal about us elements when scrolled
const revealElements = document.querySelectorAll('.menu-item, .feature');
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
});

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = '0.6s ease';
    revealObserver.observe(el);
});

// Scroll arrow
const scrollBtn = document.getElementById('scrollIndicator');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        scrollBtn.classList.add('scrolled');
    } else {
        scrollBtn.classList.remove('scrolled');
    }
});

scrollBtn.addEventListener('click', () => {
    if (window.scrollY > 100) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const hero = document.querySelector('.hero');
        if (hero) {
            window.scrollTo({ top: hero.offsetHeight, behavior: 'smooth' });
        }
    }
});

// Rotate 3d models on scroll
function rotateModels() {
    const models = document.querySelectorAll('.product model-viewer');
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
    const rotation = (window.scrollY / pageHeight) * 360;

    models.forEach(model => {
        model.setAttribute('camera-orbit', rotation + 'deg auto auto');
    });
}

window.addEventListener('scroll', rotateModels);
window.addEventListener('load', rotateModels);

// Rotate About Us 3d models on scroll
function rotateAboutModels() {
    const models = document.querySelectorAll('.about .feature-icon-3d');
    const scrollY = window.scrollY;
    const pageHeight = document.documentElement.scrollHeight - window.innerHeight;

    const rotation = (scrollY / pageHeight) * 990;
    models.forEach(model => {
        model.setAttribute('camera-orbit', rotation + 'deg 90deg 2m');
    });
}

window.addEventListener('scroll', rotateAboutModels);
window.addEventListener('load', rotateAboutModels);


// Video
const heroVideo = document.getElementById('heroVideo');

let lastY = window.scrollY;
let isReversing = false;
let reverseInterval = null;

function startReverse() {
    if (isReversing) return; 
    isReversing = true;

    heroVideo.pause(); 

    reverseInterval = setInterval(() => {
        heroVideo.currentTime = Math.max(0, heroVideo.currentTime - 0.02);
        if (heroVideo.currentTime <= 0) {
            stopReverse();
        }
    }, 20); 
}

function stopReverse() {
    isReversing = false;
    clearInterval(reverseInterval);
    reverseInterval = null;
}

window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (y > lastY) {
        stopReverse();
        heroVideo.playbackRate = 1.5;
        heroVideo.play();
    } else if (y < lastY) {
        startReverse();
    }

    lastY = y;
});



// Product modal functionality
const modal = document.getElementById('productModal');
const modalModel = document.getElementById('modalModel');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const closeBtn = document.querySelector('.modal .close');
const addToCartBtn = document.getElementById('addToCartBtn');

// Open modal when clicking a cake
document.querySelectorAll('.product').forEach(product => {
    product.addEventListener('click', () => {
        const modelSrc = product.querySelector('model-viewer').getAttribute('src');
        const title = product.querySelector('h3').textContent;
        const description = product.querySelector('p') ? product.querySelector('p').textContent : "Delicious cake from Humber Cakes!";

        modalModel.setAttribute('src', modelSrc);
        modalTitle.textContent = title;
        modalDescription.textContent = description;

        modal.style.display = 'flex';
    });
});

// Close modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside the content
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Add to Cart functionality
addToCartBtn.addEventListener('click', () => {
    alert(`${modalTitle.textContent} added to cart!`);
    modal.style.display = 'none';
});

//About Us Animations (Color Fill)
const features = document.querySelectorAll('.feature');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            features.forEach((box, i) => {
                setTimeout(() => {
                    box.classList.add('show');
                }, i * 400); 
            });
        }
    });
}, { threshold: 0.4 });

observer.observe(document.querySelector('.about-features'));
