/* Enhanced Professional Portfolio - Merged Script */
/* Combines existing QA-focused content with sophisticated interactions */

// ============================================================================
// THEME MANAGEMENT - Enhanced version with better UX
// ============================================================================

const initTheme = () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
  
  // Check for saved theme preference or use OS preference
  const currentTheme = localStorage.getItem('theme') || 
                      (prefersDarkScheme.matches ? 'dark' : 'light');
  
  // Apply saved theme on page load
  if (currentTheme === 'dark') {
    body.classList.add('dark');
    themeToggleBtn.textContent = '☀️ Light';
  } else {
    themeToggleBtn.textContent = '🌙 Dark';
  }
  
  // Toggle theme with enhanced animation
  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    
    if (body.classList.contains('dark')) {
      themeToggleBtn.textContent = '☀️ Light';
      localStorage.setItem('theme', 'dark');
    } else {
      themeToggleBtn.textContent = '🌙 Dark';
      localStorage.setItem('theme', 'light');
    }
  });
};

// ============================================================================
// DYNAMIC TYPING EFFECT - Your QA-focused phrases preserved
// ============================================================================

const initTypingAnimation = () => {
  const dynamicTyping = document.querySelector('.dynamic-typing');
  if (!dynamicTyping) return;
  
  // Your original QA-focused phrases - preserved!
  const phrases = [
    'Aspiring Software Quality Assurance Engineer',
    'Manual Testing | Automation Testing | API Testing',
    'Experienced with Selenium, Playwright API & Postman',
    'Skilled in Test Case Design & Defect Tracking',
    'Strong Understanding of SDLC, STLC & Agile Scrum',
    'Focused on Delivering Reliable, High-Quality Software',
    'Driven by Quality, Accuracy, and Continuous Improvement'
  ];
  
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isWaiting = false;
  
  const typingSpeed = 85;
  const erasingSpeed = 45;
  const pauseBetweenPhrases = 2000;
  
  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    const speed = isDeleting 
      ? erasingSpeed 
      : isWaiting 
        ? pauseBetweenPhrases 
        : typingSpeed + Math.random() * 50;

    if (isWaiting) {
      isWaiting = false;
      isDeleting = true;
      setTimeout(type, pauseBetweenPhrases);
      return;
    }

    if (!isDeleting) {
      dynamicTyping.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        isWaiting = true;
      }
    } else {
      dynamicTyping.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    
    setTimeout(type, speed);
  }
  
  // Start typing effect after a brief delay
  setTimeout(type, 1000);
};

// ============================================================================
// CUSTOM CURSOR - Enhanced with smooth lerp animation
// ============================================================================

const initCustomCursor = () => {
  // Only run on devices with fine pointers (desktop)
  if (!window.matchMedia('(pointer: fine)').matches || window.innerWidth <= 1024) {
    return;
  }
  
  const cursor = document.querySelector('.custom-cursor');
  if (!cursor) {
    // Create cursor if it doesn't exist
    const newCursor = document.createElement('div');
    newCursor.className = 'custom-cursor';
    document.body.appendChild(newCursor);
  }
  
  const cursorElement = document.querySelector('.custom-cursor');
  let mouseX = 0;
  let mouseY = 0;
  let cursorX = 0;
  let cursorY = 0;
  
  // Track mouse position
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  
  // Smooth cursor follow with lerp (linear interpolation)
  const lerp = (start, end, factor) => start + (end - start) * factor;
  
  const animateCursor = () => {
    cursorX = lerp(cursorX, mouseX, 1.00);
    cursorY = lerp(cursorY, mouseY, 1.00);
    
    cursorElement.style.left = `${cursorX}px`;
    cursorElement.style.top = `${cursorY}px`;
    
    requestAnimationFrame(animateCursor);
  };
  
  animateCursor();
  
  // Add hover effect for interactive elements
  const interactiveElements = document.querySelectorAll('a, button, .project-card, .skill-list li');
  
  interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => cursorElement.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursorElement.classList.remove('hover'));
  });
};

// ============================================================================
// SECTION NUMBERS - Add data attributes for decorative numbers
// ============================================================================

const initSectionNumbers = () => {
  const sections = document.querySelectorAll('section');
  sections.forEach((section, index) => {
    const heading = section.querySelector('h2');
    if (heading) {
      heading.setAttribute('data-number', `0${index + 1}`);
    }
  });
};

// ============================================================================
// AOS (ANIMATE ON SCROLL) - Initialize if library is present
// ============================================================================

const initAOS = () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      easing: 'ease-in-out',
      once: false,
      mirror: true,
      anchorPlacement: 'top-bottom',
    });
  }
};

// ============================================================================
// SCROLL-TRIGGERED ANIMATIONS - Fallback if AOS not present
// ============================================================================

const initScrollAnimations = () => {
  // Skip if AOS is handling animations
  if (typeof AOS !== 'undefined') return;
  
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe all major elements
  const animatedElements = document.querySelectorAll('.project-card, .education li');
  
  animatedElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });
};

// ============================================================================
// SKILLS REVEAL - Staggered animation for skill tags
// ============================================================================

const initSkillsReveal = () => {
  const skillsList = document.querySelector('.skill-list');
  if (!skillsList) return;
  
  const observerOptions = {
    threshold: 0.3
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skills = entry.target.querySelectorAll('li');
        skills.forEach((skill, index) => {
          setTimeout(() => {
            skill.style.opacity = '1';
            skill.style.transform = 'translateY(0) scale(1)';
          }, index * 50);
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  const skills = skillsList.querySelectorAll('li');
  skills.forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px) scale(0.9)';
    skill.style.transition = 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
  });
  
  observer.observe(skillsList);
};

// ============================================================================
// TIMELINE ANIMATION - Enhanced education timeline
// ============================================================================

const initTimelineAnimation = () => {
  const educationItems = document.querySelectorAll('.education li');
  if (!educationItems.length) return;
  
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  educationItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
    observer.observe(item);
  });
};

// ============================================================================
// PARALLAX EFFECT - Subtle header movement on scroll
// ============================================================================

const initParallax = () => {
  const header = document.querySelector('header');
  if (!header) return;
  
  let ticking = false;
  
  const updateParallax = (scrollPos) => {
    const headerHeight = header.offsetHeight;
    if (scrollPos < headerHeight) {
      const parallaxValue = scrollPos * 0.5;
      header.style.transform = `translateY(${parallaxValue}px)`;
    }
    ticking = false;
  };
  
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax(window.pageYOffset);
      });
      ticking = true;
    }
  });
};

// ============================================================================
// SMOOTH SCROLL - Enhanced anchor link scrolling
// ============================================================================

const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
};

// ============================================================================
// PROJECT CARD EFFECTS - Enhanced hover interactions
// ============================================================================

const initProjectCardEffects = () => {
  const projectCards = document.querySelectorAll('.project-card');
  
  projectCards.forEach(card => {
    // Remove inline styles from your original code
    card.style.transform = '';
    
    // Enhanced hover with gradient position tracking
    card.addEventListener('mouseenter', function() {
      this.style.setProperty('--hover-x', '0%');
    });
    
    card.addEventListener('mousemove', function(e) {
      const rect = this.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      this.style.setProperty('--hover-x', `${x}%`);
      this.style.setProperty('--hover-y', `${y}%`);
    });
  });
};

// ============================================================================
// PERFORMANCE CHECK - Reduce animations on low-end devices
// ============================================================================

const checkPerformance = () => {
  // Detect if device is low-end or user prefers reduced motion
  const isLowEnd = navigator.hardwareConcurrency <= 4 || 
                   navigator.deviceMemory <= 4 ||
                   window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  if (isLowEnd) {
    document.documentElement.style.setProperty('--ease-out-expo', 'ease');
    document.documentElement.style.setProperty('--ease-spring', 'ease');
  }
};

// ============================================================================
// MAIN INITIALIZATION - Run all features
// ============================================================================

const init = () => {
  // Check performance first
  checkPerformance();
  
  // Core features
  initTheme();
  initSectionNumbers();
  initTypingAnimation();
  
  // Visual enhancements
  initCustomCursor();
  initParallax();
  
  // Scroll animations
  initAOS(); // Try AOS first
  initScrollAnimations(); // Fallback to custom
  initSkillsReveal();
  initTimelineAnimation();
  
  // Interactive effects
  initProjectCardEffects();
  initSmoothScroll();
  
  // Add loaded class to body for CSS hooks
  document.body.classList.add('loaded');
};

// ============================================================================
// DOM READY - Execute initialization
// ============================================================================

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ============================================================================
// GLOBAL UTILITIES - Expose useful functions
// ============================================================================

// Allow theme toggle from console/external scripts
window.toggleTheme = () => {
  document.getElementById('theme-toggle')?.click();
};

// Force theme change
window.setTheme = (theme) => {
  const body = document.body;
  const themeToggleBtn = document.getElementById('theme-toggle');
  
  if (theme === 'dark') {
    body.classList.add('dark');
    themeToggleBtn.textContent = '☀️ Light';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    themeToggleBtn.textContent = '🌙 Dark';
    localStorage.setItem('theme', 'light');
  }
};

// Reinitialize AOS if needed (for dynamic content)
window.refreshAnimations = () => {
  if (typeof AOS !== 'undefined') {
    AOS.refresh();
  }
};
