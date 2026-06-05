document.addEventListener('DOMContentLoaded', () => {

  // Nav toggle
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggle) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      toggle.textContent = navLinks.classList.contains('open') ? '✕' : '☰';
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        toggle.textContent = '☰';
      });
    });
  }

  // Scroll reveal
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach(el => observer.observe(el));

  // Nav highlight
  const sections = document.querySelectorAll('.hero, #services, #process, #work, .brand-section, #before-after, #projects, #contact');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id || 'hero';
          navAnchors.forEach(a => {
            const href = a.getAttribute('href').replace('#', '');
            a.style.opacity = href === id ? '1' : '0.7';
          });
        }
      });
    },
    { threshold: 0.3 }
  );
  sections.forEach(s => observerNav.observe(s));

});
