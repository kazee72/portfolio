(function () {
  'use strict';

  var shell   = document.querySelector('.shell');
  var sidebar = document.getElementById('sidebar');
  var toggle  = document.getElementById('sidebar-toggle');
  var overlay = document.getElementById('sidebar-overlay');

  if (!shell || !sidebar || !toggle || !overlay) return;

  function openSidebar() {
    sidebar.classList.add('is-open');
    shell.classList.add('sidebar-open');
    overlay.classList.add('is-visible');
    overlay.removeAttribute('aria-hidden');
    toggle.setAttribute('aria-expanded', 'true');
  }

  function closeSidebar() {
    sidebar.classList.remove('is-open');
    shell.classList.remove('sidebar-open');
    overlay.classList.remove('is-visible');
    overlay.setAttribute('aria-hidden', 'true');
    toggle.setAttribute('aria-expanded', 'false');
  }

  function isOpen() {
    return toggle.getAttribute('aria-expanded') === 'true';
  }

  toggle.addEventListener('click', function () {
    isOpen() ? closeSidebar() : openSidebar();
  });

  /* Click outside (overlay on mobile; document on tablet) */
  document.addEventListener('click', function (e) {
    if (!isOpen()) return;
    if (sidebar.contains(e.target)) return;
    if (toggle.contains(e.target)) return;
    closeSidebar();
  });

  /* Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && isOpen()) {
      closeSidebar();
      toggle.focus();
    }
  });
}());
