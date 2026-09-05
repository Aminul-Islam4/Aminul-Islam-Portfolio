// ============================================================
// THEME TOGGLE (dark is default/base; toggling adds .light)
// ============================================================
const initTheme = () => {
  const btn = document.getElementById('theme-toggle');
  const label = btn.querySelector('.toggle-label');
  const body = document.body;
  const prefersLight = window.matchMedia('(prefers-color-scheme: light)');

  const saved = localStorage.getItem('theme') || (prefersLight.matches ? 'light' : 'dark');
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const next = body.classList.contains('light') ? 'dark' : 'light';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  function applyTheme(theme) {
    body.classList.toggle('light', theme === 'light');
    label.textContent = theme === 'light' ? 'Dark' : 'Light';
    forceRepaint();
  }

  // iOS Safari (and some other mobile browsers) only recomposite
  // position:fixed layers on an actual scroll event — a CSS-variable-driven
  // color change elsewhere can leave them visually stale otherwise.
  // Nudging the scroll position by a pixel and back triggers that
  // recomposition immediately, without any visible jump.
  function forceRepaint() {
    const y = window.scrollY;
    window.scrollTo({ top: y + 1, behavior: 'instant' });
    requestAnimationFrame(() => window.scrollTo({ top: y, behavior: 'instant' }));

    // Mirrors what manually pinch-zooming does: forces the browser to
    // fully recompute and recomposite every layer, not just the ones it
    // thinks changed. Change is too small to be visible.
    const root = document.documentElement;
    root.style.zoom = '0.99999';
    requestAnimationFrame(() => { root.style.zoom = '1'; });
  }
};

// ============================================================
// TYPING EFFECT
// ============================================================
const initTypingAnimation = () => {
  const el = document.querySelector('.dynamic-typing');
  if (!el) return;

  const phrases = [
    'Software Quality Assurance Engineer',
    'Manual Testing · Automation Testing · API Testing',
    'Selenium · Playwright API · Postman',
    'Test Case Design & Defect Tracking',
    'SDLC · STLC · Agile Scrum'
  ];

  let phraseIndex = 0, charIndex = 0, isDeleting = false, isWaiting = false;
  const typingSpeed = 80, erasingSpeed = 40, pause = 1800;

  function type() {
    const current = phrases[phraseIndex];
    if (isWaiting) {
      isWaiting = false;
      isDeleting = true;
      setTimeout(type, pause);
      return;
    }
    if (!isDeleting) {
      el.textContent = current.substring(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) isWaiting = true;
    } else {
      el.textContent = current.substring(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(type, isDeleting ? erasingSpeed : typingSpeed + Math.random() * 40);
  }

  setTimeout(type, 500);
};

// ============================================================
// STAGGERED SCROLL REVEAL
// ============================================================
const initScrollReveal = () => {
  const items = document.querySelectorAll('.reveal');
  if (!items.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) {
    items.forEach(el => el.classList.add('in-view'));
    return;
  }

  let sameRowIndex = 0;
  let lastTop = null;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const top = Math.round(el.getBoundingClientRect().top / 40);
        sameRowIndex = top === lastTop ? sameRowIndex + 1 : 0;
        lastTop = top;
        const delay = Math.min(sameRowIndex * 90, 270);
        el.style.transitionDelay = `${delay}ms`;
        el.classList.add('in-view');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

  items.forEach(el => observer.observe(el));
};

// ============================================================
// COUNT-UP NUMBERS (inside the highlights tile)
// ============================================================
const initCountUp = () => {
  const targets = document.querySelectorAll('[data-count]');
  if (!targets.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animate = (el) => {
    const end = parseInt(el.getAttribute('data-count'), 10);
    if (prefersReduced) { el.textContent = end; return; }
    const duration = 900;
    const start = performance.now();
    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * end);
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animate(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  targets.forEach(el => observer.observe(el));
};

// ============================================================
// CURSOR SPOTLIGHT ON TILES
// ============================================================
const initTileSpotlight = () => {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  const tiles = document.querySelectorAll('.tile');
  tiles.forEach(tile => {
    tile.addEventListener('mousemove', (e) => {
      const rect = tile.getBoundingClientRect();
      tile.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      tile.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  });
};

// ============================================================
// 3D TILT ON PROJECT CARDS
// ============================================================
const initCardTilt = () => {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const cards = document.querySelectorAll('.project');
  const maxTilt = 6;

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rotateY = (px - 0.5) * maxTilt * 2;
      const rotateX = (0.5 - py) * maxTilt * 2;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
};

// ============================================================
// MAGNETIC BUTTONS
// ============================================================
const initMagneticButtons = () => {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const buttons = document.querySelectorAll('.btn');
  const strength = 0.35;

  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) * strength;
      const y = (e.clientY - rect.top - rect.height / 2) * strength;
      btn.style.transform = `translate(${x}px, ${y}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0, 0)';
    });
  });
};

// ============================================================
// SCROLL PROGRESS BAR
// ============================================================
const initScrollProgress = () => {
  const bar = document.querySelector('.scroll-progress');
  if (!bar) return;

  let ticking = false;
  const update = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = `${pct}%`;
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });
  update();
};

// ============================================================
// HEADLINE WORD-BY-WORD REVEAL
// ============================================================
const initHeadlineReveal = () => {
  const el = document.getElementById('hero-name');
  if (!el) return;
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words
    .map((word, i) => `<span class="gradient-text" style="animation-delay:${0.15 + i * 0.12}s, ${1.4 + i * 0.12}s">${word}</span>`)
    .join(' ');
};

// ============================================================
// SCROLL PARALLAX ON HERO PHOTO
// ============================================================
const initParallax = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const photo = document.querySelector('.hero-photo');
  if (!photo) return;

  let ticking = false;
  const update = () => {
    const y = window.scrollY;
    photo.style.transform = `translateY(${y * 0.15}px)`;
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });
};

// ============================================================
// AMBIENT CURSOR-FOLLOW GLOW (decorative, dark mode only)
// ============================================================
const initCursorGlow = () => {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glow = document.querySelector('.cursor-glow');
  if (!glow) return;

  let targetX = window.innerWidth / 2, targetY = window.innerHeight / 2;
  let x = targetX, y = targetY;

  window.addEventListener('mousemove', (e) => {
    targetX = e.clientX;
    targetY = e.clientY;
    glow.classList.add('active');
  });

  const animate = () => {
    x += (targetX - x) * 0.12;
    y += (targetY - y) * 0.12;
    glow.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
    requestAnimationFrame(animate);
  };
  animate();
};

// ============================================================
// INIT
// ============================================================
const init = () => {
  initTheme();
  initHeadlineReveal();
  initTypingAnimation();
  initScrollReveal();
  initCountUp();
  initTileSpotlight();
  initCardTilt();
  initMagneticButtons();
  initScrollProgress();
  initParallax();
  initCursorGlow();
  document.body.classList.add('loaded');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
