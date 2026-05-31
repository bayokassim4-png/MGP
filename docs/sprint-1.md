# Sprint 1 - MVP Technique MGP

## Objectif unique du Sprint 1

**Un utilisateur peut : créer un compte → se connecter → créer une organisation → créer un projet → voir ses projets**

Ce sprint se limite au strict MVP pour valider le flux utilisateur fondamental.

**Durée estimée** : 1 semaine (5 jours)  
**Phase roadmap** : Phases 1 et 2 (authentification et gestion basique de projets)

---

## Architecture et structure

### Backend (NestJS 15 + TypeScript + Prisma + PostgreSQL 18)

Structure minimale pour le MVP :

```
backend/
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── modules/
│   │   ├── auth/
│   │   │   ├── auth.controller.ts
│   │   │   ├── auth.service.ts
│   │   │   ├── auth.module.ts
│   │   │   ├── dto/
│   │   │   │   ├── login.dto.ts
│   │   │   │   └── register.dto.ts
│   │   │   ├── strategies/
│   │   │   │   └── jwt.strategy.ts
│   │   │   └── guards/
│   │   │       └── jwt-auth.guard.ts
│   │   ├── users/
│   │   │   ├── users.controller.ts
│   │   │   ├── users.service.ts
│   │   │   └── users.module.ts
│   │   ├── organisations/
│   │   │   ├── organisations.controller.ts
│   │   │   ├── organisations.service.ts
│   │   │   └── organisations.module.ts
│   │   └── projects/
│   │       ├── projects.controller.ts
│   │       ├── projects.service.ts
│   │       └── projects.module.ts
│   └── common/
│       ├── guards/
│       │   └── jwt-auth.guard.ts
│       └── utils/
│           └── password-utils.ts
├── package.json
├── tsconfig.json
└── nest-cli.json
```

### Frontend (Next.js 15 + TypeScript + Tailwind CSS + React Hook Form + TanStack Query)

```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   ├── register/
│   │   │   └── page.tsx
│   │   └── reset-password/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── projects/
│   │   │   ├── page.tsx
│   │   │   ├── [projectId]/
│   │   │   │   ├── layout.tsx
│   │   │   │   └── page.tsx
│   │   │   └── create/
│   │   │       └── page.tsx
│   │   ├── profile/
Structure minimale pour le MVP :

```
frontend/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── organisations/
│   │   │   ├── page.tsx
│   │   │   └── create/
│   │   │       └── page.tsx
│   │   └── projects/
│   │       ├── page.tsx
│   │       └── create/
│   │           └── page.tsx
│   └── middleware.ts
├── components/
│   ├── auth/
│   │   ├── LoginForm.tsx
│   │   ├── RegisterForm.tsx
│   │   └── LogoutButton.tsx
│   ├── layout/
│   │   ├── Header.tsx
│   │   └── Navigation.tsx
│   └── common/
│       ├── Button.tsx
│       ├── Input.tsx
│       └── Card.tsx
├── hooks/
│   ├── useAuth.ts
│   ├── useOrganisation.ts
│   └── useProject.ts
├── lib/
│   ├── api-client.ts
│   ├── auth-context.tsx
│   └── query-client.ts
├── types/
│   └── index.ts
├── styles/
│   └── globals.csontend
└── docker-compose.yml
```

---

## Tâches backend

### BE-1 : Configuration NestJS et structure d'application
- Initialiser le projet NestJS 15.
- Configurer TypeScript et les options de build.
- Mettre en place les fichiers de configuration (`.env.example`, `app.module.ts`, `main.ts`).
- Ajouter les dépendances principales : Prisma, JWT, bcrypt, validation.
- Priorité : Critique
- Estimation : M

### BE-2 : Configuration Prisma et schéma de base
- Initialiser Prisma dans le projet.
- Créer le schéma `schema.prisma` avec les entités : `Organisation`, `User`, `Role`, `Project`, `ProjectUser`.
- Configurer la connexion PostgreSQL.
- Mettre en place les migrations.
- Priorité : Critique
- Estimation : M

### BE-3 : Module d'authentification
- Implémenter le contrôleur d'authentification (`POST /auth/login`, `POST /auth/register`, `POST /auth/refresh`).
- Créer le service d'authentification (JWT, hachage des mots de passe avec bcrypt).
- Implémenter la stratégie JWT et le guard d'authentification.
- Tests unitaires d'authentification.
- Priorité : Critique
- Estimation : L

### BE-4 : Module utilisateurs
- Implémenter `GET /users/me`, `GET /users/:userId`, `PATCH /users/:userId`.
- Service de gestion utilisateurs.
- DTOs de validation.
- Tests unitaires.
- Priorité : Haute
- Estimation : M
Prisma
- Initialiser NestJS 15 avec TypeScript.
- Initialiser Prisma et configurer PostgreSQL.
- Créer le schéma `schema.prisma` avec entités minimales : `User`, `Organisation`, `Project`, `ProjectUser`.
- Mettre en place les migrations.
- Ajouter les dépendances : JWT, bcrypt, validation.
- Priorité : Critique
- Estimation : M

### BE-2 : Module d'authentification
- Implémenter `POST /auth/login` et `POST /auth/register`.
- Service d'authentification avec JWT et bcrypt.
- Stratégie JWT et guard `JwtAuthGuard`.
- DTOs de validation.
- Priorité : Critique
- Estimation : M

### BE-3 : Module organisations
- Implémenter `POST /organisations` et `GET /organisations`.
- Service de gestion des organisations.
- DTOs de validation.
- Priorité : Haute
- Estimation : S

### BE-4 : Module projets
- Implémenter `POST /projects`, `GET /projects`, `GET /projects/:projectId`.
- Service de gestion des projets.
- DTOs de validation.
- Priorité : Haute
- Estimation : S

### BE-5 : Module utilisateurs (basique)
- Implémenter `GET /users/me` pour récupérer l'utilisateur connecté.
- Service utilisateur minimal.
- DTOs.
- Priorité : Haute
- Estimation : S d'inscription (optionnel)
- Page `/register` avec formulaire.
- Validation côté client (email, mot de passe, confirmation).
- Appels API vers `POST /auth/register`.
- Redirection vers la page de connexion après succès.
- Priorité : Haute
- Estimation : M

### FE-5 : Écran de réinitialisation du mot de passe
- Page `/reset-password` avec formulaire.
- Appels API vers `POST /auth/password-reset`.
- Priorité : Moyenne
- Estimation : S

### FE-6 : Layout global et navigation
- Header avec logo, menu principal et profil utilisateur.
- Sidebar navigation (connexion, projets, profil, admin).
- Footer optionnel.
- Responsive design avec Tailwind.
- Priorité : Haute
- Estimation : L

### FE-7 : Tableau de bord global
- Page `/dashboard` affichant un résumé.
- Liens vers projets, utilisateurs (admin), rôles (admin).
- Kpis ou statistiques de base.
- Priorité : Haute
- Estimation : M

### FE-8 : Liste des projets
- Page `/projects` avec liste tabulaire ou en cartes.
- TanStack Query pour le chargement des données.
- Bouton de création de projet.
- Filtres de base.
- Priorité : Haute
- Estimation : M

### FE-9 : Création de projet
- Page `/projects/create` avec formulaire.
- React Hook Form + validation.
- Initialiser Next.js 15 avec TypeScript.
- Configurer Tailwind CSS, React Hook Form, TanStack Query.
- Structure de base (`app/`, `components/`, `lib/`, `hooks/`, etc.).
- Fichier `.env.example`.
- Priorité : Critique
- Estimation : M

### FE-2 : Authentification côté client
- Créer `AuthContext` pour gérer la session.
- Hook `useAuth` pour l'authentification.
- Client HTTP (`api-client.ts`) avec intercepteur JWT.
- Stockage du JWT en mémoire ou cookie sécurisé.
- Priorité : Critique
- Estimation : M

### FE-3 : Page de connexion
- Page `/login` avec formulaire React Hook Form.
- Validation côté client.
- Appel API `POST /auth/login`.
- Redirection vers tableau de bord après succès.
- Priorité : Critique
- Estimation : S

### FE-4 : Page d'inscription
- Page `/register` avec formulaire.
- Validation (email, mot de passe, confirmation).
- Appel API `POST /auth/register`.
- Redirection vers `/login` après succès.
- Priorité : Critique
- Estimation : S

### FE-5 : Middleware et protection des routes
- Middleware Next.js pour vérifier le JWT.
- Redirection vers `/login` si non authentifié.
- Priorité : Critique
- Estimation : S

### FE-6 : Layout et navigation minimale
- Header avec logo et bouton de déconnexion.
- Navigation simple vers projets et organisations.
- Priorité : Haute
- Estimation : S

### FE-7 : Tableau de bord
- Page `/dashboard` avec liens vers organisations et projets.
- Affichage minimal du contexte utilisateur.
- Priorité : Haute
- Estimation : S

### FE-8 : Gestion des organisations
- Page `/organisations` : liste et création d'organisation.
- Formulaire de création avec validation.
- Appels API `POST /organisations` et `GET /organisations`.
- Priorité : Haute
- Estimation : S

### FE-9 : Liste et création de projets
- Page `/projects` : liste et création.
- Formulaire de création avec sélection d'organisation.
- Appels API `POST /projects` et `GET /projects`.
- Priorité : Haute
- Estimation : S

### FE-10 : Composants UI minimaux
- Button, Input, Card.
- Utilisation de Tailwind CSS.
- Priorité : Haute
- Estimation : Soyé dans les headers de requêtes subsequentes.
   - Logout supprime la session côté frontend.
   - Accès aux endpoints protégés sans JWT renvoie 401.

2. **Gestion des rôles** :
   - Les rôles sont créés et assignés à des utilisateurs.
   - Les guards de rôles empêchent l'accès non autorisé.
   - Les endpoints reflètent les permissions appropriées.

3. **Gestion des projets** :
   - Un projet est créé avec une organisation.
   - Les utilisateurs peuvent être ajoutés à un projet.
   - Les utilisateurs non membres n'accèdent pas au projet.

4. **Frontend et navigation** :
   - L'authentification redirige correctement.
   - Le layout global s'affiche correctement.
   - Tous les liens de navigation fonctionnent.
   - Les données chargées via TanStack Query s'affichent correctement.

5. **Infrastructure** :
   - `docker-compose up` démarre tous les services sans erreur.
   - PostgreSQL est accessible et les migrations s'appliquent.
   - Le backend démarre sur le port 3001.
   - Le frontend démarre sur le port 3000.

6. **Tests** :
   - Tests unitaires d'authentification réussissent.
   - Tests unitaires des rôles et permissions réussissent.
   - Couverture de tests au minimum 60%.

### Critères d'acceptation métier

1. **Utilisateurs** :
   - Nouveaux utilisateurs peuvent se créer un compte.
   - Les utilisateurs existants peuvent se connecter.
   - Le profil utilisateur affiche les bonnes informations.

2. **Projets** :
   - Les administrateurs peuvent créer un projet.
   - Les projets s'affichent dans la liste.
   - Les utilisateurs affectés accèdent au projet.

3. **Navigation** :
   - L'interface est intuitive et stable.
   - Les erreurs s'affichent de façon claire.
   - Les temps de chargemeDocker
- Dockerfile backend (NestJS multi-stage).
- Dockerfile frontend (Next.js multi-stage).
- `docker-compose.yml` avec services : backend, frontend, postgres.
- Variables d'environnement pour dev.
- Exécution de Prisma `migrate deploy` au démarrage du backend.
- Priorité : Critique
- Estimation : M

### INF-2 : Configuration d'environnement
- `.env.example` avec variables clés.
- `.env.local` pour le développement local.
- Priorité : Critique
- Estimation : S

### INF-3 : Seed et initialisation
- Script seed pour initialiser la base (rôles, organisations par défaut).
- Priorité : Haute
- Estimation : SMVP

1. **Inscription et connexion** :
   - Un nouvel utilisateur peut créer un compte via `/register`.
   - Un utilisateur peut se connecter via `/login`.
   - JWT est généré et stocké après connexion.
   - Accès aux endpoints protégés sans JWT renvoie 401.

2. **Organisations** :
   - Un utilisateur connecté peut créer une organisation.
   - Un utilisateur peut voir la liste de ses organisations.
   - L'organisation est attribuée correctement lors de la création.

3. **Projets** :
   - Un utilisateur connecté peut créer un projet dans une organisation.
   - Un utilisateur peut voir la liste de ses projets.
   - Un projet affiche les bonnes informations.

4. **Frontend** :
   - Navigation entre pages de connexion, inscription, tableau de bord, organisations, projets fonctionne.
   - Les formulaires sont validés côté client.
   - Les erreurs s'affichent clairement.
   - Les redirection post-action sont correctes.

5. **Infrastructure** :
   - `docker-compose up` démarre sans erreur.
   - PostgreSQL est accessible et les migrations s'appliquent.
   - Backend démarre sur port 3001.
   - Frontend démarre sur port 3000.
   - Tous les endpoints du MVP répondent correctementJour 1-2** : Infrastructure Docker, configuration NestJS et Prisma.
2. **Jour 3** : Authentification backend et frontend.
3. **Jour 4-5** : Organisations et projets, intégration et tests.
4. **Fin du sprint** : Démo MVP, ajustements, préparation Sprint 2.

---

## Fonctionnalités reportées vers Sprint 2+

Les fonctionnalités suivantes ne sont **pas** incluses dans le MVP et sont reportées :

- **Administration** : gestion des utilisateurs, gestion des rôles, permissions avancées.
- **Modules métier** : Logframe, PTBA, Budget, Marchés publics, Risques.
- **Profil utilisateur** : édition complète du profil.
- **Réinitialisation du mot de passe** : fonctionnalité de réinitialisation.
- **Reporting et dashboard** : tableaux de bord, exportes, analytics.
- **Détail de projet** : modules projet avancés, navigation intra-projet.
- **Audit et historique** : suivi des actions, journal d'audit.
- **Tests complets** : couverture complète (reportée à 60% pour Sprint 2).
- **CI/CD avancée** : pipeline complète, déploiement production