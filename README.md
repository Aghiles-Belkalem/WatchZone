# WatchZone

WatchZone est une application qui vous permet de découvrir des films populaires, de les rechercher et de consulter les détails de chaque film, y compris la bande-annonce.

## Fonctionnalités

- Affiche une liste de films populaires avec pagination.
- Recherche de films en temps réel grâce à une barre de recherche.
- Affichage des détails du film, y compris le titre, la note et la bande-annonce.

## Installation

### Prérequis

1. **Node.js** et **npm** doivent être installés sur votre machine.

### Étapes pour démarrer le projet :

1. **Clonez le projet** depuis GitHub :
   ```bash
   git clone https://github.com/votre-utilisateur/watchzone.git
Allez dans le répertoire du projet :

bash
Copier
cd watchzone
Installez les dépendances :

bash
Copier
npm install
Démarrez l'application :

bash
Copier
npm start
Vous pouvez maintenant voir l'application dans votre navigateur à l'adresse suivante : http://localhost:3000

API utilisée
L'application utilise l'API TMDB (The Movie Database) pour obtenir les informations des films. Voici comment l'utiliser :

Créez un compte sur TMDB : https://www.themoviedb.org/.
Récupérez une clé API gratuite dans vos paramètres TMDB.
Remplacez la clé API dans le code du fichier services/home/homePage.ts (dans la fonction fetchMovies) pour récupérer les films correctement.
Installation de Fuse.js (pour la recherche)
Fuse.js est une bibliothèque de recherche floue. Il est utilisé pour rechercher des films pendant que vous tapez dans la barre de recherche.

Pour installer Fuse.js, exécutez cette commande dans le terminal :

bash
Copier
npm install fuse.js
C'est tout ! Fuse.js est maintenant installé et fonctionne dans votre application.

Structure du projet
Voici un aperçu de l'organisation du projet :

bash
Copier
/src
  /components          # Composants React pour l'interface utilisateur
  /Css              # Fichiers CSS pour les styles
  /services            # Services pour la récupération des films
  /types               # Types TypeScript pour la gestion des films
  App.tsx              # Composant principal qui gère la navigation
  index.tsx            # Point d'entrée de l'application
Auteurs
Votre Nom : Développeur principal
Licence
Ce projet est sous licence MIT - voir le fichier LICENSE pour plus de détails.



---

### Explications simplifiées :
1. **Installation de l'application** : La première partie explique étape par étape comment cloner, installer les dépendances et démarrer l'application.
2. **API TMDB** : Indique qu'une clé API est nécessaire pour accéder aux données des films.
3. **Fuse.js** : Une petite explication sur la bibliothèque utilisée pour la recherche et comment l'installer.
4. **Structure du projet** : Montre la structure des fichiers pour que tu saches où se trouvent les différentes parties du code.
5. **Licence & Auteurs** : Informations générales sur le projet et son auteur.

### Ce `README` est volontairement simplifié pour être accessible à un débutant tout en couvrant l'essentiel de l'installation et de la compréhension du projet.






# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
