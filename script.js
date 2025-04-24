document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.querySelector('i').classList.toggle('fa-times');
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Close mobile menu if open
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                }
            }
        });
    });
    
    // Header scroll effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Scroll to top button
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Load flavors dynamically
    const flavorsContainer = document.querySelector('.flavors-container');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    const flavors = [
        {
            name: 'Stracciatella',
            description: 'Crema de leche con finas láminas de chocolate negro.',
            price: '$4.50',
            category: 'classic',
            image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=627&q=80'
        },
        {
            name: 'Fresa Silvestre',
            description: 'Elaborado con fresas orgánicas de cultivo local.',
            price: '$5.00',
            category: 'fruits',
            image: 'https://images.unsplash.com/photo-1579954115545-a95591f28bfc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
            name: 'Pistacho Siciliano',
            description: 'Pistachos de Bronte, considerados los mejores del mundo.',
            price: '$6.50',
            category: 'special',
            image: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80'
        },
        {
            name: 'Limón Amalfi',
            description: 'Limones de la costa Amalfitana, refrescante y cremoso.',
            price: '$4.50',
            category: 'fruits',
            image: 'https://images.unsplash.com/photo-1611250282006-4484dd3fba6b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
        },
        {
            name: 'Chocolate Negro 70%',
            description: 'Intenso sabor a cacao con un toque de vainilla Madagascar.',
            price: '$5.00',
            category: 'classic',
            image: 'https://images.unsplash.com/photo-1488900128323-21503983a07e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
        },
        {
            name: 'Tiramisú',
            description: 'El postre italiano clásico en forma de helado.',
            price: '$5.50',
            category: 'special',
            image: 'https://images.unsplash.com/photo-1509482560494-4126f8225994?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
        }
    ];
    
    function displayFlavors(filter = 'all') {
        flavorsContainer.innerHTML = '';
        
        const filteredFlavors = filter === 'all' 
            ? flavors 
            : flavors.filter(flavor => flavor.category === filter);
        
        filteredFlavors.forEach(flavor => {
            const flavorCard = document.createElement('div');
            flavorCard.className = 'flavor-card';
            flavorCard.innerHTML = `
                <div class="flavor-image" style="background-image: url('${flavor.image}')"></div>
                <div class="flavor-info">
                    <h3>${flavor.name}</h3>
                    <p>${flavor.description}</p>
                    <div class="flavor-price">${flavor.price}</div>
                </div>
            `;
            flavorsContainer.appendChild(flavorCard);
        });
    }
    
    // Filter flavors
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            displayFlavors(filter);
        });
    });
    
    // Initial load
    displayFlavors();
    
    // Load testimonials
    const testimonialsContainer = document.querySelector('.testimonials-container');
    
    const testimonials = [
        {
            text: 'El mejor helado que he probado en mi vida. La textura es perfecta y los sabores son increíblemente auténticos.',
            author: 'María González',
            role: 'Food Blogger',
            avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
        },
        {
            text: 'Como italiano que soy, puedo decir que este es el helado más cercano al que disfrutaba en mi infancia en Roma. ¡Bravi!',
            author: 'Luca Bianchi',
            role: 'Chef',
            avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
        },
        {
            text: 'Llevo a mis hijos todos los fines de semana. Se han vuelto adictos al sabor de pistacho, ¡y yo también!',
            author: 'Carlos Martínez',
            role: 'Cliente frecuente',
            avatar: 'https://randomuser.me/api/portraits/men/65.jpg'
        }
    ];
    
    testimonials.forEach(testimonial => {
        const testimonialCard = document.createElement('div');
        testimonialCard.className = 'testimonial-card';
        testimonialCard.innerHTML = `
            <div class="testimonial-text">
                ${testimonial.text}
            </div>
            <div class="testimonial-author">
                <div class="author-avatar" style="background-image: url('${testimonial.avatar}')"></div>
                <div class="author-info">
                    <h4>${testimonial.author}</h4>
                    <p>${testimonial.role}</p>
                </div>
            </div>
        `;
        testimonialsContainer.appendChild(testimonialCard);
    });
    
    // Contact form
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Aquí iría la lógica para enviar el formulario
        console.log({ name, email, message });
        
        // Mostrar mensaje de éxito
        alert('Gracias por tu mensaje. Nos pondremos en contacto contigo pronto.');
        contactForm.reset();
    });
    
    // Newsletter form
    const newsletterForm = document.getElementById('newsletterForm');
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        
        // Aquí iría la lógica para suscribir al newsletter
        console.log('Email suscrito:', email);
        
        // Mostrar mensaje de éxito
        alert('¡Gracias por suscribirte a nuestro newsletter!');
        this.reset();
    });
    
    // Simple map initialization (en un proyecto real usarías Google Maps API)
    const map = document.getElementById('map');
    map.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background-color:#f0f0f0;color:#666;"><p>Mapa interactivo de localizaciones</p></div>';
});