// Mobile menu toggle
const toggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Opening hours: highlight today and show open/closed status
// Schedule: Mon–Fri 06:00–23:00, Sat & Sun 08:00–12:00
const schedule = {
  0: { open: 8, close: 12 },   // Domingo
  1: { open: 6, close: 23 },   // Segunda
  2: { open: 6, close: 23 },   // Terça
  3: { open: 6, close: 23 },   // Quarta
  4: { open: 6, close: 23 },   // Quinta
  5: { open: 6, close: 23 },   // Sexta
  6: { open: 8, close: 12 },   // Sábado
};

function updateHours() {
  const now = new Date();
  const today = now.getDay();
  const hour = now.getHours() + now.getMinutes() / 60;

  document.querySelectorAll('.hours tr[data-day]').forEach((row) => {
    row.classList.toggle('today', Number(row.dataset.day) === today);
  });

  const status = document.getElementById('status');
  if (!status) return;

  const hoje = schedule[today];
  const aberto = hour >= hoje.open && hour < hoje.close;

  if (aberto) {
    status.textContent = 'Estamos abertos agora!';
    status.className = 'status open';
  } else {
    status.textContent = 'No momento estamos fechados. Confira o próximo horário abaixo.';
    status.className = 'status closed';
  }
}

updateHours();

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Reveal sections on scroll
const revealTargets = document.querySelectorAll('.section .container > *');
revealTargets.forEach((el) => el.classList.add('reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('visible'));
}
