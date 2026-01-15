 // Script pour le carrousel
 document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.carousel-dot');
    const prevBtn = document.querySelector('.carousel-nav.prev');
    const nextBtn = document.querySelector('.carousel-nav.next');
    let currentSlide = 0;
    let slideInterval;
    
    // Fonction pour changer de slide
    function goToSlide(n) {
        slides[currentSlide].classList.remove('active');
        dots[currentSlide].classList.remove('active');
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');
    }
    
    // Fonction pour passer au slide suivant
    function nextSlide() {
        goToSlide(currentSlide + 1);
    }
    
    // Fonction pour passer au slide précédent
    function prevSlide() {
        goToSlide(currentSlide - 1);
    }
    
    // Démarrer l'autoplay
    function startAutoPlay() {
        slideInterval = setInterval(nextSlide, 5000);
    }
    
    // Arrêter l'autoplay
    function stopAutoPlay() {
        clearInterval(slideInterval);
    }
    
    // Événements pour les boutons de navigation
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        });
    }
    
    // Événements pour les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            stopAutoPlay();
            startAutoPlay();
        });
    });
    
    // Démarrer l'autoplay au chargement
    startAutoPlay();
    
    // Arrêter l'autoplay au survol
    const carousel = document.querySelector('.carousel-container');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopAutoPlay);
        carousel.addEventListener('mouseleave', startAutoPlay);
    }
    
    // Menu mobile
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.className = 'fas fa-bars';
            } else {
                icon.className = 'fas fa-times';
            }
        });
        
        // Fermer le menu mobile en cliquant sur un lien
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            });
        });
    }
    
    // Back to top button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-10');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
            backToTopBtn.classList.add('opacity-0', 'translate-y-10');
        }
    });
    
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth scrolling pour les ancres
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Gestion du formulaire de contact
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Récupération des valeurs du formulaire
            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const message = document.getElementById('message').value;
            
            // Validation simple
            if (!name || !phone || !email) {
                alert('Veuillez remplir les champs obligatoires (nom, téléphone, email)');
                return;
            }
            
            // Simulation d'envoi
            alert(`Merci ${name} ! Votre message a été envoyé. Nous vous contacterons au ${phone} dans les plus brefs délais.`);
            
            // Réinitialisation du formulaire
            contactForm.reset();
        });
    }
    
    // Adaptation responsive pour le carrousel
    function adjustCarouselForMobile() {
        const carouselContainer = document.querySelector('.carousel-container');
        if (window.innerWidth < 768) {
            // Sur mobile, on veut que le contenu soit plus facilement accessible
            carouselContainer.style.height = 'auto';
            carouselContainer.style.minHeight = '800px';
        } else {
            carouselContainer.style.height = '680px';
            carouselContainer.style.minHeight = 'auto';
        }
    }
    
    // Appeler la fonction au chargement et au redimensionnement
    adjustCarouselForMobile();
    window.addEventListener('resize', adjustCarouselForMobile);
});