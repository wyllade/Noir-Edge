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

  // Tilt effect (desktop only)
  if (matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll('.tilt-card').forEach(card => {
      let ticking = false;
      card.addEventListener('mousemove', e => {
        if (!ticking) {
          requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -6;
            const rotateY = ((x - centerX) / centerX) * 6;
            card.style.transform =
              `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(8px)`;
            ticking = false;
          });
          ticking = true;
        }
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // Parallax scroll for case-hero sections
  const caseHeroes = document.querySelectorAll('.case-hero');
  if (caseHeroes.length) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          caseHeroes.forEach(el => {
            const rect = el.getBoundingClientRect();
            const centerDist = rect.top + rect.height / 2 - window.innerHeight / 2;
            el.style.transform = `translateY(${centerDist * -0.15}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    });
  }

});
