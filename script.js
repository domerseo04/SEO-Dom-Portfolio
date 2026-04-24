/* script.js — Domer Cahiles Portfolio */
'use strict';

/* ── NAV SCROLL SHADOW ── */
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 20), { passive: true });

/* ── MOBILE NAV ── */
const ham = document.getElementById('ham');
const nl  = document.getElementById('navLinks');
const bs  = ham ? ham.querySelectorAll('span') : [];
function closeNav() {
  if (nl) nl.classList.remove('open');
  bs[0].style.transform = ''; bs[1].style.opacity = ''; bs[2].style.transform = '';
  document.querySelectorAll('.dropdown.mob-open').forEach(d => {
    d.classList.remove('mob-open');
    const ch = d.previousElementSibling?.querySelector('.chevron');
    if (ch) ch.style.transform = '';
  });
}
if (ham && nl) {
  ham.addEventListener('click', () => {
    const o = nl.classList.toggle('open');
    if (o) { bs[0].style.transform='translateY(7px) rotate(45deg)'; bs[1].style.opacity='0'; bs[2].style.transform='translateY(-7px) rotate(-45deg)'; }
    else closeNav();
  });
  document.addEventListener('click', e => { if (nl && ham && !nl.contains(e.target) && !ham.contains(e.target)) closeNav(); });
}

/* ── MOBILE DROPDOWN ── */
document.querySelectorAll('.has-drop > a').forEach(trigger => {
  trigger.addEventListener('click', e => {
    if (window.innerWidth > 768) return;
    e.preventDefault();
    const dd = trigger.parentElement.querySelector('.dropdown');
    const ch = trigger.querySelector('.chevron');
    if (!dd) return;
    const open = dd.classList.toggle('mob-open');
    if (ch) ch.style.transform = open ? 'rotate(180deg)' : '';
  });
});
document.querySelectorAll('.nav-links a:not(.has-drop > a)').forEach(a => a.addEventListener('click', closeNav));

/* ── SCROLL REVEAL ── */
const rvs = document.querySelectorAll('.rv');
if ('IntersectionObserver' in window) {
  const ob = new IntersectionObserver(en => {
    en.forEach(e => { if (e.isIntersecting) { e.target.classList.add('on'); ob.unobserve(e.target); } });
  }, { threshold: 0.09, rootMargin: '0px 0px -36px 0px' });
  rvs.forEach(el => ob.observe(el));
} else { rvs.forEach(el => el.classList.add('on')); }

/* ── BACK TO TOP ── */
const btt = document.getElementById('btt');
if (btt) {
  window.addEventListener('scroll', () => btt.classList.toggle('show', window.scrollY > 500), { passive: true });
  btt.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

/* ── SMOOTH SCROLL WITH HEADER OFFSET ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const t = document.querySelector(id);
    if (!t) return;
    e.preventDefault();
    window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' });
  });
});

/* ── ACTIVE NAV LINK ── */
const secs = document.querySelectorAll('section[id]');
const nas  = document.querySelectorAll('.nav-links > li > a[href^="#"]');
window.addEventListener('scroll', () => {
  let cur = '';
  secs.forEach(s => { if (window.scrollY + 80 >= s.offsetTop) cur = s.id; });
  nas.forEach(a => { a.classList.toggle('active', a.getAttribute('href') === '#' + cur); });
}, { passive: true });

/* ── HERO ENTRANCE ── */
window.addEventListener('DOMContentLoaded', () => {
  const hl = document.getElementById('heroLeft');
  if (hl) {
    hl.style.cssText = 'opacity:0;transform:translateY(20px);transition:opacity .85s cubic-bezier(.16,1,.3,1),transform .85s cubic-bezier(.16,1,.3,1)';
    setTimeout(() => { hl.style.opacity = '1'; hl.style.transform = 'translateY(0)'; }, 80);
  }
});
