document.addEventListener('DOMContentLoaded', () => {
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isDesktop = matchMedia('(pointer: fine)').matches;
  let time = 0;

  // ── Nav toggle ──
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

  // ── Scroll reveal ──
  const revealElements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => entries.forEach(e => e.isIntersecting && e.target.classList.add('visible')),
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );
  revealElements.forEach(el => observer.observe(el));

  // ── Nav highlight ──
  const sections = document.querySelectorAll('.hero, #services, #process, #work, .brand-section, #before-after, #projects, #contact');
  const navAnchors = document.querySelectorAll('.nav-links a');
  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id || 'hero';
        navAnchors.forEach(a => {
          a.style.opacity = a.getAttribute('href').replace('#', '') === id ? '1' : '0.7';
        });
      });
    },
    { threshold: 0.3 }
  );
  sections.forEach(s => observerNav.observe(s));

  // ── Particles ──
  if (!reducedMotion) {
    const container = document.getElementById('particles');
    if (container) {
      for (let i = 0; i < 30; i++) {
        const dot = document.createElement('div');
        dot.className = 'particle';
        dot.style.setProperty('--p-x', `${Math.random() * 100}vw`);
        dot.style.setProperty('--p-y', `${Math.random() * 100}vh`);
        dot.style.setProperty('--p-size', `${2 + Math.random() * 4}px`);
        dot.style.setProperty('--p-opacity', `${0.1 + Math.random() * 0.3}`);
        dot.style.setProperty('--p-duration', `${8 + Math.random() * 14}s`);
        dot.style.setProperty('--p-delay', `${Math.random() * -20}s`);
        container.appendChild(dot);
      }
    }
  }

  // ── Spotlight ──
  const spotlight = document.getElementById('spotlight');
  if (spotlight && isDesktop && !reducedMotion) {
    let sx = -300, sy = -300, tickingSpot = false;
    document.addEventListener('mousemove', e => {
      sx = e.clientX; sy = e.clientY;
      if (!tickingSpot) {
        requestAnimationFrame(() => {
          spotlight.style.transform = `translate(${sx - 300}px, ${sy - 300}px)`;
          tickingSpot = false;
        });
        tickingSpot = true;
      }
    });
  }

  // ── Enhanced tilt (desktop only) ──
  if (isDesktop && !reducedMotion) {
    document.querySelectorAll('.tilt-card').forEach(card => {
      const sweep = document.createElement('div');
      sweep.className = 'card-sweep';
      card.prepend(sweep);
      const maxTilt = parseFloat(card.dataset.tiltMax) || 8;
      let tickingTilt = false;
      card.addEventListener('mousemove', e => {
        if (!tickingTilt) {
          requestAnimationFrame(() => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const cx = rect.width / 2;
            const cy = rect.height / 2;
            const rx = ((y - cy) / cy) * -maxTilt;
            const ry = ((x - cx) / cx) * maxTilt;
            card.style.transform =
              `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(10px)`;
            tickingTilt = false;
          });
          tickingTilt = true;
        }
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ── Scroll parallax ──
  if (!reducedMotion) {
    const parallaxEls = document.querySelectorAll('[data-parallax]');
    if (parallaxEls.length) {
      let tickingPar = false;
      window.addEventListener('scroll', () => {
        if (!tickingPar) {
          requestAnimationFrame(() => {
            const sy = window.scrollY;
            parallaxEls.forEach(el => {
              const factor = parseFloat(el.dataset.parallaxFactor) || 0.15;
              const rect = el.getBoundingClientRect();
              const centerDist = rect.top + rect.height / 2 - window.innerHeight / 2;
              el.style.transform = `translateY(${centerDist * -factor}px)`;
            });
            tickingPar = false;
          });
          tickingPar = true;
        }
      });
    }
  }

  // ── Midground drift ──
  if (!reducedMotion) {
    const shapes = document.querySelectorAll('.midground-shape');
    if (shapes.length) {
      const origins = [];
      shapes.forEach((s, i) => {
        const rect = s.getBoundingClientRect();
        origins.push({
          el: s,
          ox: rect.left,
          oy: rect.top,
          ampX: 8 + i * 4,
          ampY: 6 + i * 3,
          speed: 0.3 + i * 0.1,
        });
      });
      function drift() {
        time += 0.016;
        origins.forEach(o => {
          o.el.style.transform = `translate(${Math.sin(time * o.speed) * o.ampX}px, ${Math.cos(time * o.speed * 0.7) * o.ampY}px)`;
        });
        requestAnimationFrame(drift);
      }
      drift();
    }
  }
});
