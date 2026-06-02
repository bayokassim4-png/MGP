# Écrans et Navigation - MGP

Ce document décrit l’arborescence complète des écrans, les menus de navigation, les permissions par rôle et le parcours utilisateur type de la plateforme MGP.

---

## 1. Arborescence complète des écrans

### 1.1. Écrans publics / d’accès
- Page de connexion
- Page d’inscription (optionnelle)
- Page de réinitialisation du mot de passe
- Page d’accueil marketing / informations (optionnelle)

### 1.2. Écrans globaux après authentification
- Tableau de bord global
- Liste des projets
- Profil utilisateur
- Administration utilisateurs
- Administration rôles
- Administration organisation

### 1.3. Écrans projet
- Détail du projet
- Membres du projet
- Logframe / cadre logique
  - Vue synthèse LOGFRAME
  - Création / édition d’objectifs
  - Création / édition de résultats
  - Création / édition d’activités
  - Indicateurs et sources de vérification
- PTBA
  - Synthèse du PTBA
  - Création / édition de lignes PTBA
  - Planning trimestriel
- Budget et suivi financier
  - Vue budgétaire projet
  - Liste des rubriques budgétaires
  - Détail et suivi des dépenses
  - Écarts budgétaires
- Marchés publics
  - Liste des marchés publics projet
  - Création / édition d’un marché
  - Détail d’un marché
  - Statuts et procédure de passation
- Gestion des risques
  - Liste des risques projet
  - Création / édition d’un risque
  - Détail et plan de mitigation
  - Synthèse par criticité / statut
- Reporting projet
  - Vue de reporting financier
  - Vue de reporting risques
  - Vue de reporting logframe
- Export / impression de rapports

---

## 2. Menus de navigation

### 2.1. Menu principal global
- Tableau de bord
- Projets
- Utilisateurs
- Rôles
- Organisation
- Mon profil
- Déconnexion

### 2.2. Menu projet
- Résumé du projet
- Cadre logique
- PTBA
- Budget
- Marchés publics
- Risques
- Reporting
- Membres

### 2.3. Menu secondaire / contextuel
- Sélection de projet
- Filtre par organisation
- Favoris ou projets récents
- Liens vers l’aide et la documentation interne

### 2.4. Menu d’administration avancée
- Gestion des utilisateurs
- Gestion des rôles
- Gestion des organisations
- Historique des actions (audit)

---

## 3. Permissions par rôle

### 3.1. Rôles définis
- Admin
- Financier
- Éditeur
- Lecteur

### 3.2. Permissions générales par rôle

| Écran / fonctionnalité | Admin | Financier | Éditeur | Lecteur |
|------------------------|:-----:|:--------:|:-------:|:------:|
| Tableau de bord global | Oui | Oui | Oui | Oui |
| Liste des projets | Oui | Oui | Oui | Oui |
| Création de projet | Oui | Non | Non | Non |
| Edition de projet | Oui | Oui* | Oui* | Non |
| Suppression de projet | Oui | Non | Non | Non |
| Gestion des utilisateurs | Oui | Non | Non | Non |
| Gestion des rôles | Oui | Non | Non | Non |
| Ajout de membre projet | Oui | Oui | Oui | Non |
| Retrait de membre projet | Oui | Non | Oui* | Non |
| Accès au profil utilisateur | Oui | Oui | Oui | Oui |
| Consultation du logframe | Oui | Oui | Oui | Oui |
| Création / édition logframe | Oui | Non | Oui | Non |
| Consultation du PTBA | Oui | Oui | Oui | Oui |
| Création / édition PTBA | Oui | Non | Oui* | Non |
| Consultation budget | Oui | Oui | Oui | Oui |
| Création / édition budget | Oui | Oui | Oui* | Non |
| Consultation dépenses | Oui | Oui | Oui | Oui |
| Création / édition dépenses | Oui | Oui | Non | Non |
| Consultation marchés publics | Oui | Oui | Oui | Oui |
| Création / édition marchés | Oui | Oui | Non | Non |
| Consultation risques | Oui | Oui | Oui | Oui |
| Création / édition risques | Oui | Oui | Oui | Non |
| Accès rapports projet | Oui | Oui | Oui | Oui |
| Export de rapports | Oui | Oui | Oui | Oui* |


> Notes :
> - Les droits marqués `Oui*` peuvent être limités selon les règles internes du projet et la configuration des permissions fines.
> - Le rôle `Lecteur` est un profil lecture seule pour assurer la visibilité sans modification.

### 3.3. Permissions métier détaillées
- `Admin` : accès global à tous les écrans, aux paramètres organisationnels et à la gestion des utilisateurs/roles.
- `Financier` : accès complet au module budget, marchés publics et reporting financier. Accès en lecture aux autres modules.
- `Éditeur` : peut créer et modifier les données de projet (logframe, PTBA, budget, risques) selon les droits de projet. Accès limité à l’administration système.
- `Lecteur` : visualisation des données projet, des synthèses et des rapports sans modification.

---

## 4. Parcours utilisateur complet

### 4.1. Parcours d’un nouvel utilisateur
1. Arrivée sur la page de connexion.
2. Inscription ou demande d’accès selon le modèle SaaS.
3. Activation du compte et première connexion.
4. Remplissage du profil personnel.
5. Accès à la liste des projets.
6. Choix d’un projet auquel l’utilisateur est rattaché.
7. Découverte du tableau de bord projet.
8. Navigation vers le module pertinent selon le rôle.

### 4.2. Parcours d’un administrateur
1. Connexion au système.
2. Consultation du tableau de bord global et des KPI multi-projets.
3. Accès au menu `Utilisateurs`.
4. Création et gestion des comptes utilisateurs.
5. Accès au menu `Rôles` pour définir ou mettre à jour les rôles.
6. Sélection d’un projet.
7. Gestion des membres du projet et attribution de rôles.
8. Vérification de l’avancement via le logframe, le budget et les risques.

### 4.3. Parcours d’un financier
1. Connexion.
2. Consultation du tableau de bord global ou du dashboard financier projet.
3. Sélection du projet à analyser.
4. Accès au module `Budget` pour examiner les rubriques et dépenses.
5. Accès au module `Marchés publics` pour vérifier les marchés en cours.
6. Consultation du reporting financier et export des états.

### 4.4. Parcours d’un éditeur de projet
1. Connexion.
2. Sélection du projet assigné.
3. Navigation vers le `Logframe`.
4. Création ou modification des objectifs, résultats, activités et indicateurs.
5. Passage au `PTBA` pour planifier les activités et ressources.
6. Mise à jour du budget et du suivi des dépenses si autorisé.
7. Gestion des risques et des actions de mitigation.

### 4.5. Parcours d’un lecteur
1. Connexion.
2. Sélection d’un projet accessible.
3. Lecture des synthèses du projet : logframe, PTBA, budget, risques.
4. Consultation des rapports et export des vues si nécessaire.

### 4.6. Parcours de navigation projet
1. Depuis le tableau de bord global, l’utilisateur clique sur un projet.
2. Le projet s’ouvre sur sa page de détail.
3. L’utilisateur choisit un module projet dans le menu projet : `Cadre logique`, `PTBA`, `Budget`, `Marchés publics`, `Risques`, `Reporting`.
4. Dans chaque module, l’utilisateur visualise la synthèse puis choisit une action spécifique : création, édition, consultation détaillée.
5. L’utilisateur revient ensuite au projet ou au tableau de bord général.

### 4.7. Flux de validation des écrans
- Les écrans d’édition sont accessibles uniquement après authentification.
- Les écrans sensibles sont filtrés en fonction du rôle et de l’appartenance au projet.
- Toute action de modification déclenche une validation du formulaire et un contrôle de permission.
- Les écrans de rapport et visualisation sont disponibles aux rôles lecture seule.

---

## 5. Synthèse

La navigation MGP se structure en deux couches principales :
- une couche globale autour du tableau de bord, de la gestion des utilisateurs et des rôles,
- une couche projet autour des modules `Logframe`, `PTBA`, `Budget`, `Marchés publics`, `Risques` et `Reporting`.

Les permissions permettent de différencier l’accès aux écrans et aux actions selon les rôles `Admin`, `Financier`, `Éditeur` et `Lecteur`. Le parcours utilisateur commence toujours par l’authentification, puis par la sélection d’un projet avant d’accéder aux modules métiers.
