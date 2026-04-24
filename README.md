# Économie de la Défense — Formation Professionnelle

[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Déployé-success)](https://maryleneh.github.io/Eco_entreprises/)
[![Quarto](https://img.shields.io/badge/Quarto-Website-blue)](https://quarto.org)
[![Licence](https://img.shields.io/badge/Licence-MIT-green)](LICENSE)

Un site web Quarto moderne et professionnel pour une formation de 12 semaines en économie de la défense, statistiques d'entreprises et sources officielles.

## 🎯 À propos

Ce site est une plateforme d'apprentissage professionnel couvrant :

- **Microéconomie et macroéconomie** appliquées à la défense
- **Statistiques d'entreprises** du secteur défense (NAF/NACE, BITD)
- **Sources officielles** : INSEE, Eurostat, SSM Défense, OTAN, data.gouv.fr
- **Dépenses publiques de défense** et comparaisons internationales
- **Industrie de défense** : souveraineté, autonomie stratégique, marchés publics
- **Auteurs et lectures clés** : Sandler, Hartley, Smith, Fontanel, Tirole, Mazzucato...

## 📁 Structure du projet

```
Eco_entreprises/
├── _quarto.yml                          # Configuration Quarto
├── index.qmd                            # Page d'accueil (hero section)
├── styles.scss                          # Styles SCSS personnalisés
├── scripts.js                           # JavaScript (animations, interactions)
├── chapters/
│   ├── learning-path.qmd               # Parcours de 12 semaines
│   ├── microeconomics.qmd              # Microéconomie de la défense
│   ├── macroeconomics.qmd              # Macroéconomie de la défense
│   ├── business-statistics-defence.qmd # Statistiques d'entreprises
│   ├── institutions-data-sources.qmd   # INSEE, Eurostat, SSM, OTAN...
│   ├── nato-defence-expenditure.qmd    # OTAN et dépenses de défense
│   ├── defence-industry.qmd            # Industrie et armement
│   ├── authors-and-readings.qmd        # Auteurs et lectures clés
│   ├── exercises.qmd                   # Exercices par module
│   ├── final-project.qmd               # Projet final
│   └── resources.qmd                   # Ressources et glossaire
└── .github/workflows/publish.yml       # CI/CD GitHub Pages
```

## 🚀 Déploiement sur GitHub Pages

### Prérequis

1. [Installer Quarto](https://quarto.org/docs/get-started/)
2. Un compte GitHub avec ce dépôt

### Activer GitHub Pages

1. Allez dans **Settings** de votre dépôt GitHub
2. Naviguez vers **Pages** (dans la barre latérale gauche)
3. Sous **Source**, sélectionnez **GitHub Actions**
4. Sauvegardez

Lors du prochain push sur la branche `main`, le workflow GitHub Actions :
- Installe Quarto
- Rend le site (`quarto render`)
- Publie le site dans `_site/` sur GitHub Pages

### Build en local

```bash
# Cloner le dépôt
git clone https://github.com/MaryleneH/Eco_entreprises.git
cd Eco_entreprises

# Rendre le site
quarto render

# Prévisualiser en local
quarto preview
```

## 🎨 Stack technique

- **[Quarto](https://quarto.org)** — Système de publication scientifique
- **SCSS personnalisé** — Identité visuelle premium (navbar sticky, hero section, cards animées)
- **JavaScript vanille** — Animations scroll reveal, compteurs, barre de progression
- **Bootstrap 5** — Grille responsive (via Quarto)
- **Google Fonts** — Inter (texte) + JetBrains Mono (code)
- **GitHub Actions** — CI/CD automatisé vers GitHub Pages

## 📚 Contenu pédagogique

Le site couvre une formation de **12 semaines** organisée en 3 mois :

| Mois | Thèmes |
|------|--------|
| Mois 1 | Microéconomie et macroéconomie de la défense |
| Mois 2 | Statistiques d'entreprises, institutions, OTAN |
| Mois 3 | Industrie de défense, projet final |

## 🔗 Sources officielles couvertes

- [INSEE](https://www.insee.fr) — Statistiques nationales françaises
- [Eurostat](https://ec.europa.eu/eurostat) — Statistiques européennes (COFOG)
- [OTAN/NATO](https://www.nato.int/cps/en/natohq/topics_49198.htm) — Dépenses de défense
- [SSM Défense](https://www.defense.gouv.fr) — Statistiques ministère des Armées
- [SIPRI](https://www.sipri.org) — Institut de recherche sur la paix de Stockholm
- [data.gouv.fr](https://www.data.gouv.fr) — Données ouvertes françaises

## 📄 Licence

MIT — Libre d'utilisation à des fins pédagogiques.