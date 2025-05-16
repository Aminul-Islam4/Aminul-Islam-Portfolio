// Dynamic Typing Text
const typingElement = document.getElementById("dynamic-typing");
const phrases = [
  "Aspiring AI & Machine Learning Engineer",
  "Proficient in Python, SQL, DSA",
  "Skilled in Developing ML & AI Solutions"
];
let currentPhrase = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentText = phrases[currentPhrase];
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentText.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentText.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    currentPhrase = (currentPhrase + 1) % phrases.length;
    setTimeout(typeEffect, 500);
  } else {
    setTimeout(typeEffect, isDeleting ? 40 : 100);
  }
}
typeEffect();

// Scroll Animation (down and up)
const sections = document.querySelectorAll("section");
function animateOnScroll() {
  const triggerBottom = window.innerHeight * 0.8;

  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < triggerBottom) {
      section.classList.add("visible");
    } else {
      section.classList.remove("visible"); // allows animating on scroll-up too
    }
  });
}
window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Theme toggle
const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
