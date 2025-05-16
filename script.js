const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggleBtn.querySelector('i');

function setTheme(theme) {
  if (theme === 'dark') {
    body.classList.add('dark');
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    body.classList.remove('dark');
    icon.classList.replace('fa-sun', 'fa-moon');
  }
  localStorage.setItem('theme', theme);
}

// Initialize theme based on previous choice or system preference
(function () {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // System preference fallback
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
  }
})();

themeToggleBtn.addEventListener('click', () => {
  if (body.classList.contains('dark')) {
    setTheme('light');
  } else {
    setTheme('dark');
  }
});
