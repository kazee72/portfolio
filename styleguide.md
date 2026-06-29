# Styleguide — M293 Portfolio

Das gesamte Design-System ist zentral in `css/tokens.css` als CSS-Custom-Properties
definiert. Alle weiteren Stylesheets greifen ausschliesslich über `var(--token)`
darauf zu — Farben, Schriftgrössen, Abstände, Radien und Bewegung sind dadurch an
einer einzigen Stelle steuerbar. Das Farbschema orientiert sich an „Tokyonight" und
ist als dunkles Terminal-Theme ausgelegt.

## Farben

### Basis
| Token | Hex | Verwendung |
|---|---|---|
| `--bg` | `#0e0e14` | Seitenhintergrund (Terminal) |
| `--surface` | `#16161f` | Karten, Panels, erhöhte Flächen |
| `--border` | `#2a2a36` | Rahmen, Trennlinien |
| `--text` | `#c0caf5` | Standardtext |
| `--text-muted` | `#565f89` | Sekundärtext, Hinweise, Captions |

### Akzente
| Token | Hex | Verwendung |
|---|---|---|
| `--prompt` | `#9ece6a` | Prompt-Zeichen und aktiver Cursor (Grün) |
| `--accent` | `#7aa2f7` | Links und Hervorhebungen (Blau) |

### Kategorie-Farben (Projekt-Tags)
| Token | Hex | Kategorie |
|---|---|---|
| `--cat-systems` | `#7aa2f7` | systems (Blau) |
| `--cat-security` | `#f7768e` | security (Rot/Pink) |
| `--cat-tools` | `#9ece6a` | tools (Grün) |
| `--cat-bots` | `#bb9af7` | bots (Violett) |

### Fenster-Punkte
| Token | Hex |
|---|---|
| `--dot-close` | `#ff5f57` |
| `--dot-minimize` | `#febc2e` |
| `--dot-maximize` | `#28c840` |

*Hinweis: Diese drei Tokens sind in `tokens.css` definiert, werden aber im finalen
Terminal-Header nicht mehr verwendet (die „Ampel"-Punkte wurden entfernt, da sie eher
zu einem Editor/IDE-Look gehören).*

## Typografie

Durchgängig wird eine Monospace-Schrift verwendet (Terminal-Charakter):

`--font-mono`: `ui-monospace, "JetBrains Mono", "SF Mono", Menlo, monospace`

### Schriftgrössen-Skala
| Token | rem | px | Verwendung (Beispiel) |
|---|---|---|---|
| `--text-xs` | 0.6875 | 11 | Captions, Tags |
| `--text-sm` | 0.875 | 14 | Sekundärtext |
| `--text-base` | 1 | 16 | Fliesstext / Eingabefelder \* |
| `--text-lg` | 1.125 | 18 | Hervorhebungen |
| `--text-xl` | 1.25 | 20 | kleinere Titel |
| `--text-2xl` | 1.5 | 24 | Abschnittstitel |
| `--text-3xl` | 1.875 | 30 | Banner / Hauptüberschrift |

\* 16 px bei Eingabefeldern verhindert das automatische Zoomen auf Mobilgeräten.

## Abstände

Acht­stufige Skala (rem) für Paddings, Margins und Gaps:
| Token | rem | px |
|---|---|---|
| `--space-1` | 0.25 | 4 |
| `--space-2` | 0.5 | 8 |
| `--space-3` | 0.75 | 12 |
| `--space-4` | 1 | 16 |
| `--space-5` | 1.25 | 20 |
| `--space-6` | 1.5 | 24 |
| `--space-8` | 2 | 32 |
| `--space-10` | 2.5 | 40 |

## Radien
| Token | Wert | Verwendung |
|---|---|---|
| `--radius-sm` | 0.125rem (2 px) | feine Abrundungen |
| `--radius-md` | 0.25rem (4 px) | Buttons, Tags |
| `--radius-lg` | 0.5rem (8 px) | Karten, Panels |
| `--radius-full` | 9999px | Pills, runde Elemente |

## Bewegung / Motion
| Token | Wert | Verwendung |
|---|---|---|
| `--duration` | 150ms | Standard-Übergangsdauer |
| `--ease` | ease | Standard-Easing |
| `--transition` | `var(--duration) var(--ease)` | Sammel-Token für Transitions |
| `--blink-duration` | 1s | Blinkrate des Cursors |

**Barrierefreiheit:** Bei aktivierter Einstellung „Reduzierte Bewegung"
(`prefers-reduced-motion: reduce`) werden `--duration` und `--blink-duration` auf `0`
gesetzt — Übergänge und das Cursor-Blinken werden dadurch deaktiviert.