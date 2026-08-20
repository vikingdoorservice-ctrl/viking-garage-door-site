document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.site-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', nav.classList.contains('open'));
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') nav.classList.remove('open');
    });
  }
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});

// Клик по номеру телефона -> событие Contact (Meta Pixel) и phone_call (Google tag).
// Нужен для оптимизации рекламы на звонки: без него треть конверсий (звонки) невидима.
document.addEventListener('click', function (e) {
  var link = e.target && e.target.closest ? e.target.closest('a[href^="tel:"]') : null;
  if (!link) return;
  if (typeof fbq === 'function') fbq('track', 'Contact');
  if (typeof gtag === 'function') gtag('event', 'phone_call', { event_category: 'engagement' });
});
