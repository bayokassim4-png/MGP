# Roadmap V1 - MGP

Ce document présente la feuille de route de développement de MGP en 8 phases successives. Chaque phase inclut les objectifs, les écrans à développer, les API nécessaires, les tables concernées et les critères de validation.

---

## Phase 1 : Authentification, gestion utilisateurs, gestion rôles

### Objectifs
- Mettre en place l’accès sécurisé à l’application.
- Gérer les comptes utilisateurs et leurs profils.
- Définir un système de rôles et permissions de base.

### Écrans à développer
- Page de connexion
- Page d’inscription (optionnelle selon le modèle)
- Page de réinitialisation du mot de passe
- Espace profil utilisateur
- Liste des utilisateurs
- Détail utilisateur
- Page de gestion des rôles
- Affectation de rôle à un utilisateur

### API nécessaires
- `POST /auth/login`
- `POST /auth/logout`
- `POST /auth/password-reset` (ou équivalent)
- `GET /users/me`
- `GET /users`
- `POST /users`
- `GET /users/:userId`
- `PATCH /users/:userId`
- `DELETE /users/:userId`
- `GET /roles`
- `POST /roles`
- `PATCH /roles/:roleId`
- `DELETE /roles/:roleId`
- `POST /users/:userId/roles`
- `DELETE /users/:userId/roles/:roleId`

### Tables concernées
- `User`
- `Role`
- `UserRole` (ou table de jonction/utilisateursRôles)
- `Organisation` (si nécessaire pour multi-organisation dès la phase 1)

### Critères de validation
- Un utilisateur peut se connecter avec un email/mot de passe valides.
- Une session authentifiée permet d’accéder aux pages protégées.
- Un utilisateur peut consulter et modifier son profil.
- Les administrateurs peuvent créer, modifier et supprimer des utilisateurs.
- Le système de rôles permet d’associer un rôle à un utilisateur.
- Les rôles sont utilisés pour restreindre l’accès aux endpoints protégés.
- Les mots de passe sont stockés de façon sécurisée (hachage).

---

## Phase 2 : Gestion des projets

### Objectifs
- Permettre la création et la consultation de projets.
- Gérer l’appartenance des utilisateurs aux projets.
- Structurer les bases pour le modèle SaaS multi-projets.

### Écrans à développer
- Liste des projets
- Page de création de projet
- Page de détail du projet
- Page de gestion des membres du projet
- Page d’accès et permissions par projet

### API nécessaires
- `GET /projects`
- `POST /projects`
- `GET /projects/:projectId`
- `PATCH /projects/:projectId`
- `DELETE /projects/:projectId`
- `GET /projects/:projectId/members`
- `POST /projects/:projectId/members`
- `DELETE /projects/:projectId/members/:memberId`
- `GET /projects/:projectId/roles`

### Tables concernées
- `Project`
- `ProjectUser` (ou `ProjetUtilisateur`)
- `Role`
- `Organisation`
- `User`

### Critères de validation
- Les utilisateurs authentifiés peuvent créer un nouveau projet.
- Un projet créé apparaît dans la liste des projets accessibles.
- Les utilisateurs affectés à un projet y accèdent avec le rôle approprié.
- La suppression ou la modification d’un projet s’effectue correctement.
- La liste des membres du projet reflète précisément les affectations.

---

## Phase 3 : Cadre logique

### Objectifs
- Implémenter le module de cadre logique pour structurer les objectifs, résultats, activités et indicateurs.
- Associer le cadre logique à un projet.

### Écrans à développer
- Page de création/édition du cadre logique du projet
- Page de visualisation du logframe
- Pages de détail pour objectifs, résultats, activités, indicateurs

### API nécessaires
- `GET /projects/:projectId/logframes`
- `POST /projects/:projectId/logframes`
- `GET /projects/:projectId/logframes/:logframeId`
- `PATCH /projects/:projectId/logframes/:logframeId`
- `DELETE /projects/:projectId/logframes/:logframeId`
- `GET /projects/:projectId/logframes/:logframeId/indicators`
- `POST /projects/:projectId/logframes/:logframeId/indicators`

### Tables concernées
- `Logframe`
- `Objective` (ou `Objectif`)
- `Result`
- `Activity`
- `Indicator`
- `Project`

### Critères de validation
- Un cadre logique peut être créé et associé à un projet.
- Les éléments de niveau logique (objectifs, résultats, activités, indicateurs) sont modifiables.
- La visualisation du logframe affiche la structure hiérarchique correctement.
- Les indicateurs sont liés à l’objectif ou au résultat adéquat.
- Les rôles projet empêchent l’accès non autorisé au logframe.

---

## Phase 4 : PTBA

### Objectifs
- Gérer le Plan de Travail Budgetaire Annuel (PTBA) au niveau du projet.
- Structurer les activités et ressources financières planifiées.

### Écrans à développer
- Page de création/édition du PTBA du projet
- Vue synthèse du PTBA
- Détail des lignes PTBA et des ressources associées

### API nécessaires
- `GET /projects/:projectId/ptba`
- `POST /projects/:projectId/ptba`
- `PATCH /projects/:projectId/ptba/:ptbaId`
- `DELETE /projects/:projectId/ptba/:ptbaId`
- `GET /projects/:projectId/ptba/:ptbaId/lines`
- `POST /projects/:projectId/ptba/:ptbaId/lines`

### Tables concernées
- `PTBA`
- `PTBALine`
- `Project`
- `User`

### Critères de validation
- Un PTBA peut être créé et rattaché à un projet.
- Les lignes du PTBA peuvent être ajoutées, modifiées et supprimées.
- Le calcul de la somme des ressources est cohérent.
- Le PTBA est accessible uniquement aux membres du projet.

---

## Phase 5 : Budget et suivi financier

### Objectifs
- Gérer le budget projet et le suivi des dépenses.
- Proposer un suivi financier avec des états et des écarts budgétaires.

### Écrans à développer
- Tableau de bord budgétaire du projet
- Page de saisie des dépenses et des postes budgétaires
- Page de suivi des écarts budgétaires
- Historique des dépenses

### API nécessaires
- `GET /projects/:projectId/budgets`
- `POST /projects/:projectId/budgets`
- `PATCH /projects/:projectId/budgets/:budgetId`
- `DELETE /projects/:projectId/budgets/:budgetId`
- `GET /projects/:projectId/budgets/:budgetId/expenses`
- `POST /projects/:projectId/budgets/:budgetId/expenses`
- `PATCH /projects/:projectId/budgets/:budgetId/expenses/:expenseId`
- `DELETE /projects/:projectId/budgets/:budgetId/expenses/:expenseId`

### Tables concernées
- `Budget`
- `BudgetLine`
- `Expense`
- `Project`
- `User`

### Critères de validation
- Les budgets du projet peuvent être créés et structurés par postes.
- Les dépenses sont enregistrées et reliées aux lignes de budget.
- Les totaux de budget, dépenses et écarts se calculent correctement.
- Les utilisateurs peuvent visualiser l’état financier du projet.
- Les droits d’accès respectent les rôles financiers.

---

## Phase 6 : Marchés publics

### Objectifs
- Gérer les marchés publics liés aux projets.
- Suivre les procédures, appels d’offres et prestataires.

### Écrans à développer
- Page liste des marchés publics du projet
- Page de création et modification de marché
- Page de détail d’un marché public
- Vue synthèse des procédures et des statuts

### API nécessaires
- `GET /projects/:projectId/markets`
- `POST /projects/:projectId/markets`
- `GET /projects/:projectId/markets/:marketId`
- `PATCH /projects/:projectId/markets/:marketId`
- `DELETE /projects/:projectId/markets/:marketId`

### Tables concernées
- `Market`
- `Project`
- `User`
- `Vendor` ou `Supplier` (si géré séparément)

### Critères de validation
- Les marchés publics peuvent être créés et rattachés à un projet.
- Les informations de procédure et de statut sont sauvegardées correctement.
- Les marchés sont visibles uniquement par les membres autorisés.
- Les modifications de statut sont bien historisées si nécessaire.

---

## Phase 7 : Gestion des risques

### Objectifs
- Suivre les risques du projet et leur traitement.
- Gérer les mesures de mitigation et les niveaux de criticité.

### Écrans à développer
- Page liste des risques du projet
- Page de création/édition de risque
- Page de détail et mesures de mitigation
- Vue synthèse des risques par criticité/statut

### API nécessaires
- `GET /projects/:projectId/risks`
- `POST /projects/:projectId/risks`
- `GET /projects/:projectId/risks/:riskId`
- `PATCH /projects/:projectId/risks/:riskId`
- `DELETE /projects/:projectId/risks/:riskId`
- `GET /projects/:projectId/risks/:riskId/mitigations`
- `POST /projects/:projectId/risks/:riskId/mitigations`

### Tables concernées
- `Risk`
- `RiskMitigation`
- `Project`
- `User`

### Critères de validation
- Les risques peuvent être saisis et associés à un projet.
- Chaque risque dispose d’un niveau de criticité et d’un statut.
- Les actions de mitigation sont enregistrées et suivies.
- Les rapports de risque consolidés sont cohérents.
- L’accès est restreint aux membres du projet.

---

## Phase 8 : Tableau de bord et reporting

### Objectifs
- Offrir une vue globale des projets et des indicateurs clés.
- Permettre de générer des rapports synthétiques.

### Écrans à développer
- Tableau de bord global multi-projets
- Tableau de bord projet
- Pages de reporting par domaine (finances, risques, logframe)
- Écran de filtres et export CSV/PDF

### API nécessaires
- `GET /dashboard/summary`
- `GET /dashboard/projects`
- `GET /dashboard/projects/:projectId/summary`
- `GET /dashboard/projects/:projectId/financial-report`
- `GET /dashboard/projects/:projectId/risk-report`
- `GET /dashboard/projects/:projectId/logframe-report`
- `GET /reports/export`

### Tables concernées
- `Project`
- `Budget`
- `Expense`
- `Risk`
- `Logframe`
- `Indicator`
- `Market`
- `User`

### Critères de validation
- Le dashboard affiche des indicateurs pertinents et à jour.
- Les rapports par projet regroupent les données clés attendues.
- Les filtres fonctionnent et restituent les résultats corrects.
- Les exports de rapports sont générés sans erreur.
- Les données affichées respectent les droits d’accès utilisateur.

---

## Remarques complémentaires

- La roadmap est itérative : chaque phase peut être affinée en sprints.
- Les priorités peuvent évoluer selon les retours métier et les tests utilisateurs.
- Les phases 4 à 8 reposent sur la base solide posée par les phases 1 à 3.
