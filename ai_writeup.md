# KI-Einsatz und Werkzeugauswahl - M293 Portfolio

*Name: Joel Bonini  ·  Klasse: AP25d*

## 1. Ausgangslage

Für dieses Modul habe ich ein persönliches Portfolio als Website umgesetzt - eine
terminalartige Oberfläche, über die man die Projekte per Befehlen (`cd`, `ls`,
`open`, …) erkundet. Die ganze Seite besteht aus eigenem HTML und CSS, ohne
Frameworks.

Die Modulvorgabe verlangt den Einsatz von künstlicher Intelligenz sowie den
Vergleich von mindestens zwei verschiedenen KI-Werkzeugen anhand selbst definierter
Kriterien. Da die Aufgaben klar abgegrenzt waren und beide Werkzeuge im selben
Repository arbeiten konnten, liess sich dieser Vergleich gut und fair durchführen.

## 2. Verglichene Werkzeuge

Verglichen wurden zwei vollständige Setups. Wichtig dabei: Ein solches Setup besteht
aus zwei Schichten - dem **Agenten** (der „Harness", die das Modell steuert, Dateien
liest und schreibt und Befehle ausführt) und dem **Sprachmodell** selbst. Verglichen
werden also nicht zwei Modelle, sondern zwei Kombinationen aus Agent und Modell.

- **Setup A: Claude Code + Claude Sonnet** (Reasoning-Stufe „high")
- **Setup B: Kilo Code + GLM 5.2** (Flagship-Modell)

Beide Agenten haben über mehrere Schritte hinweg am selben Git-Repository gearbeitet -
ohne Konflikte, doppelte Strukturen oder sonstige Probleme.

## 3. Vorgehen und Methodik

Damit der Vergleich aussagekräftig ist, sind drei Punkte zum Vorgehen wichtig:

- **Gleiche Prompts für beide Agenten.** Die detaillierten Arbeitsaufträge (Prompts)
  habe ich vorab mit Claude (claude.ai, Modell Opus) im Chat erarbeitet - ein dritter,
  vorgelagerter KI-Einsatz, der reine Planung und Prompt-Formulierung übernahm und
  selbst keinen Code ins Repository schrieb. Beide Agenten erhielten dadurch gleich
  präzise Anweisungen. Das ist bewusst so gemacht: Es hält die Fehlerquote bei beiden
  tief und macht die Ergebnisse direkt vergleichbar, weil sich die Prompt-Qualität als
  Variable nicht unterscheidet.
- **Modellstufen.** In Claude Code habe ich bewusst Sonnet (statt des stärkeren Opus)
  eingesetzt, in Setup B mit GLM 5.2 das Flagship-Modell. Da die Aufgaben nicht extrem
  komplex waren (statische Seiten, klar abgegrenzte Schritte), war zwischen Sonnet und
  einem stärkeren Modell qualitativ kein Unterschied spürbar - ein höher gestuftes
  Modell wäre für dieses Projekt nicht nötig gewesen.
- **Gleiches Projekt, gleicher Umfang.** Beide Agenten haben reale, aufeinander
  aufbauende Schritte dieses Portfolios umgesetzt.

## 4. Bewertungskriterien

Im täglichen Arbeiten waren vor allem die nutzbare Arbeitsmenge pro Tag und die
Effizienz entscheidend. Deshalb liegt der Schwerpunkt der Gewichtung bewusst auf der
Nutzung.

- **Nutzungslimits & Effizienz (35 %)** - Wie viel produktive Arbeit ist möglich,
  bevor ein Limit greift? Wie effizient geht das Setup mit Tokens um?
- **Codequalität (20 %)** - Korrektheit, Sauberkeit und Brauchbarkeit des erzeugten
  Codes.
- **Instruktionstreue / Fehlerrate (15 %)** - Hält sich der Agent an die Vorgaben,
  wie viel muss nachkorrigiert werden?
- **Transparenz / UX (10 %)** - Nachvollziehbarkeit der Nutzung und Bedienkomfort
  während der Arbeit.
- **Geschwindigkeit (8 %)** - Gesamtzeit aus Reasoning und Ausführung.
- **Kosten (7 %)** - Monatliche Kosten des Setups.
- **Multi-File-/Repo-Handling (5 %)** - Zuverlässigkeit bei mehreren Dateien im
  selben Repository.

## 5. Entscheidungsmatrix

Bewertung je Kriterium von 1 (schlecht) bis 5 (sehr gut). In Klammern der gewichtete
Wert (Bewertung × Gewichtung).

| Kriterium | Gewichtung | Setup A - Claude Code + Sonnet | Setup B - Kilo Code + GLM 5.2 |
|---|---|---|---|
| Nutzungslimits & Effizienz | 35 % | 2 (0.70) | 5 (1.75) |
| Codequalität | 20 % | 4 (0.80) | 4 (0.80) |
| Instruktionstreue / Fehlerrate | 15 % | 4 (0.60) | 4 (0.60) |
| Transparenz / UX | 10 % | 3 (0.30) | 5 (0.50) |
| Geschwindigkeit | 8 % | 4 (0.32) | 4 (0.32) |
| Kosten | 7 % | 4 (0.28) | 4 (0.28) |
| Multi-File-/Repo-Handling | 5 % | 5 (0.25) | 5 (0.25) |
| **Gewichtetes Total** | **100 %** | **3.25** | **4.50** |

## 6. Beobachtungen

**Reasoning und Ausführung.** Claude überlegte (sichtbar) länger, war dafür in der
anschliessenden Ausführung schneller. GLM überlegte kürzer, brauchte danach in der
Ausführung etwas länger. Unter dem Strich war die Gesamtgeschwindigkeit der beiden
Setups vergleichbar.

**Fehlerrate.** Hier gab es keinen nennenswerten Unterschied - beide produzierten nur
sehr wenige Fehler. Das liegt wesentlich an den präzisen, vorab mit Claude (Chat)
erarbeiteten Prompts (siehe Methodik). Bei vageren Anweisungen könnte sich dieses Bild
verschieben.

**Nutzung und Limits.** Das war der grösste Unterschied. Claude Code verbrauchte sehr
schnell Tokens: Bereits nach 3-4 langen, detaillierten Prompts war das Limit erreicht 
und das, obwohl nur Sonnet (high) und nicht Opus genutzt wurde. Mit Kilo Code +
GLM 5.2 habe ich das Limit hingegen nie erreicht. Das Setup arbeitet spürbar
effizienter, was möglicherweise auch mit dem kürzeren Reasoning zusammenhängt.

**Kosten.** Beide Setups kosten rund 20 CHF pro Monat (Claude Pro bzw. ein
Ollama-Cloud-Abo). Bei gleichem Preis liefert Setup B durch die höhere Effizienz aber
mehr nutzbare Arbeit.

**Transparenz.** Kilo Code zeigt die API-Nutzung live an (gesendete und empfangene
Tokens). Das fand ich sehr praktisch, weil man den Verbrauch direkt während des
Arbeitens sieht. Bei Claude Code fehlte mir diese unmittelbare Sichtbarkeit.

## 7. Fazit und Entscheidung

Bei nahezu gleichwertiger Codequalität und Fehlerrate geben die nutzungsbezogenen
Kriterien den Ausschlag. **Setup B (Kilo Code + GLM 5.2)** erreicht mit einem
gewichteten Gesamtwert von 4.50 (gegenüber 3.25) das deutlich bessere Ergebnis und ist
für dieses Projekt das geeignetere Werkzeug: Es stösst im täglichen Arbeiten nicht an
Limits, ist bei gleichem Preis effizienter und macht den Verbrauch transparent.

**Einschränkung.** Der Vergleich beruht auf einem konkreten, eher überschaubaren
Projekt (statische Seiten, klar abgegrenzte Schritte). Bei deutlich komplexeren
Aufgaben könnte das ausgeprägtere „Nachdenken" von Claude - oder ein stärkeres Modell
wie Opus - stärker ins Gewicht fallen und das Ergebnis verschieben. Für den Umfang
dieses Portfolios war dieser Vorteil jedoch nicht spürbar, weshalb die Effizienz von
Setup B überwiegt.
