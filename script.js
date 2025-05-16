// Theme toggle
document.querySelector(".theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Typing effect
const typingElement = document.getElementById("typing-text");
const phrases = [
  "Aspiring AI & Machine Learning Engineer",
  "Proficient in Python, SQL, Data Structures & Algorithms",
  "Skilled in Developing ML Models and AI Solutions"
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  const currentPhrase = phrases[phraseIndex];
  if (isDeleting) {
    typingElement.textContent = currentPhrase.substring(0, charIndex--);
  } else {
    typingElement.textContent = currentPhrase.substring(0, charIndex++);
  }

  if (!isDeleting && charIndex === currentPhrase.length) {
    isDeleting = true;
    setTimeout(typeEffect, 1500);
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    setTimeout(typeEffect, 300);
  } else {
    setTimeout(typeEffect, isDeleting ? 40 : 90);
  }
}

typeEffect();
