
        // Mobile Menu Toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
        
        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                if(targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if(targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
        
        // Active navigation link highlighting
        window.addEventListener('scroll', () => {
            let current = '';
            const sections = document.querySelectorAll('section');
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if(scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if(link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
        
        // Portfolio Filtering
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(button => button.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                portfolioItems.forEach(item => {
                    if(filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
        
        // Portfolio Modal
        const portfolioModal = document.getElementById('portfolioModal');
        const modalClose = document.querySelector('.modal-close');
        const modalImg = document.querySelector('.modal-img img');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        const modalLink = document.getElementById('modalLink');
        
        // Sample project data (in a real scenario, this would come from a database)
        const projects = [
            {
                title: "E-Commerce Website",
                description: "A full-stack e-commerce solution built with React, Node.js, and MongoDB. Features include user authentication, product catalog, shopping cart, and payment integration.",
                image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "#"
            },
            {
                title: "Finance App UI",
                description: "A mobile banking application design focused on user experience and security. Includes features for account management, transactions, and financial insights.",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "#"
            },
            {
                title: "Fitness Tracker App",
                description: "A cross-platform mobile application for tracking workouts, nutrition, and health metrics. Built with React Native and integrated with wearable devices.",
                image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "#"
            },
            {
                title: "Corporate Website",
                description: "A business website with custom CMS for easy content management. Features responsive design, SEO optimization, and integration with social media platforms.",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "#"
            },
            {
                title: "Travel Platform UI",
                description: "A booking platform design for travel services. Focused on intuitive navigation, visual appeal, and seamless booking experience across devices.",
                image: "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "#"
            },
            {
                title: "Recipe Sharing App",
                description: "A social cooking application allowing users to share, discover, and rate recipes. Includes features for meal planning and grocery list generation.",
                image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
                link: "#"
            }
        ];
        
        // Add click event to portfolio items
        portfolioItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                const project = projects[index];
                modalImg.src = project.image;
                modalTitle.textContent = project.title;
                modalDescription.textContent = project.description;
                modalLink.href = project.link;
                
                portfolioModal.style.display = 'flex';
                document.body.style.overflow = 'hidden'; // Prevent scrolling
            });
        });
        
        // Close modal
        modalClose.addEventListener('click', () => {
            portfolioModal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Re-enable scrolling
        });
        
        // Close modal when clicking outside content
        window.addEventListener('click', (e) => {
            if(e.target === portfolioModal) {
                portfolioModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Contact Form Validation
        const contactForm = document.getElementById('contactForm');
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const subjectInput = document.getElementById('subject');
        const messageInput = document.getElementById('message');
        
        const nameError = document.getElementById('nameError');
        const emailError = document.getElementById('emailError');
        const subjectError = document.getElementById('subjectError');
        const messageError = document.getElementById('messageError');
        
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            
            // Reset errors
            nameError.style.display = 'none';
            emailError.style.display = 'none';
            subjectError.style.display = 'none';
            messageError.style.display = 'none';
            
            // Validate name
            if(nameInput.value.trim() === '') {
                nameError.style.display = 'block';
                isValid = false;
            }
            
            // Validate email
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if(!emailRegex.test(emailInput.value.trim())) {
                emailError.style.display = 'block';
                isValid = false;
            }
            
            // Validate subject
            if(subjectInput.value.trim() === '') {
                subjectError.style.display = 'block';
                isValid = false;
            }
            
            // Validate message
            if(messageInput.value.trim() === '') {
                messageError.style.display = 'block';
                isValid = false;
            }
            
            if(isValid) {
                // In a real application, you would send the form data to a server here
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
            }
        });
        
        // Animate skill bars when scrolled into view
        const skillBars = document.querySelectorAll('.skill-per');
        
        function animateSkillBars() {
            skillBars.forEach(bar => {
                const barPosition = bar.getBoundingClientRect().top;
                const screenPosition = window.innerHeight / 1.3;
                
                if(barPosition < screenPosition) {
                    const percent = bar.getAttribute('data-percent');
                    bar.style.width = percent + '%';
                }
            });
        }
        
        // Check on scroll and load
        window.addEventListener('scroll', animateSkillBars);
        window.addEventListener('load', animateSkillBars);
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if(window.scrollY > 100) {
                header.style.padding = '10px 0';
                header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.padding = '20px 0';
                header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            }
        });
    