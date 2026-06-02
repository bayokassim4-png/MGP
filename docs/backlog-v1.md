# Backlog Produit V1 - MGP

Ce backlog produit regroupe les fonctionnalités identifiées dans les documents :
- `cahier-des-charges.md`
- `modules.md`
- `modele-donnees.md`
- `architecture.md`
- `roadmap-v1.md`
- `screens.md`
- `audit-v1.md`

Les fonctionnalités sont classées par version : MVP, V1, V2 et V3.

---

## MVP

### 1. Authentification et gestion des utilisateurs
- Priorité : Critique
- Estimation : M
- Dépendances : aucune
- Phase roadmap : Phase 1
- Détails : Login, logout, profil utilisateur, sécurité JWT, stockage sécurisé des mots de passe.

### 2. Gestion des rôles et permissions de base
- Priorité : Critique
- Estimation : M
- Dépendances : Authentification
- Phase roadmap : Phase 1
- Détails : définition des rôles `Admin`, `Financier`, `Éditeur`, `Lecteur`, assignation de rôle à un utilisateur, protection des endpoints.

### 3. Gestion de projets multi-projets
- Priorité : Critique
- Estimation : M
- Dépendances : Authentification, Gestion des rôles
- Phase roadmap : Phase 2
- Détails : création de projet, liste des projets, détail projet, gestion des membres projet, permissions par projet.

### 4. Cadre logique (Logframe)
- Priorité : Haute
- Estimation : L
- Dépendances : Gestion de projets, rôles
- Phase roadmap : Phase 3
- Détails : structure des objectifs, résultats, activités, indicateurs liés à un projet.

### 5. Arborescence des écrans de base
- Priorité : Critique
- Estimation : S
- Dépendances : Authentification, Projet
- Phase roadmap : Phases 1-3
- Détails : pages de connexion, tableau de bord, projets, profil, logframe.

---

## V1

### 6. PTBA / planification opérationnelle
- Priorité : Haute
- Estimation : L
- Dépendances : Cadre logique, Projet
- Phase roadmap : Phase 4
- Détails : création et synthèse PTBA, lignes de planification trimestrielle, lien projet.

### 7. Budget et suivi financier
- Priorité : Haute
- Estimation : L
- Dépendances : Projet, PTBA, rôle Financier
- Phase roadmap : Phase 5
- Détails : rubriques budgétaires, dépenses, calcul des écarts, état financier projet.

### 8. Marchés publics
- Priorité : Moyenne
- Estimation : M
- Dépendances : Projet, Budget
- Phase roadmap : Phase 6
- Détails : gestion des marchés, statuts, passation, lien à une composante et à un fournisseur.

### 9. Gestion des risques
- Priorité : Moyenne
- Estimation : M
- Dépendances : Projet, Cadre logique
- Phase roadmap : Phase 7
- Détails : identification des risques, criticité, stratégie d’atténuation, statut.

### 10. Vue projet et menu projet complet
- Priorité : Haute
- Estimation : S
- Dépendances : Projet, modules métier
- Phase roadmap : Phases 2-7
- Détails : menu projet, navigation vers logframe, PTBA, budget, marchés, risques, reporting.

### 11. Permissions métiers affinées
- Priorité : Haute
- Estimation : S
- Dépendances : Rôles, modules métier
- Phase roadmap : Phases 1-7
- Détails : droits de création/édition/lecture par rôle pour chaque module.

---

## V2

### 12. Reporting et tableau de bord
- Priorité : Haute
- Estimation : L
- Dépendances : Budget, Marchés publics, Risques, Logframe, Projet
- Phase roadmap : Phase 8
- Détails : vue globale multi-projets, reporting projet, indicateurs principaux, export CSV/PDF.

### 13. Administration des organisations
- Priorité : Moyenne
- Estimation : M
- Dépendances : Authentification, Gestion des utilisateurs, Projet
- Phase roadmap : Phase 1 (ajout)
- Détails : gestion des organisations, association utilisateurs/projets, paramètres organisation.

### 14. Historique des actions / audit
- Priorité : Moyenne
- Estimation : M
- Dépendances : Authentification, Rôles, Modules métier
- Phase roadmap : V2
- Détails : suivi des actions critiques, affichage audit, droits d’accès au journal.

### 15. Gestion des fournisseurs / prestataires
- Priorité : Moyenne
- Estimation : M
- Dépendances : Marchés publics
- Phase roadmap : V2
- Détails : entité fournisseur, association aux marchés, recherche de prestataire.

### 16. Amélioration des écrans de détails métiers
- Priorité : Moyenne
- Estimation : M
- Dépendances : Logframe, PTBA, Budget, Marchés publics, Risques
- Phase roadmap : V2
- Détails : écrans détaillés pour indicateurs, lignes PTBA, rubriques budgétaires, plans de mitigation.

---

## V3

### 17. Permissions fines et workflows de validation
- Priorité : Moyenne
- Estimation : L
- Dépendances : Rôles, Reporting, Audit
- Phase roadmap : V3
- Détails : workflows d’approbation, permissions globales vs projet, distinction Admin global / Admin projet.

### 18. Support multi-organisation avancé
- Priorité : Moyenne
- Estimation : L
- Dépendances : Organisation, Projet, Utilisateurs
- Phase roadmap : V3
- Détails : segmentation organisationnelle, isolation des données, administration multi-tenant.

### 19. Analyses croisées et dashboards opérationnels
- Priorité : Faible
- Estimation : XL
- Dépendances : Reporting, Budget, Risques, Marchés publics, Logframe
- Phase roadmap : V3
- Détails : analyses transverses, comparaisons multi-projets, KPI consolidés.

### 20. Amélioration de l’expérience utilisateur
- Priorité : Faible
- Estimation : M
- Dépendances : Écrans existants, feedback utilisateurs
- Phase roadmap : V3
- Détails : filtres, favoris, recherche, aide contextuelle, interface d’administration enrichie.

---

## Annexes et notes

- Les fonctionnalités `Vendor/Supplier` et `RiskMitigation` sont recommandées si la roadmap les intègre pleinement.
- Le backlog associe le module `Organisation` en V1 pour lever l’incohérence identifiée entre documents.
- Le reporting global multi-projets est positionné en V2 pour capitaliser sur les données métier stabilisées.
