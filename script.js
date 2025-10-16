const buttons = document.querySelectorAll('#mode-buttons button');
const body = document.body;

buttons.forEach(btn => {
  btn.addEventListener('click', () => {
    body.classList.remove('clean-light', 'clean-dark', 'spooky');
    body.classList.add(btn.dataset.mode);
  });
});

// Glow effect only for spooky mode
document.addEventListener('mousemove', e => {
  if(body.classList.contains('spooky')) {
    document.body.style.background = `radial-gradient(circle at ${e.clientX}px ${e.clientY}px, rgba(156,0,255,0.05), #0d0d0f 80%)`;
  } else if(body.classList.contains('clean-light')) {
    document.body.style.background = "#fdf8f2";
  } else if(body.classList.contains('clean-dark')) {
    document.body.style.background = "#1b1b1b";
  }
});
