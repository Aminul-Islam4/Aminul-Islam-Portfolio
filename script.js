// Enhanced script.js with more interactions and smoother animations

// Dark/Light Mode Toggle with localStorage support
const themeToggleBtn = document.getElementById('theme-toggle');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use OS preference
const currentTheme = localStorage.getItem('theme') || 
                    (prefersDarkScheme.matches ? 'dark' : 'light');

// Apply saved theme on page load
if (currentTheme === 'dark') {
  document.body.classList.add('dark');
  themeToggleBtn.textContent = '☀️';
} else {
  themeToggleBtn.textContent = '🌙';
}

// Toggle theme and save preference
themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  
  if (document.body.classList.contains('dark')) {
    themeToggleBtn.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    themeToggleBtn.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
  
  // Add rotating animation on click
  themeToggleBtn.classList.add('rotate');
  setTimeout(() => {
    themeToggleBtn.classList.remove('rotate');
  }, 500);
});

// Initialize AOS (Animate On Scroll) with enhanced settings
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: false, // Allow animations to repeat on scroll up/down
    mirror: true, // Whether elements should animate out while scrolling past them
    anchorPlacement: 'top-bottom',
  });
});

// Enhanced Dynamic typing effect with smoother transitions
const dynamicTyping = document.querySelector('.dynamic-typing');
const phrases = [
  'Aspiring AI & Machine Learning Engineer',
  'Proficient in Python, SQL, and Data Structures',
  'Skilled in Developing ML Models and AI Solutions',
  'Passionate about Solving Real-World Problems'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isWaiting = false;
const typingSpeed = 85; // Base typing speed
const erasingSpeed = 45; // Faster erasing
const pauseBetweenPhrases = 2000;

function type() {
  const currentPhrase = phrases[phraseIndex];
  
  // Randomize typing speed slightly for natural effect
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

// Start typing effect after DOM loaded
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(type, 1000); // Slight delay before starting
});

// Custom cursor effect (desktop only)
const cursor = document.querySelector('.custom-cursor');

if (window.innerWidth > 1024) {
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });
  
  // Scale effect on clickable elements
  document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
      cursor.style.opacity = '0.5';
    });
    
    element.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%, -50%) scale(1)';
      cursor.style.opacity = '1';
    });
  });
}

// Add animation for project cards on hover
document.querySelectorAll('.project-card').forEach(card => {
  card.addEventListener('mouseenter', () => {
    card.style.transform = 'translateY(-10px)';
  });
  
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'translateY(0)';
  });
});

// Smooth scrolling for navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      window.scrollTo({
        top: target.offsetTop,
        behavior: 'smooth'
      });
    }
  });
});

// Add CSS class for rotate animation
const style = document.createElement('style');
style.textContent = `
  .rotate {
    animation: rotate-toggle 0.5s ease-in-out;
  }
  
  @keyframes rotate-toggle {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
