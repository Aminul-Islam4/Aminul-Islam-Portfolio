// Dark/Light Mode Toggle
const themeToggleBtn = document.getElementById('theme-toggle');

themeToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  // Toggle button icon
  if (document.body.classList.contains('dark')) {
    themeToggleBtn.textContent = '☀️';
  } else {
    themeToggleBtn.textContent = '🌙';
  }
});

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: 'ease-in-out',
  once: true, // animation happens only once on scroll
});

// Dynamic typing effect for header
const dynamicTyping = document.querySelector('.dynamic-typing');
const phrases = [
  'Aspiring AI & Machine Learning Engineer',
  'Proficient in Python, SQL, Data Structures & Algorithms',
  'Skilled in Developing ML Models and AI Solutions'
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;
let pauseBetweenPhrases = 2000;

function type() {
  const currentPhrase = phrases[phraseIndex];
  if (!isDeleting) {
    dynamicTyping.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;

    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(type, pauseBetweenPhrases);
      return;
    }
  } else {
    dynamicTyping.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }
  setTimeout(type, typingSpeed);
}

// Start the typing effect
type();
