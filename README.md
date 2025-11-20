# Phare Obscur Sudoku - Solutions

Ce site permet de consulter les solutions des grilles de Sudoku du premier livre Phare Obscur.

## Fonctionnalités

- Sélection de la difficulté (Facile, Moyen, Difficile, Légendaire).
- Saisie du numéro de la grille (001).
- Affichage de la grille de solution correspondante.
- Téléchargement de toutes les solutions au format PDF.

## Installation et Lancement

Ce projet est un site statique généré avec [Eleventy](https://www.11ty.dev/).

### Prérequis

- [Node.js](https://nodejs.org/fr) installé sur votre machine.

### Installation

```bash
npm install
```

### Lancement en local

Pour lancer le serveur de développement :

```bash
npm run serve
```

ou

```bash
npx @11ty/eleventy --serve
```

Le site sera accessible à l'adresse `http://localhost:8080`.

## Technologies

- HTML5 / CSS3
- JavaScript (Vanilla)
- Eleventy (Générateur de site statique)

## Génération des données

Le fichier `solutions.json` est généré à partir du fichier CSV source. Pour le régénérer :

```bash
npm run build:data
```

---

© Phare Obscur 2025 - Tous droits réservés.
