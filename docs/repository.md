# Repozytorium: opis i tagi

Rzeczy, które ustawia się na GitHubie ręcznie (nie da się ich zapisać w plikach repozytorium). Przegląd projektu: [README](../README.md).

## Opis i tagi (About)

GitHub: strona repozytorium → ⚙ obok „About” → pola poniżej. Opis ma limit 350 znaków, tagi (topics) pisze się małymi literami z myślnikami, najwyżej 20.

**Opis (Description):**

```text
Wallet Manager: a personal finance app for tracking transactions, balance and expenses by category, with a doughnut chart, currency rates and a mobile layout. React 18, Vite, Redux Toolkit, MUI and Chart.js; a team project of the S7ven Survivors, talking to the Express and MongoDB wallet API.
```

**Strona (Website):**

```text
https://damtchorzewski.github.io/S7venSurvivors-Wallet/
```

**Tagi (Topics):**

```text
react vite redux-toolkit material-ui chartjs personal-finance finance-app expense-tracker responsive-design rest-api github-pages github-actions team-project
```

Z GitHub CLI (`gh`) to samo jedną komendą:

```bash
gh repo edit DamTchorzewski/S7venSurvivors-Wallet --homepage "https://damtchorzewski.github.io/S7venSurvivors-Wallet/" --description "Wallet Manager: a personal finance app for tracking transactions, balance and expenses by category, with a doughnut chart, currency rates and a mobile layout. React 18, Vite, Redux Toolkit, MUI and Chart.js; a team project of the S7ven Survivors, talking to the Express and MongoDB wallet API." --add-topic react --add-topic vite --add-topic redux-toolkit --add-topic material-ui --add-topic chartjs --add-topic personal-finance --add-topic finance-app --add-topic expense-tracker --add-topic responsive-design --add-topic rest-api --add-topic github-pages --add-topic github-actions --add-topic team-project
```

Dotychczasowe tagi `database`, `loader`, `netlify`, `html-css-javascript`, `nodejs`, `router-dom`, `wallet`, `finanse` opisują stare wdrożenie lub są zbyt ogólne; zdejmij je w polu „Topics”.

## Ustawienia do włączenia

| Gdzie (GitHub)               | Co ustawić                                                          |
| ---------------------------- | ------------------------------------------------------------------- |
| Settings → Pages             | Source: **GitHub Actions** (publikuje `static.yml`)                 |
| Settings → General → Default branch | `main` (już jest)                                            |
