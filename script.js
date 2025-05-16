// script.js

document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;

  // Load saved theme from localStorage
  const savedTheme = localStorage.getItem("theme") || "dark";
  setTheme(savedTheme);

  // Toggle theme on button click
  themeToggle.addEventListener("click", () => {
    const newTheme = body.classList.contains("dark-mode") ? "light" : "dark";
    setTheme(newTheme);
  });

  function setTheme(theme) {
    if (theme === "dark") {
      body.classList.add("dark-mode");
      body.classList.remove("light-mode");
      themeToggle.innerHTML = `<i class="fas fa-sun"></i> Light Mode`;
    } else {
      body.classList.add("light-mode");
      body.classList.remove("dark-mode");
      themeToggle.innerHTML = `<i class="fas fa-moon"></i> Dark Mode`;
    }

    localStorage.setItem("theme", theme);
  }

  // Animate project cards on scroll
  const cards = document.querySelectorAll(".project-card");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("fade-in");
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  cards.forEach((card) => {
    observer.observe(card);
  });
});
