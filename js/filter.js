(function () {
  'use strict';

  var bar   = document.querySelector('.filter-bar');
  var items = document.querySelectorAll('.projects-grid > li');

  if (!bar || !items.length) return;

  bar.addEventListener('click', function (e) {
    var btn = e.target.closest('.filter-btn');
    if (!btn) return;

    var filter = btn.dataset.filter;

    /* Update aria-pressed + active class on all buttons */
    bar.querySelectorAll('.filter-btn').forEach(function (b) {
      var active = b === btn;
      b.setAttribute('aria-pressed', active ? 'true' : 'false');
      b.classList.toggle('filter-btn--active', active);
    });

    /* Show / hide list items via the native `hidden` attribute.
       Without this script the attribute is never set, so all cards
       remain visible — no broken no-JS state.                      */
    items.forEach(function (li) {
      var card = li.querySelector('.project-card');
      li.hidden = !(filter === 'all' || card.dataset.category === filter);
    });
  });
}());
