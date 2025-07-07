// Wait for DOM content to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Performance optimizations
    const optimizedElements = {
        dynamicText: document.querySelector('.dynamic-text'),
        navbar: document.querySelector('.navbar'),
        mobileMenu: document.getElementById('mobile-menu'),
        navMenu: document.querySelector('.nav-menu'),
        themeSwitch: document.getElementById('theme-switch'),
        contactForm: document.getElementById('contactForm')
    };
    
    // Dynamic text typing effect with performance improvements
    const texts = ["AI Engineer", "Full Stack Developer", "Software Engineer", "SEO Specialist"];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    
    let textIndex = 0;
    let charIndex = 0;
    let typingTimer;
    
    function type() {
        if (charIndex < texts[textIndex].length) {
            optimizedElements.dynamicText.textContent += texts[textIndex].charAt(charIndex);
            charIndex++;
            typingTimer = setTimeout(type, typingDelay);
        } else {
            typingTimer = setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            optimizedElements.dynamicText.textContent = texts[textIndex].substring(0, charIndex-1);
            charIndex--;
            typingTimer = setTimeout(erase, erasingDelay);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            typingTimer = setTimeout(type, typingDelay);
        }
    }
    
    if (optimizedElements.dynamicText) {
        setTimeout(type, newTextDelay);
    }
    
    // Optimized navbar scroll effect with throttling
    let ticking = false;
    
    function updateNavbar() {
        if (window.scrollY > 50) {
            optimizedElements.navbar.classList.add('scrolled');
        } else {
            optimizedElements.navbar.classList.remove('scrolled');
        }
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }
    
    if (optimizedElements.navbar) {
        window.addEventListener('scroll', requestTick, { passive: true });
    }
    
    // Mobile menu toggle - already handled in inline critical script
    if (optimizedElements.mobileMenu && optimizedElements.navMenu) {
        optimizedElements.mobileMenu.addEventListener('click', function() {
            optimizedElements.mobileMenu.classList.toggle('active');
            optimizedElements.navMenu.classList.toggle('active');
        });
    }
    
    // Optimized nav links active state
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');
    let activeNavTicking = false;
    
    function setActiveLink() {
        let currentSection = '';
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 100) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && href.substring(1) === currentSection) {
                link.classList.add('active');
            }
        });
        activeNavTicking = false;
    }
    
    function requestActiveNavTick() {
        if (!activeNavTicking) {
            requestAnimationFrame(setActiveLink);
            activeNavTicking = true;
        }
    }
    
    if (navLinks.length > 0) {
        window.addEventListener('scroll', requestActiveNavTick, { passive: true });
    }
    
    // Project filtering with optimizations
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to current button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Optimized contact form handling
    if (optimizedElements.contactForm) {
        optimizedElements.contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // For now, send to your email using mailto link
            window.location.href = `mailto:karthikofficialmain@gmail.com?subject=${subject}&body=Name: ${name}%0D%0AEmail: ${email}%0D%0AMessage: ${message}`;
            
            // Reset form
            optimizedElements.contactForm.reset();
        });
    }
    
    // Optimized theme toggling functionality
    const body = document.body;

    // Check for saved theme preference or use OS preference
    const currentTheme = localStorage.getItem('theme') || 
                        (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

    // Apply the current theme
    if (currentTheme === 'dark' && optimizedElements.themeSwitch) {
        body.setAttribute('data-theme', 'dark');
        optimizedElements.themeSwitch.checked = true;
    }

    // Toggle theme when switch is clicked
    if (optimizedElements.themeSwitch) {
        optimizedElements.themeSwitch.addEventListener('change', function() {
            if (this.checked) {
                body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                body.removeAttribute('data-theme');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    // GSAP animations for hero section - load conditionally
    if (typeof gsap !== 'undefined') {
        // Hero section animation
        const heroTl = gsap.timeline();
        heroTl.from('.navbar', {y: -100, opacity: 0, duration: 0.8})
              .from('.hero-content h1', {y: 50, opacity: 0, duration: 0.6})
              .from('.hero-content h2', {y: 50, opacity: 0, duration: 0.6}, '-=0.3')
              .from('.hero-content p', {y: 50, opacity: 0, duration: 0.6}, '-=0.3')
              .from('.cta-buttons', {y: 50, opacity: 0, duration: 0.6}, '-=0.3')
              .from('.social-icons', {y: 50, opacity: 0, duration: 0.6}, '-=0.3');
        
        // Animate skill bars when scrolled into view
        gsap.utils.toArray('.skill-level').forEach(skill => {
            const width = skill.style.width;
            gsap.set(skill, {width: 0});
            
            ScrollTrigger.create({
                trigger: skill,
                start: "top 80%",
                onEnter: () => gsap.to(skill, {width: width, duration: 1.5, ease: "power2.out"})
            });
        });
    }

    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            once: true,
            offset: 100,
            duration: 800
        });
    }

    // Check if we're on a separate page and initialize AOS
    const isProjectsPage = document.querySelector('.projects-page');
    const isSkillsPage = document.querySelector('.skills-page');
    
    if (isProjectsPage || isSkillsPage) {
        // Init AOS for these pages
        if (typeof AOS !== 'undefined') {
            AOS.init({
                once: true,
                offset: 100,
                duration: 800
            });
        }
    }
});

// Preloader
window.addEventListener('load', function() {
    const preloader = document.querySelector('.preloader');
    if (preloader) { // Add this check
        preloader.classList.add('hidden');
        
        // Remove preloader after transition completes
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Code splitting technique - load non-critical JS after page load
function loadScript(src, async = true, defer = true) {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    document.body.appendChild(script);
}

// Load non-critical scripts after page loads
window.addEventListener('load', function() {
    // Example: load analytics or other non-critical scripts
    // loadScript('js/analytics.js');
});

