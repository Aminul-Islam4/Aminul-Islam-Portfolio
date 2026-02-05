/* ==========================================
   Portfolio Script.js - Fully Optimized
   Features:
   - Theme toggle (dark/light)
   - Typing animation
   - Natural custom cursor
   - Parallax header
   - Smooth scroll
   - AOS/fallback animations
   - Skills & timeline animations
   - Project hover effects
   ========================================== */

/* ===================== THEME MANAGEMENT ===================== */
const initTheme = () => {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

  // Apply saved theme or OS preference
  const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
  if (currentTheme === 'dark') body.classList.add('dark');

  themeToggleBtn.textContent = body.classList.contains('dark') ? '☀️ Light' : '🌙 Dark';

  themeToggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
    const isDark = body.classList.contains('dark');
    themeToggleBtn.textContent = isDark ? '☀️ Light' : '🌙 Dark';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
};

/* ===================== TYPING EFFECT ===================== */
const initTypingAnimation = () => {
  const dynamicTyping = document.querySelector('.dynamic-typing');
  if (!dynamicTyping) return;

  const phrases = [
    'Aspiring Software Quality Assurance Engineer',
    'Manual Testing | Automation Testing | API Testing',
    'Experienced with Selenium, Playwright API & Postman',
    'Skilled in Test Case Design & Defect Tracking',
    'Strong Understanding of SDLC, STLC & Agile Scrum',
    'Focused on Delivering Reliable, High-Quality Software',
    'Driven by Quality, Accuracy, and Continuous Improvement'
  ];

  let phraseIndex = 0, charIndex = 0, isDeleting = false, isWaiting = false;
  const typingSpeed = 85, erasingSpeed = 45, pauseBetweenPhrases = 2000;

  const type = () => {
    const currentPhrase = phrases[phraseIndex];
    if (isWaiting) {
      isWaiting = false;
      isDeleting = true;
      setTimeout(type, pauseBetweenPhrases);
      return;
    }

    if (!isDeleting) {
      dynamicTyping.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === currentPhrase.length) isWaiting = true;
    } else {
      dynamicTyping.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    setTimeout(type, isDeleting ? erasingSpeed : typingSpeed + Math.random() * 50);
  };

  setTimeout(type, 1000);
};

/* ===================== NATURAL CUSTOM CURSOR ===================== */
const initCustomCursor = () => {
  if (!window.matchMedia('(pointer: fine)').matches || window.innerWidth <= 1024) return;

  let cursor = document.querySelector('.custom-cursor');
  if (!cursor) {
    cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    document.body.appendChild(cursor);
  }

  cursor.style.position = 'fixed';
  cursor.style.width = '8px';
  cursor.style.height = '8px';
  cursor.style.borderRadius = '50%';
  cursor.style.pointerEvents = 'none';
  cursor.style.zIndex = '9999';
  cursor.style.background = 'var(--accent-color)';
  cursor.style.transform = 'translate(-50%, -50%)';
  cursor.style.transition = 'transform 0.1s ease';

  const mouse = { x: 0, y: 0 };
  const pos = { x: 0, y: 0 };

  document.addEventListener('mousemove', e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  const lerp = (start, end, factor) => start + (end - start) * factor;
  const animateCursor = () => {
    pos.x = lerp(pos.x, mouse.x, 0.2);
    pos.y = lerp(pos.y, mouse.y, 0.2);
    cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
    requestAnimationFrame(animateCursor);
  };
  animateCursor();

  const interactive = document.querySelectorAll('a, button, .project-card, .skill-list li');
  interactive.forEach(el => {
    el.addEventListener('mouseenter', () => cursor.style.transform += ' scale(2)');
    el.addEventListener('mouseleave', () => cursor.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`);
  });
};

/* ===================== PARALLAX HEADER ===================== */
const initParallax = () => {
  const header = document.querySelector('header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    const scroll = window.scrollY;
    header.style.transform = `translateY(${scroll * 0.5}px)`;
  });
};

/* ===================== SMOOTH SCROLL ===================== */
const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '#!') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({ top: offsetTop, behavior: 'smooth' });
      }
    });
  });
};

/* ===================== AOS / FALLBACK ANIMATION ===================== */
const initAOS = () => {
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, easing: 'ease-in-out', once: false, mirror: true });
  } else {
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -100px 0px' };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    document.querySelectorAll('.project-card, .education li').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }
};

/* ===================== SKILLS & TIMELINE ===================== */
const initSkillsReveal = () => {
  const skillsList = document.querySelector('.skill-list');
  if (!skillsList) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('li').forEach((skill, i) => {
          setTimeout(() => {
            skill.style.opacity = '1';
            skill.style.transform = 'translateY(0) scale(1)';
          }, i * 50);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  skillsList.querySelectorAll('li').forEach(skill => {
    skill.style.opacity = '0';
    skill.style.transform = 'translateY(20px) scale(0.9)';
    skill.style.transition = 'all 0.4s cubic-bezier(0.34,1.56,0.64,1)';
  });

  observer.observe(skillsList);
};

const initTimelineAnimation = () => {
  document.querySelectorAll('.education li').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = 'all 0.6s cubic-bezier(0.16,1,0.3,1)';

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, index * 100);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    observer.observe(item);
  });
};

/* ===================== PROJECT CARD HOVER ===================== */
const initProjectCardEffects = () => {
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.setProperty('--hover-x', `${x}%`);
      card.style.setProperty('--hover-y', `${y}%`);
    });
  });
};

/* ===================== MAIN INIT ===================== */
const init = () => {
  initTheme();
  initTypingAnimation();
  initCustomCursor();
  initParallax();
  initSmoothScroll();
  initAOS();
  initSkillsReveal();
  initTimelineAnimation();
  initProjectCardEffects();
  document.body.classList.add('loaded'); // For CSS hooks
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
