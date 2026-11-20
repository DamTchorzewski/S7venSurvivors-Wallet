# Repozytorium: opis i tagi

Rzeczy, które ustawia się na GitHubie ręcznie (nie da się ich zapisać w plikach repozytorium). Przegląd projektu: [README](../README.md).

## Nazwa repozytorium: `personal-finance-manager`

Standard nazw repozytoriów: `reops/standards/repo-names.md`. Repozytorium nazywało się wcześniej `S7venSurvivors-Wallet`; od 2026-11-20 nazywa się `personal-finance-manager` (nazwa mówi, czym jest projekt: fraza szukana na GitHubie; nazwa zespołu jest tylko w README). Jego API to osobne repozytorium `personal-finance-manager-api` (rola na końcu nazwy). GitHub przekierowuje stary adres repozytorium, ale **adres strony (GitHub Pages) zmienił się** na `https://damtchorzewski.github.io/personal-finance-manager/`, a stary przestał działać. Ścieżka bazowa `/personal-finance-manager` jest w `vite.config.js` i w trasach `src/layouts/App.jsx`. Strona jest serwowana z gałęzi `gh-pages` (Settings → Pages), a workflow `static.yml` buduje ją tylko jako artefakt.

## Opis i tagi (About)

GitHub: strona repozytorium → ⚙ obok „About” → pola poniżej. Opis ma limit 350 znaków, tagi (topics) pisze się małymi literami z myślnikami, najwyżej 20.

**Opis (Description):**

```text
Personal finance manager: React and Redux Toolkit app with transaction statistics in Chart.js.
```

**Strona (Website):**

```text
https://damtchorzewski.github.io/personal-finance-manager/
```

**Tagi (Topics):**

```text
react vite redux-toolkit material-ui chartjs personal-finance finance-app expense-tracker responsive-design rest-api github-pages github-actions
```

Z GitHub CLI (`gh`) to samo jedną komendą:

```bash
gh repo edit DamTchorzewski/personal-finance-manager --homepage "https://damtchorzewski.github.io/personal-finance-manager/" --description "Personal finance manager: React and Redux Toolkit app with transaction statistics in Chart.js." --add-topic react --add-topic vite --add-topic redux-toolkit --add-topic material-ui --add-topic chartjs --add-topic personal-finance --add-topic finance-app --add-topic expense-tracker --add-topic responsive-design --add-topic rest-api --add-topic github-pages --add-topic github-actions
```

Dotychczasowe tagi `database`, `loader`, `netlify`, `html-css-javascript`, `nodejs`, `router-dom`, `wallet`, `finanse` opisują stare wdrożenie lub są zbyt ogólne; zdejmij je w polu „Topics”.

## Ustawienia do włączenia

| Gdzie (GitHub)                      | Co ustawić                                                      |
| ----------------------------------- | --------------------------------------------------------------- |
| Settings → Pages                    | źródło: gałąź `gh-pages` (dziś); `static.yml` buduje artefakt   |
| Settings → General → Default branch | `main` (już jest)                                               |
