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
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.classList.add('count-landed');
        setTimeout(() => el.classList.remove('count-landed'), 700);
      }
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
// SCROLL PROGRESS BAR
// ============================================================
const initScrollProgress = () => {
  const bar = document.querySelector('.scroll-progress');
  const backToTop = document.getElementById('back-to-top');
  if (!bar) return;

  let ticking = false;
  const update = () => {
    const scrollTop = window.scrollY;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const pct = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = `${pct}%`;
    if (backToTop) backToTop.classList.toggle('visible', scrollTop > 600);
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  });
  update();

  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
};

// ============================================================
// HEADLINE WORD-BY-WORD REVEAL
// ============================================================
const initHeadlineReveal = () => {
  const el = document.getElementById('hero-name');
  if (!el) return;
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words
    .map((word, i) => `<span class="gradient-text" style="animation-delay:${0.3 + i * 0.12}s, ${1.4 + i * 0.12}s">${word}</span>`)
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
// SCROLL DEPTH SHADOW (cheap: IntersectionObserver, not scroll-driven)
// ============================================================
const initDepthShadow = () => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const tiles = document.querySelectorAll('.tile');
  if (!tiles.length) return;

  const thresholds = Array.from({ length: 11 }, (_, i) => i / 10);
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      entry.target.style.setProperty('--depth', entry.intersectionRatio.toFixed(2));
    });
  }, { threshold: thresholds });

  tiles.forEach(tile => observer.observe(tile));
};

// ============================================================
// INIT
// ============================================================
const init = () => {
  initHeadlineReveal();
  initTypingAnimation();
  initScrollReveal();
  initCountUp();
  initScrollProgress();
  initParallax();
  initDepthShadow();
  document.body.classList.add('loaded');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
