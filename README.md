# portfolio-template

A terminal-style portfolio template — visitors navigate the site by typing
commands (`cd`, `ls`, `open`, …) just like a real shell. Built from scratch with
vanilla HTML, CSS, and JavaScript: no frameworks, no dependencies, no build step.

This is the **template version**: every personalized value is replaced with a
placeholder (`your-name`, `your-username`, `[your-email@domain.com]`,
`REPLACE_ME`, …) so a fresh clone is safe to build your own portfolio on.

## Quickstart

The site is fully static and every path is relative, so the cleanest way to run
it locally is to serve the folder:

```
python3 -m http.server
# or on Windows: python -m http.server
# then open http://localhost:8000
```

It deploys unchanged on GitHub Pages (or any static host).

## Personalize — checklist

| What | Where |
|---|---|
| Name / handle | `index.html` + `kontakt.html` + `projekte.html` (`<title>`, `<h1>`), `js/terminal.js` (banner) |
| Window title bar (`user@portfolio: …`) | `win-bar__title` in every page |
| Bio (about command) | `js/terminal.js` → `cmdAbout()` |
| Bio + location (contact page) | `kontakt.html` → `window.__termBoot` (about block) |
| GitHub links | site footers (all pages), `kontakt.html`, and each project page's source link |
| Email address | `kontakt.html` (`[your-email@domain.com]`, two places) |
| Contact form | `kontakt.html` — replace both `REPLACE_ME` form actions with your [Formspree](https://formspree.io) ID |
| Newsletter form | `js/terminal.js` → `cmdSubscribe()` — same, replace `REPLACE_ME` |
| Project list (terminal cards) | `js/projekte.js` → `PROJECTS` (+ `CATEGORIES` if you want different filters) |
| Project list (no-JS fallback) | `projekte.html` articles — keep in sync with `PROJECTS` |
| Project detail pages | duplicate a `projekt/example-*.html` page and follow its TEMPLATE NOTE |
| Tab completion & `ls projects` | `js/terminal.js` → `KNOWN` + slug list; `js/projekte.js` → `KNOWN` |
| Screenshots / diagrams | `assets/img/` (see its README), referenced from detail pages |
| Theme / colors | `css/tokens.css` (central design tokens — see `styleguide.md`) |

Four sample projects (`example-tools`, `example-security`, `example-systems`,
`example-bots`) make the site fully navigable out of the box. Delete them as
you add real ones — remove their entries in `js/projekte.js`, articles in
`projekte.html`, and pages in `projekt/`.

## Commands (home page)

| Command | Description |
|---|---|
| `help` | list the available commands |
| `about` | a short intro |
| `ls` / `ls projects` | list the current directory / project slugs |
| `cd projects` | go to the project list |
| `cd contact` | go to the contact page |
| `open <name>` | open a project's detail page |
| `cd ..` | go up one level |
| `cd ~` / `cd home` | return to the home screen |
| `subscribe` | inline newsletter signup |
| `clear` | clear the terminal |
| `neofetch` | reprint the banner |

On the projects page additionally: `cd <project>` and
`filter <category>`. Arrow keys (↑ / ↓) cycle through command history; Tab
completes commands and project names everywhere.

## Structure

```
portfolio/
├── index.html        # home (terminal)
├── projekte.html     # project list  (ls)
├── kontakt.html      # contact page  (form)
├── projekt/          # one detail page per project (samples: example-*)
├── css/              # tokens.css, base.css, terminal.css
├── js/               # terminal.js (command engine), projekte.js (project list)
├── assets/img/       # screenshots + diagrams (empty in the template)
├── styleguide.md     # design token documentation
├── wireframes.svg    # layout sketches
└── README.md
```

## Notes

- **Real, semantic pages.** Every terminal command routes to an actual HTML
  page, so the site works without JavaScript and stays accessible to screen
  readers.
- **Forms are inert by design.** The form actions point to `REPLACE_ME`
  placeholders — the site collects nothing until you insert your own
  Formspree (or similar) endpoint.
- Add a LICENSE that fits how you want others to use the template before
  publishing it.
