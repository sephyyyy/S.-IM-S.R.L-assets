/* ═══════════════════════════════════════════════════════════
   CR Digital Group — main.js
═══════════════════════════════════════════════════════════ */

const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;

/* ── Custom cursor (desktop only) ── */
const cursor     = document.getElementById('cursor');
const cursorRing = document.getElementById('cursorRing');

if (!isTouch) {
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
  });

  (function animRing() {
    ringX += (mouseX - ringX) * 0.15;
    ringY += (mouseY - ringY) * 0.15;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top  = ringY + 'px';
    requestAnimationFrame(animRing);
  })();

  document.querySelectorAll('a, button, .service-card, .machine-row, .clothing-feat, .pitem')
    .forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.width  = '20px';
        cursor.style.height = '20px';
        cursorRing.style.width       = '60px';
        cursorRing.style.height      = '60px';
        cursorRing.style.borderColor = 'rgba(255,45,85,.5)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.width  = '12px';
        cursor.style.height = '12px';
        cursorRing.style.width       = '36px';
        cursorRing.style.height      = '36px';
        cursorRing.style.borderColor = 'rgba(255,255,255,.4)';
      });
    });
} else {
  cursor.style.display     = 'none';
  cursorRing.style.display = 'none';
  document.body.style.cursor = 'auto';
}

/* ── Navbar: add .scrolled class on scroll ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}, { passive: true });

/* ── Mobile hamburger menu ── */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
const mobileClose = document.getElementById('mobileClose');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});
mobileClose.addEventListener('click', () => {
  mobileMenu.classList.remove('open');
  document.body.style.overflow = '';
});
document.querySelectorAll('.mobile-menu a').forEach(a => {
  a.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* ── Scroll reveal ── */
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: isTouch ? 0.06 : 0.12 });

revealEls.forEach((el, i) => {
  el.dataset.delay = i % 4;
  revealObs.observe(el);
});

/* ── Stagger transition delays ── */
document.querySelectorAll('.service-card').forEach((c, i) => c.style.transitionDelay = (i * 0.10) + 's');
document.querySelectorAll('.machine-row').forEach( (r, i) => r.style.transitionDelay = (i * 0.07) + 's');
document.querySelectorAll('.loc-card').forEach(   (c, i) => c.style.transitionDelay = (i * 0.10) + 's');
document.querySelectorAll('.pitem').forEach(      (p, i) => p.style.transitionDelay = (i * 0.08) + 's');

/* ── Portfolio filter buttons ── */
document.querySelectorAll('.pf-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

/* ── Sticky CTA bar: hide when contact section is visible ── */
const stickyCta      = document.getElementById('stickyCta');
const contactSection = document.getElementById('contact');

if (stickyCta && contactSection) {
  const stickyObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      stickyCta.style.transition    = 'opacity .3s ease, transform .3s ease';
      stickyCta.style.opacity       = e.isIntersecting ? '0'    : '';
      stickyCta.style.transform     = e.isIntersecting ? 'translateY(100%)' : '';
      stickyCta.style.pointerEvents = e.isIntersecting ? 'none' : '';
    });
  }, { threshold: 0.1 });
  stickyObs.observe(contactSection);
}

/* ── Hero ink blob parallax (desktop only for performance) ── */
if (!isTouch) {
  window.addEventListener('scroll', () => {
    const s = window.scrollY;
    document.querySelectorAll('.hero-ink').forEach((ink, i) => {
      ink.style.transform = `translateY(${s * (0.10 + i * 0.05)}px)`;
    });
  }, { passive: true });
}
