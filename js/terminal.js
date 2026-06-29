(function () {
  'use strict';

  /* ── Base path ──────────────────────────────────────────────── */
  /* data-base: "." on root pages, ".." on projekt/ pages         */
  /* data-page: "home" on index, "contact" on kontakt             */
  /* data-project: slug on detail pages                           */

  var base    = document.body.dataset.base    || '.';
  var parent  = document.body.dataset.parent  || '';
  var page    = document.body.dataset.page    || '';
  var project = document.body.dataset.project || '';

  /* ── DOM refs ───────────────────────────────────────────────── */

  var out   = document.getElementById('term-output');
  var inp   = document.getElementById('term-input');
  var body  = document.getElementById('term-body');

  /* ── History state ──────────────────────────────────────────── */

  var history   = [];   /* index 0 = most recent command */
  var histIdx   = -1;   /* -1 = not browsing history     */
  var histDraft = '';   /* saves in-progress text while browsing */

  /* ── Escape helper (applied to any user-supplied string) ─────── */

  function esc(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  /* ── Render helpers ─────────────────────────────────────────── */

  function line(html, mod) {
    var el = document.createElement('div');
    el.className = 'term-line' + (mod ? ' term-line--' + mod : '');
    el.innerHTML = html;
    out.appendChild(el);
    out.scrollTop = out.scrollHeight;
    return el;
  }

  function blank() { line('&nbsp;', 'blank'); }

  function appendBlock(html) {
    var el = document.createElement('div');
    el.innerHTML = html;
    while (el.firstChild) {
      out.appendChild(el.firstChild);
    }
    out.scrollTop = out.scrollHeight;
  }

  function echo(cmd) {
    line(
      '<span class="term-echo__prompt" aria-hidden="true">❯</span>' +
      ' <span class="term-echo__text">' + esc(cmd) + '</span>',
      'echo'
    );
  }

  /* ── Banner ─────────────────────────────────────────────────── */

  function printBanner() {
    blank();
    line(
      '<span class="banner__handle">kazee72</span>' +
      '<span class="banner__tagline">developer</span>',
      'banner'
    );
    line('<hr class="term-hr" aria-hidden="true">', '');
    line(
      '<span class="term-hint">' +
        'type <span class="term-hint__cmd">help</span> to get started' +
      '</span>',
      ''
    );
    blank();
  }

  /* ── Help table ─────────────────────────────────────────────── */

  function helpRow(cmd, desc) {
    return (
      '<div class="term-help__row">' +
        '<span class="term-help__cmd">' + cmd + '</span>' +
        '<span class="term-help__desc">' + desc + '</span>' +
      '</div>'
    );
  }

  /* ── Command implementations ─────────────────────────────────── */

  function cmdHelp() {
    line(
      '<div class="term-help">' +
        '<div class="term-help__label">available commands</div>' +
        helpRow('cd&nbsp;projects',              'navigate to ~/projects') +
        helpRow('cd&nbsp;contact',               'navigate to ~/contact') +
        helpRow('cd&nbsp;..',                    'go up one level') +
        helpRow('cd&nbsp;~ &nbsp;/&nbsp;home',   'go home (alias: cd&nbsp;home, cd)') +
        helpRow('ls',                            'list current directory') +
        helpRow('open&nbsp;&lt;name&gt;',        'open a project page') +
        helpRow('contact',                       'navigate to ~/contact') +
        helpRow('subscribe',                     'join the newsletter') +
        helpRow('clear',                         'clear the terminal') +
        helpRow('help',                          'show this message') +
      '</div>',
      ''
    );
  }

  function cmdAbout() {
    /*
     * ── PLACEHOLDER ──────────────────────────────────────────
     * Edit the lines below to personalise the about block.
     * ──────────────────────────────────────────────────────── */
    line(
      '<div class="term-about">' +
        '<p>Hi — I\'m <strong>Joel Bonini</strong>. ' +
        '[Placeholder — replace this paragraph with your own bio.]</p>' +
        '<p>I work on security tooling, systems programming, and automation. ' +
        'Mostly Rust, Python, and Go. Currently exploring network scanning, ' +
        'binary analysis, and building useful open-source things.</p>' +
        '<p>' +
          'Based in: <span class="term-about__meta">[your location]</span><br>' +
          'Open to:&ensp;<span class="term-about__meta">freelance / collaborations</span>' +
        '</p>' +
        '<p class="term-about__edit">→ edit this block: js/terminal.js → cmdAbout()</p>' +
      '</div>',
      ''
    );
  }

  /* subscribe — inline newsletter signup form */
  function cmdSubscribe() {
    /*
     * ── Form action options (replace before deploying) ───────
     *   A) Formspree:  action="https://formspree.io/f/REPLACE_ME"
     *   B) mailto:     action="mailto:[your-email@domain.com]"
     *                  enctype="text/plain"
     * ───────────────────────────────────────────────────────── */
    appendBlock(
      '<div class="detail-section">' +
        '<div class="detail-section__label">newsletter</div>' +
        '<div class="detail-body" style="margin-bottom:var(--space-3)">' +
          'No spam — just occasional notes on security tooling, ' +
          'new projects, and things worth reading.' +
        '</div>' +
        '<form class="detail-form" id="subscribe-form"' +
        '      action="https://formspree.io/f/xaqgbege" method="post">' +

          '<input type="hidden" name="_subject" value="Newsletter subscription">' +
          '<input type="hidden" name="_template" value="table">' +

          '<div class="detail-form__group">' +
            '<label class="detail-form__label" for="sub-email">email</label>' +
            '<input class="detail-form__input" id="sub-email" name="email"' +
            '       type="email" required autocomplete="email"' +
            '       placeholder="you@domain.com">' +
          '</div>' +

          '<button class="detail-form__submit" type="submit">subscribe</button>' +
        '</form>' +
      '</div>'
    );
    blank();

    /* Progressive enhancement: intercept submit, POST via fetch,
       show an inline confirmation. Falls back to a normal POST
       if JS (or fetch) is unavailable.                          */
    var form = document.getElementById('subscribe-form');
    if (form && window.fetch) {
      form.addEventListener('submit', function (e) {
        e.preventDefault();

        var btn = form.querySelector('.detail-form__submit');
        btn.disabled = true;
        btn.textContent = 'subscribing…';

        fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        })
        .then(function (res) {
          if (!res.ok) throw new Error('HTTP ' + res.status);
          line(
            '<span class="term-ok">&#10003;</span>' +
            ' subscribed — thanks, watch your inbox',
            ''
          );
          form.reset();
          btn.disabled = false;
          btn.textContent = 'subscribe';
        })
        .catch(function () {
          line(
            '<span class="term-err">&#10007; subscription failed — check your connection and try again</span>',
            ''
          );
          btn.disabled = false;
          btn.textContent = 'try again';
        });
      });
    }

    inp.focus();
  }

  /* ls — list the current directory; does NOT navigate */
  function cmdLs() {
    if (page === 'home') {
      line(
        '<span class="term-hint__cmd">projects/</span>    contact    about',
        ''
      );
    } else if (project) {
      /* detail page — ~/projects/<slug> */
      line(
        '<span class="term-hint__cmd">../</span>    overview    source    form',
        ''
      );
    } else {
      /* contact or other page */
      line(
        '<span class="term-hint__cmd">../</span>    about    form',
        ''
      );
    }
  }

  /* ls projects — print project slugs inline; does NOT navigate */
  function cmdLsProjectsSlugs() {
    var slugs = [
      'portygon', 'hydropress', 'acrux', 'gitpulse', 'dotfiles',
      'frieren', 'miriel', 'linked-list', 'parity-check', 'securevideo'
    ];
    line(slugs.join('    '), '');
  }

  /* cd — change directory; always navigates, never lists */
  function cmdCd(arg) {
    var a = arg.trim().toLowerCase();
    if (!a || a === '~' || a === 'home') { cmdHome();  return; }
    if (a === '..')                       { cmdCdUp();  return; }
    if (a === 'projects') {
      line(
        '<span class="term-hint">&rarr; navigating to <span class="term-hint__cmd">projekte.html</span>&hellip;</span>',
        ''
      );
      window.location.href = base + '/projekte.html';
      return;
    }
    if (a === 'contact') {
      line(
        '<span class="term-hint">&rarr; navigating to <span class="term-hint__cmd">kontakt.html</span>&hellip;</span>',
        ''
      );
      window.location.href = base + '/kontakt.html';
      return;
    }
    line(
      '<span class="term-err">cd: ' + esc(arg.trim()) + ': no such directory</span>',
      ''
    );
  }

  function cmdOpen(arg) {
    var name = arg.trim();
    if (!name) {
      line(
        '<span class="term-err">usage: open <span class="term-cmd-name">&lt;project-name&gt;</span></span>',
        ''
      );
      return;
    }
    line(
      '<span class="term-hint">' +
        '&rarr; opening <span class="term-hint__cmd">projekt/' + esc(name) + '.html</span>&hellip;' +
      '</span>',
      ''
    );
    window.location.href = base + '/projekt/' + name + '.html';
  }

  function cmdContact() {
    line(
      '<span class="term-hint">' +
        '&rarr; navigating to <span class="term-hint__cmd">kontakt.html</span>&hellip;' +
      '</span>',
      ''
    );
    window.location.href = base + '/kontakt.html';
  }

  function cmdHome() {
    line(
      '<span class="term-hint">' +
        '&rarr; navigating to <span class="term-hint__cmd">index.html</span>&hellip;' +
      '</span>',
      ''
    );
    window.location.href = base + '/index.html';
  }

  function cmdCdUp() {
    if (!parent) {
      line('<span class="term-hint">already at <span class="term-hint__cmd">~</span></span>', '');
      return;
    }
    line(
      '<span class="term-hint">' +
        '&rarr; navigating to <span class="term-hint__cmd">' + esc(parent) + '</span>&hellip;' +
      '</span>',
      ''
    );
    window.location.href = parent;
  }

  function cmdClear() {
    out.innerHTML = '';
  }

  function cmdNeofetch() {
    printBanner();
  }

  /* ── Known command names for Tab completion ──────────────────── */

  var KNOWN = [
    'help', 'about', 'ls', 'ls projects',
    'cd projects', 'cd contact', 'cd ..', 'cd ~', 'cd home',
    'open portygon', 'open hydropress', 'open acrux', 'open gitpulse',
    'open dotfiles', 'open frieren', 'open miriel', 'open linked-list',
    'open parity-check', 'open securevideo',
    'contact', 'home', 'clear', 'neofetch',
    'subscribe'
  ];

  /* ── Execute ─────────────────────────────────────────────────── */

  function execute(raw) {
    var trimmed = raw.trim();
    if (!trimmed) return;

    /* Push to history (always — mirrors bash default) */
    history.unshift(trimmed);
    if (history.length > 100) history.pop();
    histIdx   = -1;
    histDraft = '';

    echo(trimmed);

    var lower = trimmed.toLowerCase();

    if (lower === 'help')              { cmdHelp();                  return; }
    if (lower === 'about')             { cmdAbout();                 return; }
    if (lower === 'ls')                { cmdLs();                    return; }
    if (lower === 'ls projects')       { cmdLsProjectsSlugs();       return; }
    if (lower === 'contact')           { cmdContact();               return; }
    if (lower === 'subscribe')         { cmdSubscribe();             return; }
    if (lower === 'cd')                { cmdHome();                  return; }
    if (lower.startsWith('cd '))       { cmdCd(trimmed.slice(3));    return; }
    if (lower === 'home')              { cmdHome();                  return; }
    if (lower === 'clear')             { cmdClear();                 return; }
    if (lower === 'neofetch')          { cmdNeofetch();              return; }
    if (lower.startsWith('open '))     { cmdOpen(trimmed.slice(5));  return; }
    if (lower === 'open')              { cmdOpen('');                return; }

    /* Unknown command */
    line(
      '<span class="term-err">command not found: ' +
        '<span style="color:var(--text)">' + esc(trimmed) + '</span>' +
        ' — type <span class="term-hint__cmd">help</span>' +
      '</span>',
      ''
    );
  }

  /* ── Keyboard handling ───────────────────────────────────────── */

  inp.addEventListener('keydown', function (e) {
    /* Enter → execute */
    if (e.key === 'Enter') {
      var val = inp.value;
      inp.value = '';
      execute(val);
      return;
    }

    /* ArrowUp → older history entry */
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      if (histIdx === -1) histDraft = inp.value;
      histIdx = Math.min(histIdx + 1, history.length - 1);
      inp.value = history[histIdx];
      /* move caret to end */
      requestAnimationFrame(function () {
        inp.setSelectionRange(inp.value.length, inp.value.length);
      });
      return;
    }

    /* ArrowDown → newer history entry (or restore draft) */
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (histIdx === -1) return;
      histIdx--;
      inp.value = histIdx === -1 ? histDraft : history[histIdx];
      requestAnimationFrame(function () {
        inp.setSelectionRange(inp.value.length, inp.value.length);
      });
      return;
    }

    /* Tab → prefix autocomplete */
    if (e.key === 'Tab') {
      e.preventDefault();
      var val = inp.value.toLowerCase();
      if (!val) return;
      var matches = KNOWN.filter(function (c) { return c.startsWith(val); });
      if (matches.length === 1) {
        /* unique match — complete it */
        inp.value = matches[0];
      } else if (matches.length > 1) {
        /* multiple matches — echo input and list them */
        echo(inp.value);
        line(matches.join('    '), '');
      }
      return;
    }
  });

  /* ── Chip buttons ────────────────────────────────────────────── */

  var chips = document.querySelectorAll('.chip');
  var i;
  for (i = 0; i < chips.length; i++) {
    (function (chip) {
      chip.addEventListener('click', function (e) {
        e.stopPropagation();          /* prevent body click from double-firing focus */
        execute(chip.dataset.cmd);
        inp.focus();
      });
    }(chips[i]));
  }

  /* ── Click anywhere in main → focus input ───────────────────── */
  /* Skip focus steal when clicking form controls or links        */

  body.addEventListener('click', function (e) {
    var t = e.target;
    if (t === inp) return;
    var tag = t.tagName;
    if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'BUTTON' || tag === 'A' || tag === 'SELECT') return;
    inp.focus();
  });

  /* ── Public API for page-specific boot hooks ───────────────── */

  window.__term = {
    echo:        echo,
    line:        line,
    blank:       blank,
    appendBlock: appendBlock,
    focus:       function () { inp.focus(); }
  };

  /* ── Boot sequence ───────────────────────────────────────────── */
  /* If a page defines window.__termBoot before this script loads, */
  /* call it with the API instead of the default banner+help boot. */

  if (typeof window.__termBoot === 'function') {
    window.__termBoot(window.__term);
  } else {
    printBanner();
    execute('help');
    blank();
    inp.focus();
  }

}());
