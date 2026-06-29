(function () {
  'use strict';

  /* ── DOM refs ───────────────────────────────────────────────── */

  var out      = document.getElementById('term-output');
  var inp      = document.getElementById('term-input');
  var body     = document.getElementById('term-body');
  var fallback = document.getElementById('proj-fallback');
  var parent   = document.body.dataset.parent || '';

  /* Hide semantic fallback — terminal output takes over visually */
  if (fallback) fallback.hidden = true;

  /* ── History state ──────────────────────────────────────────── */

  var history   = [];
  var histIdx   = -1;
  var histDraft = '';

  /* ── Project data ───────────────────────────────────────────── */

  var PROJECTS = [
    {
      slug:     'portygon',
      title:    'portygon',
      category: 'security',
      desc:     'Async TCP port scanner with banner grabbing.',
      stack:    ['rust', 'tokio']
    },
    {
      slug:     'hydropress',
      title:    'hydropress',
      category: 'tools',
      desc:     'Huffman compression CLI with a custom .h2 format.',
      stack:    ['rust']
    },
    {
      slug:     'acrux',
      title:    'acrux',
      category: 'systems',
      desc:     'Custom language with a tree-walking interpreter.',
      stack:    ['rust']
    },
    {
      slug:     'gitpulse',
      title:    'gitpulse',
      category: 'tools',
      desc:     'Scans local git repos for health status.',
      stack:    ['bash']
    },
    {
      slug:     'dotfiles',
      title:    'dotfiles',
      category: 'tools',
      desc:     'macOS tiling rice: AeroSpace + SketchyBar + kitty.',
      stack:    ['lua', 'config']
    },
    {
      slug:     'frieren',
      title:    'frieren',
      category: 'bots',
      desc:     'Discord bot that automates weekly T2L reports.',
      stack:    ['typescript', 'discord.js', 'sqlite']
    },
    {
      slug:     'miriel',
      title:    'miriel',
      category: 'bots',
      desc:     'Discord wiki bot for Elden Ring items & NPCs.',
      stack:    ['node.js', 'discord.js']
    },
    {
      slug:     'linked-list',
      title:    'linked-list',
      category: 'systems',
      desc:     'Singly + doubly linked lists in Java.',
      stack:    ['java']
    },
    {
      slug:     'parity-check',
      title:    'parity-check',
      category: 'systems',
      desc:     'Byte-for-byte file comparison.',
      stack:    ['c']
    },
    {
      slug:     'securevideo',
      title:    'securevideo',
      category: 'security',
      desc:     'Dual-SSD camera backup with checksum verify.',
      stack:    ['rust', 'python']
    }
  ];

  var CATEGORIES = ['systems', 'security', 'tools', 'bots'];

  /* ── Escape helper ──────────────────────────────────────────── */

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

  function echo(cmd) {
    line(
      '<span class="term-echo__prompt" aria-hidden="true">❯</span>' +
      ' <span class="term-echo__text">' + esc(cmd) + '</span>',
      'echo'
    );
  }

  /* ── Project card ───────────────────────────────────────────── */

  function renderCard(p) {
    var card = document.createElement('div');
    card.className = 'proj-card';
    card.innerHTML =
      '<div class="proj-card__header">' +
        '<span class="proj-card__name">' + esc(p.title) + '</span>' +
        '<span class="proj-card__tag proj-card__tag--' + p.category + '">[' + p.category + ']</span>' +
      '</div>' +
      '<div class="proj-card__desc">' + esc(p.desc) + '</div>' +
      '<div class="proj-card__stack">' + p.stack.map(esc).join(' &middot; ') + '</div>' +
      '<div class="proj-card__hint">' +
        '&rarr;&nbsp;<span class="proj-card__hint-cmd">cd ' + esc(p.slug) + '</span>' +
      '</div>';
    out.appendChild(card);
    out.scrollTop = out.scrollHeight;
  }

  /* ── Page header (printed once on boot) ────────────────────── */

  function printHeader() {
    blank();
    line(
      '<span class="proj-header__path">~/projects</span>' +
      '<span class="proj-header__hint"> &mdash; type help for commands</span>',
      ''
    );
    line('<hr class="term-hr" aria-hidden="true">', '');
  }

  /* ── Command implementations ─────────────────────────────────── */

  function helpRow(cmd, desc) {
    return (
      '<div class="term-help__row">' +
        '<span class="term-help__cmd">' + cmd + '</span>' +
        '<span class="term-help__desc">' + desc + '</span>' +
      '</div>'
    );
  }

  function cmdHelp() {
    line(
      '<div class="term-help">' +
        '<div class="term-help__label">available commands</div>' +
        helpRow('ls',                             'list projects') +
        helpRow('cd&nbsp;&lt;project&gt;',        'open a project') +
        helpRow('cd&nbsp;contact',                'navigate to ~/contact') +
        helpRow('cd&nbsp;..',                     'go up one level') +
        helpRow('cd&nbsp;~ &nbsp;/&nbsp;home',    'go home') +
        helpRow('open&nbsp;&lt;name&gt;',         'open a project page') +
        helpRow('filter&nbsp;&lt;category&gt;',   'filter: systems / security / tools / bots') +
        helpRow('contact',                        'navigate to ~/contact') +
        helpRow('clear',                          'clear the terminal') +
        helpRow('help',                           'show this message') +
      '</div>',
      ''
    );
  }

  /* ls — show the full project grid (or filtered subset) */
  function cmdLs(filter) {
    var subset = filter
      ? PROJECTS.filter(function (p) { return p.category === filter; })
      : PROJECTS;

    if (filter && !subset.length) {
      line(
        '<span class="term-hint">no projects in category: <span class="term-hint__cmd">' +
        esc(filter) + '</span></span>',
        ''
      );
      return;
    }

    blank();

    if (filter) {
      line(
        '<span class="term-hint">showing: <span class="term-hint__cmd">' +
        esc(filter) + '</span></span>',
        ''
      );
      blank();
    }

    var i;
    for (i = 0; i < subset.length; i++) {
      renderCard(subset[i]);
    }

    blank();
    line(
      '<span class="term-hint">' +
        subset.length + ' project' + (subset.length === 1 ? '' : 's') +
        (filter
          ? ' &mdash; type <span class="term-hint__cmd">ls</span> to see all'
          : ' &mdash; type <span class="term-hint__cmd">cd &lt;name&gt;</span> to open') +
      '</span>',
      ''
    );
  }

  /* ls projects — print slugs inline; no cards, no navigation */
  function cmdLsProjectsSlugs() {
    var slugs = PROJECTS.map(function (p) { return p.slug; });
    line(slugs.join('    '), '');
  }

  /* cd — change directory or open a project slug */
  function cmdCd(arg) {
    var a = arg.trim().toLowerCase();
    if (!a || a === '~' || a === 'home') { cmdHome();  return; }
    if (a === '..')                       { cmdCdUp();  return; }
    if (a === 'projects') {
      line(
        '<span class="term-hint">already in <span class="term-hint__cmd">~/projects</span></span>',
        ''
      );
      return;
    }
    if (a === 'contact') {
      line(
        '<span class="term-hint">&rarr; navigating to <span class="term-hint__cmd">kontakt.html</span>&hellip;</span>',
        ''
      );
      window.location.href = 'kontakt.html';
      return;
    }
    /* Try as project slug */
    var match = null;
    var i;
    for (i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].slug === a) { match = PROJECTS[i]; break; }
    }
    if (match) {
      line(
        '<span class="term-hint">&rarr; opening <span class="term-hint__cmd">projekt/' +
        esc(match.slug) + '.html</span>&hellip;</span>',
        ''
      );
      window.location.href = 'projekt/' + match.slug + '.html';
      return;
    }
    line(
      '<span class="term-err">cd: ' + esc(arg.trim()) + ': no such directory</span>',
      ''
    );
  }

  function cmdFilter(arg) {
    var cat = arg.trim().toLowerCase();
    if (!cat || cat === 'all') {
      cmdLs(null);
      return;
    }
    if (CATEGORIES.indexOf(cat) === -1) {
      line(
        '<span class="term-err">unknown category: <span class="term-cmd-name">' +
        esc(cat) + '</span> &mdash; valid: ' + CATEGORIES.join(' / ') + '</span>',
        ''
      );
      return;
    }
    cmdLs(cat);
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
      '<span class="term-hint">&rarr; opening <span class="term-hint__cmd">projekt/' +
      esc(name) + '.html</span>&hellip;</span>',
      ''
    );
    window.location.href = 'projekt/' + name + '.html';
  }

  function cmdContact() {
    line(
      '<span class="term-hint">&rarr; navigating to <span class="term-hint__cmd">kontakt.html</span>&hellip;</span>',
      ''
    );
    window.location.href = 'kontakt.html';
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

  function cmdHome() {
    line(
      '<span class="term-hint">&rarr; navigating to <span class="term-hint__cmd">index.html</span>&hellip;</span>',
      ''
    );
    window.location.href = 'index.html';
  }

  function cmdClear() {
    out.innerHTML = '';
  }

  /* ── Known commands for Tab completion ─────────────────────── */

  var KNOWN = [
    'help', 'ls', 'ls projects',
    'cd portygon', 'cd hydropress', 'cd acrux', 'cd gitpulse',
    'cd dotfiles', 'cd frieren', 'cd miriel', 'cd linked-list',
    'cd parity-check', 'cd securevideo',
    'cd contact', 'cd ..', 'cd ~', 'cd home',
    'filter all', 'filter systems', 'filter security', 'filter tools', 'filter bots',
    'open portygon', 'open hydropress', 'open acrux', 'open gitpulse',
    'open dotfiles', 'open frieren', 'open miriel', 'open linked-list',
    'open parity-check', 'open securevideo',
    'contact', 'home', 'clear'
  ];

  /* ── Execute ─────────────────────────────────────────────────── */

  function execute(raw) {
    var trimmed = raw.trim();
    if (!trimmed) return;

    history.unshift(trimmed);
    if (history.length > 100) history.pop();
    histIdx   = -1;
    histDraft = '';

    echo(trimmed);

    var lower = trimmed.toLowerCase();

    if (lower === 'help')                    { cmdHelp();                   return; }
    if (lower === 'ls')                      { cmdLs(null);                 return; }
    if (lower === 'ls projects')             { cmdLsProjectsSlugs();        return; }
    if (lower === 'contact')                 { cmdContact();                return; }
    if (lower === 'cd')                      { cmdHome();                   return; }
    if (lower.startsWith('cd '))             { cmdCd(trimmed.slice(3));     return; }
    if (lower === 'home')                    { cmdHome();                   return; }
    if (lower === 'clear')                   { cmdClear();                  return; }
    if (lower.startsWith('filter '))         { cmdFilter(trimmed.slice(7)); return; }
    if (lower === 'filter')                  { cmdFilter('');               return; }
    if (lower.startsWith('open '))           { cmdOpen(trimmed.slice(5));   return; }
    if (lower === 'open')                    { cmdOpen('');                 return; }

    line(
      '<span class="term-err">command not found: ' +
        esc(trimmed) +
        ' &mdash; type <span class="term-hint__cmd">help</span>' +
      '</span>',
      ''
    );
  }

  /* ── Keyboard handling ───────────────────────────────────────── */

  inp.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
      var val = inp.value;
      inp.value = '';
      execute(val);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      if (histIdx === -1) histDraft = inp.value;
      histIdx = Math.min(histIdx + 1, history.length - 1);
      inp.value = history[histIdx];
      requestAnimationFrame(function () {
        inp.setSelectionRange(inp.value.length, inp.value.length);
      });
      return;
    }

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

    if (e.key === 'Tab') {
      e.preventDefault();
      var val = inp.value.toLowerCase();
      if (!val) return;
      var matches = KNOWN.filter(function (c) { return c.startsWith(val); });
      if (matches.length === 1) {
        inp.value = matches[0];
      } else if (matches.length > 1) {
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
        e.stopPropagation();
        execute(chip.dataset.cmd);
        inp.focus();
      });
    }(chips[i]));
  }

  /* ── Click anywhere in main → focus input ───────────────────── */

  body.addEventListener('click', function (e) {
    if (e.target !== inp) inp.focus();
  });

  /* ── Boot sequence ───────────────────────────────────────────── */

  printHeader();
  line(
    '<span class="term-hint">(type <span class="term-hint__cmd">ls</span> to list)</span>',
    ''
  );
  blank();
  inp.focus();

}());
