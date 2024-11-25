# Bibliothèque TeaPote - API Back-End

![NestJS Logo](https://nestjs.com/img/logo-small.svg)

[![CircleCI](https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456)](https://circleci.com/gh/nestjs/nest)
[![NPM Version](https://img.shields.io/npm/v/@nestjs/core.svg)](https://www.npmjs.com/~nestjscore)
[![NPM License](https://img.shields.io/npm/l/@nestjs/core.svg)](LICENSE)
[![Discord](https://img.shields.io/badge/discord-online-brightgreen.svg)](https://discord.gg/G7Qnnhy)

## Description

Bienvenue dans l'API Back-End de la bibliothèque de thé! Cette API permet aux utilisateurs de se connecter, de créer des thés qui s'ajoutent à une liste, et d'interagir avec la bibliothèque de diverses manières. Elle est construite avec [NestJS](https://nestjs.com), un framework Node.js puissant et évolutif, utilisant TypeScript pour une meilleure expérience de développement.

## Fonctionnalités

- Authentification et gestion des utilisateurs.
- Création, mise à jour et suppression de thés dans la bibliothèque.
- Gestion des amis et des interactions sociales.
- Prise en charge des tests unitaires et de bout en bout.
- Support pour le développement, le mode veille et le mode production.

## Installation

Suivez ces étapes pour installer le projet et ses dépendances :

1. Clonez ce dépôt GitHub :
   \`\`\`bash
   git clone https://github.com/LucasGascn/teaPoteBack.git
   cd teaPoteBack
   \`\`\`

2. Installez les dépendances :
   \`\`\`bash
   npm i
   \`\`\`

## Commandes Utiles

Voici quelques commandes utiles pour travailler avec l'API :

- **Démarrer l'application** :
  - Développement : `npm run start`
  - Mode veille : `npm run start:dev`
  - Production : `npm run start:prod`

- **Tester l'application** :
  - Tests unitaires : `npm run test`
  - Tests de bout en bout : `npm run test:e2e`
  - Couverture des tests : `npm run test:cov`

- **Prisma** :
  - Générer les migrations : `npx prisma migrate dev`
  - Appliquer les migrations : `npx prisma migrate deploy`
  - Ouvrir le studio Prisma : `npx prisma studio`

- **Autres Commandes NestJS** :
  - Générer un module : `nest g module <nom>`
  - Générer un contrôleur : `nest g controller <nom>`
  - Générer un service : `nest g service <nom>`

## Contribuer

Si vous souhaitez contribuer au projet, nous serions ravis de recevoir vos suggestions et contributions. Veuillez consulter les règles de contribution pour plus d'informations.

## Support

Pour des questions ou des problèmes, vous pouvez rejoindre notre serveur Discord ou contacter le développeur principal.

## License

Ce projet est sous licence [MIT](LICENSE).
