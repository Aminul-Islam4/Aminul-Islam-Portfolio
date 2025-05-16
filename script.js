const themeToggleBtn = document.getElementById("theme-toggle");
const body = document.body;

function setTheme(theme) {
  if (theme === "dark") {
    body.classList.add("dark");
    themeToggleBtn.innerHTML = '<i class="fas fa-sun"></i>';
  } else {
    body.classList.remove("dark");
    themeToggleBtn.innerHTML = '<i class="fas fa-moon"></i>';
  }
  localStorage.setItem("theme", theme);
}

// Load theme from localStorage or system preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  // Default: system preference
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  setTheme(prefersDark ? "dark" : "light");
}

themeToggleBtn.addEventListener("click", () => {
  if (body.classList.contains("dark")) {
    setTheme("light");
  } else {
    setTheme("dark");
  }
});
