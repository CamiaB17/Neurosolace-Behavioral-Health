/* ─────────────────────────────────────────
   NeuroSolace Behavioral Health — Scripts
   ───────────────────────────────────────── */

// ── NAV SCROLL SHADOW ──────────────────────
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 20);
});


// ── SCROLL REVEAL ANIMATION ────────────────
// Only animate elements that are genuinely below the viewport.
// Anything already visible on load gets shown immediately.
document.body.classList.add('js-ready');

const reveals = document.querySelectorAll('.reveal');

function isInViewport(el) {
  const rect = el.getBoundingClientRect();
  return rect.top < (window.innerHeight || document.documentElement.clientHeight);
}

// On load: immediately show anything already on screen
reveals.forEach((el) => {
  if (isInViewport(el)) {
    el.classList.add('visible');
  }
});

// For the rest, observe and animate on scroll
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const index = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 60);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

reveals.forEach((el) => {
  if (!el.classList.contains('visible')) {
    revealObserver.observe(el);
  }
});


// ── MOBILE MENU ────────────────────────────
const menuBtn   = document.getElementById('menuBtn');
const closeBtn  = document.getElementById('closeBtn');
const mobileNav = document.getElementById('mobileNav');

menuBtn.addEventListener('click', () => {
  mobileNav.classList.add('open');
  document.body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', closeMobileNav);

mobileNav.querySelectorAll('.mob-link').forEach((link) => {
  link.addEventListener('click', closeMobileNav);
});

function closeMobileNav() {
  mobileNav.classList.remove('open');
  document.body.style.overflow = '';
}

// NOTE: Contact form submission logic now lives in contact.js
// (it needs EmailJS, which is only loaded on contact.html)