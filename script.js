// ============================================================
// THEME TOGGLE
// ============================================================
const initTheme = () => {
  const btn = document.getElementById('theme-toggle');
  const label = btn.querySelector('.toggle-label');
  const body = document.body;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  const saved = localStorage.getItem('theme') || (prefersDark.matches ? 'dark' : 'light');
  applyTheme(saved);

  btn.addEventListener('click', () => {
    const next = body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('theme', next);
  });

  function applyTheme(theme) {
    body.classList.toggle('dark', theme === 'dark');
    label.textContent = theme === 'dark' ? 'Light' : 'Dark';
  }
};

// ============================================================
// TYPING EFFECT — role descriptions
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
// INIT
// ============================================================
const init = () => {
  initTheme();
  initTypingAnimation();
  document.body.classList.add('loaded');
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
