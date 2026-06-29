# portfolio

A terminal-style personal portfolio — you navigate the site by typing commands
(`cd`, `ls`, `open`, …) just like a real shell. Built from scratch with vanilla
HTML, CSS, and JavaScript: no frameworks, no dependencies, no build step.

**Live:** https://kazee72.github.io/portfolio/

## Features

- Terminal interface with a small command engine (command history, Tab-completion)
- Command-driven navigation backed by real, semantic pages (works without JS too)
- Tappable command chips as a fallback for mobile and accessibility
- Project grid filterable by category (systems · security · tools · bots)
- Fully responsive (mobile / tablet / desktop), keyboard-accessible
- Centralized design tokens (a Tokyonight-inspired terminal theme)

## Commands

| Command | Description |
|---|---|
| `help` | list the available commands |
| `about` | a short intro |
| `ls` | list the current directory |
| `cd projects` | go to the project list |
| `cd contact` | go to the contact page |
| `open <name>` | open a project's detail page |
| `cd ..` | go up one level |
| `cd ~` / `cd home` | return to the home screen |
| `clear` | clear the terminal |

Arrow keys (↑ / ↓) cycle through command history; Tab completes commands and project
names.

## Tech

Vanilla HTML5, CSS3 (CSS Grid, custom properties), and JavaScript. Hosted on
GitHub Pages.

## Structure

```
portfolio/
├── index.html        # home (terminal)
├── projekte.html     # project list  (ls)
├── kontakt.html      # contact page  (form)
├── projekt/          # one detail page per project
├── css/              # tokens.css, base.css, terminal.css
├── js/               # terminal.js (command engine)
├── assets/img/       # screenshots + diagrams
├── docs/             # wireframes, styleguide, KI-Einsatz
└── README.md
```

## Local development

The site is fully static. Because all paths are relative, the cleanest way to run it
locally is to serve the folder:

```
python3 -m http.server
# then open http://localhost:8000
```

(Opening `index.html` directly works too, but a local server best matches how it
behaves on GitHub Pages.)

## About

Built as a project for module M293. AI coding assistants were used during
development; the tool comparison and decision are documented in
[`docs/ki-einsatz.md`](docs/ki-einsatz.md).