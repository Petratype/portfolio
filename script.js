const buttons = document.querySelectorAll('#mode-buttons button');
const body = document.body;

// Create audio element for spooky sound
const spookySound = new Audio('sound-effects/spooky-mode-open.mp3');

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    body.classList.remove('clean-light', 'clean-dark', 'spooky');
    body.classList.add(btn.dataset.mode);
    
    // Play sound effect for spooky mode
    if (btn.dataset.mode === 'spooky') {
      spookySound.currentTime = 0; // Reset to beginning
      spookySound.play().catch(e => console.log('Audio play failed:', e));
    }
  });
});

// Glow effect only for spooky mode
document.addEventListener('mousemove', e => {
  if (body.classList.contains('spooky')) {
    document.body.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(13,0,18,0.8), #0D0012 60%)`;
  } else {
    // Let CSS define backgrounds for light/dark; clear any inline overrides
    document.body.style.background = '';
  }
});

// Navigation highlighting based on scroll position
const navLinks = document.querySelectorAll('.header-nav a');
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
  let current = '';
  
  // Check if we're near the bottom of the page
  const scrollPosition = window.scrollY + window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;
  
  // If we're within 150px of the bottom, highlight contact
  if (scrollPosition >= documentHeight - 150) {
    current = 'contact';
  } else {
    // Otherwise, check sections normally with better detection
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      const sectionBottom = sectionTop + sectionHeight;
      
      // Check if we're in the middle portion of the section
      if (window.scrollY >= (sectionTop - 100) && window.scrollY < (sectionBottom - 200)) {
        current = section.getAttribute('id');
      }
    });
  }

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Listen for scroll events
window.addEventListener('scroll', highlightNavigation);

// Highlight on page load
document.addEventListener('DOMContentLoaded', highlightNavigation);