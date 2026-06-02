# Architecture Technique - MGP

Ce document décrit l'architecture technique complète de la plateforme MGP (Matrice de Gestion de Projet). Il couvre la structure des dossiers, l'architecture frontend et backend, le flux d'authentification, la gestion des rôles, l'API REST, la stratégie de déploiement et les bonnes pratiques de sécurité.

---

## 1. Structure des dossiers

La structure proposée se base sur une application monorepo simple avec une séparation claire entre frontend et backend.

```
MGP/
├── docs/
│   ├── architecture.md
│   ├── cahier-des-charges.md
│   ├── modules.md
│   └── modele-donnees.md
├── data/
│   └── Matrice_Gestion_Projet.xlsx
├── docker/
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── docker-compose.yml
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed.ts
├── backend/
│   ├── src/
│   │   ├── app.module.ts
│   │   ├── main.ts
│   │   ├── modules/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── projects/
│   │   │   ├── roles/
│   │   │   ├── budgets/
│   │   │   ├── markets/
│   │   │   ├── risks/
│   │   │   └── logframes/
│   │   ├── common/
│   │   │   ├── dto/
│   │   │   ├── filters/
│   │   │   ├── guards/
│   │   │   ├── interceptors/
│   │   │   ├── pipes/
│   │   │   └── utils/
│   └── test/
├── frontend/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── api/
│   │   └── (routes...)
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── modules/
│   │   ├── auth/
│   │   ├── dashboard/
│   │   ├── projects/
│   │   ├── budgets/
│   │   ├── markets/
│   │   ├── risks/
│   │   └── logframes/
│   ├── styles/
│   ├── types/
│   ├── utils/
│   └── public/
├── .env.example
├── .gitignore
└── README.md
```

### Principes de séparation
- `backend/` contient le serveur NestJS, Prisma et la logique métier.
- `frontend/` contient Next.js, TypeScript, Tailwind et les hooks de données.
- `prisma/` contient le schéma Prisma, la configuration de migration et les scripts de seed.
- `docker/` contient les définitions de conteneurs pour Docker Compose.

---

## 2. Architecture frontend

### Stack et rôle
- **Next.js 15** : rendu hybride, routes server-side et pages statiques.
- **TypeScript** : typage strict pour la sécurité et la documentation.
- **Tailwind CSS** : système de design utilitaire pour l'interface.
- **React Hook Form** : gestion des formulaires et validation côté client.
- **TanStack Query** : gestion de l'état asynchrone et du cache de données.

### Conception du frontend
- La structure suit l’architecture de routes de Next.js 15 avec le dossier `app/`.
- Les **pages** ou **sections** principales sont : authentification, tableau de bord, projets, logframe, budget, marchés, risques, administration des utilisateurs.
- Les **composants UI** sont découplés des composants métier.
- Les **hooks** métiers encapsulent les appels API et la logique TanStack Query.
- Les **lib/clients** contiennent le client HTTP pour communiquer avec l’API backend.
- Les **types** partagés (DTOs) sont définis côté frontend pour correspondre aux API backend.

### Flux de données
- Les données sont chargées via TanStack Query dans les composants de pages.
- Les mutations sont envoyées avec TanStack Query vers des endpoints API REST sécurisés.
- Les formulaires utilisent React Hook Form pour la capture, la validation et l’envoi de données.
- Le token JWT est stocké en mémoire via React context ou un cookie sécurisé selon le mode de stockage choisi.

### État et navigation
- Le routage est géré par Next.js 15 App Router.
- Le middleware Next.js peut être utilisé pour vérifier la présence d'un token JWT et rediriger vers la page de connexion.
- Le layout global contient la barre de navigation, les menus de projet et la gestion des sessions.

---

## 3. Architecture backend

### Stack et rôle
- **NestJS** : framework backend structuré modulaire.
- **TypeScript** : typage, sécurité et maintenabilité.
- **Prisma ORM** : mapping entre PostgreSQL et le code applicatif.
- **JWT Authentication** : authentification stateless.
- **PostgreSQL 18** : base relationnelle.

### Organisation du backend
- L’application est divisée en modules NestJS par domaine métier :
  - `AuthModule`
  - `UsersModule`
  - `ProjectsModule`
  - `RolesModule`
  - `LogframesModule`
  - `BudgetsModule`
  - `MarketsModule`
  - `RisksModule`
- Chaque module contient : contrôleurs, services, DTOs, entités Prisma, guards, pipes et tests.
- Les **services** encapsulent la logique métier et l’accès aux données via Prisma.
- Les **contrôleurs** exposent des routes REST respectant les conventions CRUD.
- Le **module commun** (`common/`) contient guards, interceptors, filtres d’erreurs et utilitaires.

### Modèle de données
- Prisma gère le schéma et les migrations vers PostgreSQL.
- Les entités sont modélisées en respectant les relations : Organisation, Projet, Utilisateur, Rôle, ProjetUtilisateur, Logframe, Composante, RubriqueBudgétaire, MarchéPublic, Risque.
- Les clés primaires sont des identifiants applicatifs (`Int` ou `UUID`) et les clés étrangères garantissent l’intégrité relationnelle.

### Sécurité applicative
- `AuthGuard` protège les routes nécessitant un accès authentifié.
- `RolesGuard` et `Policies` appliquent les permissions basées sur rôle.
- Les routes sensibles utilisent un niveau d’abstraction pour vérifier la propriété du projet et l’appartenance utilisateur.

---

## 4. Flux d'authentification

### Processus général
1. L’utilisateur soumet ses identifiants (email + mot de passe) via un formulaire React Hook Form.
2. Le frontend envoie la requête d’authentification vers le backend NestJS.
3. Le backend valide les informations et génère un **JWT**.
4. Le token JWT est renvoyé au frontend.
5. Le frontend stocke le JWT dans un cookie sécurisé ou en mémoire selon la politique de sécurité.
6. Les requêtes futures contiennent le JWT dans le header `Authorization: Bearer <token>`.

### Refresh token (optionnel)
- Un refresh token peut être géré via une route sécurisée séparée.
- Le refresh token doit être stocké côté backend ou dans un cookie HTTP-only séparé.

### Expiration et renouvellement
- Le JWT expire après une période définie (par exemple 15-60 minutes).
- Un endpoint de renouvellement permet de récupérer un nouveau JWT à partir d’un refresh token valide.

### Validation côté backend
- `JwtStrategy` vérifie l’intégrité du token.
- Un **payload minimal** contient l’identifiant utilisateur, l’organisation, le rôle principal et l’expiration.
- Les routes protégées extraient l’utilisateur connecté et l’injection dans le contexte de requête.

---

## 5. Gestion des rôles

### Concepts de rôle
- Les rôles sont définis globalement et appliqués au niveau du projet via la relation `ProjetUtilisateur`.
- Un utilisateur peut avoir un rôle différent pour chaque projet.
- Les rôles recommandés pour MGP sont :
  - `Admin`
  - `Financier`
  - `Éditeur`
  - `Lecteur`

### Mécanisme
- Les rôles sont gérés dans `RolesModule`.
- La table de jonction `ProjetUtilisateur` relie un utilisateur, un projet et un rôle.
- Chaque requête vérifie le rôle utilisateur / projet sur les endpoints protégés.

### Guards et policies
- `AuthGuard` : vérifie la présence et la validité du JWT.
- `RolesGuard` : vérifie que l’utilisateur possède un rôle autorisé.
- `ProjectAccessGuard` : vérifie que l’utilisateur est membre du projet ciblé.
- Les permissions sont déclarées dans des metadata NestJS afin d’être réutilisables.

### Cas d’usage
- `Admin` : création de projet, gestion des membres, configuration globale.
- `Financier` : accès aux budgets, marchés et risques financiers.
- `Éditeur` : création/modification des données projet.
- `Lecteur` : accès lecture seule aux données projet.

---

## 6. API REST

### Principes
- API RESTful exposée par NestJS.
- Conventions de routes claires et cohérentes.
- Utilisation de DTOs pour validation et transformation des requêtes.
- Gestion des erreurs via un filtre global et une standardisation des réponses.

### Principales ressources
- `POST /auth/login` : authentification et génération de JWT.
- `POST /auth/refresh` : renouvellement de token (optionnel).
- `GET /users/me` : profil utilisateur connecté.
- `GET /projects` : liste des projets.
- `POST /projects` : création de projet.
- `GET /projects/:projectId` : détail du projet.
- `GET /projects/:projectId/logframes` : logframes du projet.
- `POST /projects/:projectId/logframes` : création de logframe.
- `GET /projects/:projectId/composantes` : composantes du projet.
- `POST /projects/:projectId/composantes` : création de composante.
- `GET /projects/:projectId/budgets` : rubriques budgétaires du projet.
- `POST /projects/:projectId/budgets` : création de rubrique budgétaire.
- `GET /projects/:projectId/markets` : marchés publics du projet.
- `POST /projects/:projectId/markets` : création de marché.
- `GET /projects/:projectId/risks` : risques du projet.
- `POST /projects/:projectId/risks` : création de risque.
- `GET /projects/:projectId/members` : liste des membres projet.
- `POST /projects/:projectId/members` : ajout d’un membre.
- `DELETE /projects/:projectId/members/:memberId` : suppression d’un membre.

### Design des endpoints
- Utiliser des verbes HTTP standard (GET, POST, PUT, PATCH, DELETE).
- Penser à la granularité des routes : ressources de projet imbriquées derrière `/projects/:projectId`.
- Les endpoints d’administration (`users`, `roles`, `organisations`) peuvent être placés à la racine ou sous `/admin` selon la politique.

### Validation et sécurité
- Validation des payloads par `class-validator` et `class-transformer`.
- Sanitation des entrées pour éviter l’injection SQL, XSS et autres vecteurs.
- Limitation de la taille des payloads pour les routes de création et mise à jour.

---

## 7. Stratégie de déploiement

### Conteneurisation
- Chaque application est conteneurisée : backend NestJS et frontend Next.js.
- Utiliser `Dockerfile.backend` et `Dockerfile.frontend` séparés.
- Le conteneur backend inclut Prisma client et exécute les migrations au démarrage.

### Orchestration locale / staging
- `docker-compose.yml` orchestre :
  - `frontend`
  - `backend`
  - `postgres`
  - `pgadmin` ou un outil similaire pour l’administration

### Déploiement production
- Utiliser des services gérés ou des capacités Docker compatibles : Kubernetes, Docker Swarm, ou une plateforme cloud (render, fly.io, AWS ECS, etc.).
- Rendre l’application frontend accessible via un CDN ou un reverse proxy.
- Exposer le backend derrière une couche HTTPS.
- Stocker la base PostgreSQL dans un service managé pour haute disponibilité.

### Pipeline CI/CD
- Tests unitaires et d’intégration pour backend et frontend.
- Linting TypeScript et analyse statique.
- Build du frontend et backend séparément.
- Publication des images Docker vers un registry.
- Déploiement automatisé sur staging/production.

### Variables d’environnement
- Séparer les variables pour développement, staging et production.
- Stocker les secrets dans un service Vault ou le mécanisme sécurisé de la plateforme de déploiement.
- Exemples : `DATABASE_URL`, `JWT_SECRET`, `NEXTAUTH_SECRET`, `NODE_ENV`.

---

## 8. Bonnes pratiques de sécurité

### Authentification et autorisation
- JWT signés avec une clé secrète robuste.
- Expiration courte du token d’accès.
- Gestion optionnelle de refresh token.
- Separation des rôles et des permissions.
- Vérifier l’appartenance au projet pour chaque endpoint projet.

### Protection des données
- Utiliser HTTPS partout.
- Ne pas stocker de secrets dans le code ou dans le dépôt.
- Protéger les cookies avec `HttpOnly` et `Secure` si utilisé.
- Valider et sanitiser toutes les entrées utilisateur.

### Sécurité de la base de données
- Utiliser des comptes PostgreSQL avec permissions minimales.
- Activer le chiffrement des données en transit et au repos si possible.
- Mettre en place des sauvegardes automatisées.

### Sécurité frontend
- Éviter les fuites de JWT dans le stockage local si possible.
- Utiliser des en-têtes de sécurité : `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`.
- Gérer proprement les erreurs utilisateur sans divulguer d’informations sensibles.

### Sécurité backend
- Limiter les taux de requêtes (`rate limiting`) pour les routes sensibles.
- Utiliser des guards et interceptors centralisés pour la validation et les permissions.
- Consigner les actions critiques et les tentatives d’accès refusées.
- Mettre à jour régulièrement les dépendances, en particulier NestJS, Prisma, et les bibliothèques d’authentification.

---

## Conclusion

L’architecture MGP est structurée pour une application SaaS moderne :
- frontend Next.js 15 avec TypeScript, Tailwind CSS, React Hook Form et TanStack Query,
- backend NestJS + Prisma avec JWT,
- base PostgreSQL 18,
- déploiement via Docker et Docker Compose.

Elle garantit une séparation claire des responsabilités, des flux d’authentification robustes, une gestion des rôles projetcentrée, et une stratégie de déploiement compatible avec les environnements cloud et conteneurisés.