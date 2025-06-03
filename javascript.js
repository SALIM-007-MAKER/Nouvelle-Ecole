// Effets de particules
        document.addEventListener('DOMContentLoaded', function() {
            const particlesContainer = document.getElementById('particles');
            const particleCount = 50;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.classList.add('particle');
                
                // Position aléatoire
                const posX = Math.random() * window.innerWidth;
                const posY = Math.random() * window.innerHeight;
                
                // Taille aléatoire
                const size = Math.random() * 5 + 1;
                
                // Animation aléatoire
                const duration = Math.random() * 10 + 5;
                const delay = Math.random() * 5;
                
                particle.style.width = `${size}px`;
                particle.style.height = `${size}px`;
                particle.style.left = `${posX}px`;
                particle.style.top = `${posY}px`;
                particle.style.opacity = Math.random() * 0.5 + 0.1;
                particle.style.animation = `float ${duration}s ease-in-out ${delay}s infinite`;
                
                // Créer une animation de flottement aléatoire
                const keyframes = `
                    @keyframes float {
                        0% {
                            transform: translate(0, 0);
                            opacity: ${Math.random() * 0.5 + 0.1};
                        }
                        50% {
                            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px);
                            opacity: ${Math.random() * 0.7 + 0.1};
                        }
                        100% {
                            transform: translate(0, 0);
                            opacity: ${Math.random() * 0.5 + 0.1};
                        }
                    }
                `;
                
                const style = document.createElement('style');
                style.innerHTML = keyframes;
                document.head.appendChild(style);
                
                particlesContainer.appendChild(particle);
            }
            
            // Gestion du changement de photo de profil
            const profilePic = document.getElementById('profilePic');
            const editProfile = document.getElementById('editProfile');
            const profileModal = document.getElementById('profileModal');
            const closeModal = document.getElementById('closeModal');
            const galleryGrid = document.getElementById('galleryGrid');
            
            // Générer 30 images pour la galerie
            for (let i = 1; i <= 30; i++) {
                const img = document.createElement('img');
                img.src = `https://source.unsplash.com/random/300x300/?gaming,neon,${i}`;
                img.alt = `Option ${i}`;
                img.classList.add('gallery-img');
                img.addEventListener('click', function() {
                    profilePic.src = this.src;
                    profileModal.style.display = 'none';
                });
                galleryGrid.appendChild(img);
            }
            
            // Ouvrir le modal
            editProfile.addEventListener('click', function(e) {
                e.stopPropagation();
                profileModal.style.display = 'flex';
            });
            
            profilePic.addEventListener('click', function() {
                profileModal.style.display = 'flex';
            });
            
            // Fermer le modal
            closeModal.addEventListener('click', function() {
                profileModal.style.display = 'none';
            });
            
            window.addEventListener('click', function(e) {
                if (e.target === profileModal) {
                    profileModal.style.display = 'none';
                }
            });
            
            // Slider d'images
            const slider = document.getElementById('slider');
            const sliderNav = document.getElementById('sliderNav');
            const prevBtn = document.querySelector('.slider-btn.prev');
            const nextBtn = document.querySelector('.slider-btn.next');
            let currentSlide = 0;
            
            // Générer 25 images pour le slider
            for (let i = 1; i <= 25; i++) {
                const slide = document.createElement('img');
                slide.src = `https://source.unsplash.com/random/1200x500/?arcade,gaming,neon,${i}`;
                slide.alt = `Slide ${i}`;
                slider.appendChild(slide);
                
                const dot = document.createElement('div');
                dot.classList.add('slider-dot');
                if (i === 1) dot.classList.add('active');
                dot.addEventListener('click', () => {
                    goToSlide(i - 1);
                });
                sliderNav.appendChild(dot);
            }
            
            const slides = document.querySelectorAll('.slider img');
            const dots = document.querySelectorAll('.slider-dot');
            
            function goToSlide(n) {
                currentSlide = (n + slides.length) % slides.length;
                slider.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }
            
            function nextSlide() {
                goToSlide(currentSlide + 1);
            }
            
            function prevSlide() {
                goToSlide(currentSlide - 1);
            }
            
            nextBtn.addEventListener('click', nextSlide);
            prevBtn.addEventListener('click', prevSlide);
            
            // Auto-slide
            let slideInterval = setInterval(nextSlide, 5000);
            
            slider.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });
            
            slider.addEventListener('mouseleave', () => {
                slideInterval = setInterval(nextSlide, 5000);
            });
            
            // Navigation
            const navLinks = document.querySelectorAll('nav a');
            
            navLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    // Retirer la classe active de tous les liens
                    navLinks.forEach(l => l.classList.remove('active'));
                    
                    // Ajouter la classe active au lien cliqué
                    this.classList.add('active');
                    
                    // Faire défiler jusqu'à la section correspondante
                    const targetId = this.getAttribute('href');
                    const targetSection = document.querySelector(targetId);
                    
                    window.scrollTo({
                        top: targetSection.offsetTop - 20,
                        behavior: 'smooth'
                    });
                });
            });
            
            // Animation au défilement
            function checkScroll() {
                const sections = document.querySelectorAll('section');
                const gameCards = document.querySelectorAll('.game-card');
                const serviceCards = document.querySelectorAll('.service-card');
                
                sections.forEach(section => {
                    const sectionTop = section.getBoundingClientRect().top;
                    if (sectionTop < window.innerHeight - 100) {
                        section.classList.add('visible', 'slide-in');
                    }
                });
                
                gameCards.forEach((card, index) => {
                    const cardTop = card.getBoundingClientRect().top;
                    if (cardTop < window.innerHeight - 100) {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    }
                });
                
                serviceCards.forEach((card, index) => {
                    const cardTop = card.getBoundingClientRect().top;
                    if (cardTop < window.innerHeight - 100) {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 100);
                    }
                });
            }
            
            window.addEventListener('scroll', checkScroll);
            window.addEventListener('load', checkScroll);
            
            // Animation du titre
            const neonTitle = document.querySelector('.main-title');
            setInterval(() => {
                neonTitle.style.textShadow = `
                    0 0 5px #fff, 
                    0 0 10px #fff, 
                    0 0 15px hsl(${Math.random() * 360}, 100%, 50%), 
                    0 0 20px hsl(${Math.random() * 360}, 100%, 50%), 
                    0 0 25px hsl(${Math.random() * 360}, 100%, 50%)
                `;
            }, 2000);
        });