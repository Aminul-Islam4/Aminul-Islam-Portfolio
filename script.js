const themeToggleBtn = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggleBtn.querySelector('i');

// Check saved theme in localStorage and apply it
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.toggle('dark', savedTheme === 'dark');
  icon.className = savedTheme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// Toggle theme on button click
themeToggleBtn.addEventListener('click', () => {
  const isDark = body.classList.toggle('dark');
  icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
});
