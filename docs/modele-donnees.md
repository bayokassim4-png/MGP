# Modèle de Données - Matrice de Gestion de Projet

## Vue d'Ensemble Conceptuel

Ce modèle de données est conçu pour une application SaaS multi-projets destinée à gérer des projets de développement dans des organisations. Il introduit des entités globales de gouvernance, des permissions utilisateurs, et un lien explicite de chacune des entités métier à un projet.

Les entités sont organisées en deux niveaux :
- entités de plateforme : Organisation, Projet, Utilisateur, Rôle, Membre de Projet
- entités métier projet : Logframe, Composante, Rubrique budgétaire, Marché public, Risque

---

## 1. ENTITÉ : Organisation

### Description
Une organisation regroupe les projets, les utilisateurs et les permissions. Elle représente un client SaaS ou une unité opérationnelle.

### Clé primaire
- `id_organisation`

### Attributs principaux
- `id_organisation` : identifiant unique de l'organisation
- `nom` : nom de l'organisation
- `slug` : identifiant lisible unique
- `pays` : pays de l'organisation
- `secteur` : secteur d'activité ou domaine
- `active` : booléen d'activation
- `date_creation` : horodatage de création
- `date_modification` : horodatage de dernière mise à jour

### Cardinalités
- Une organisation possède plusieurs projets (1 → N)
- Une organisation possède plusieurs utilisateurs (1 → N)

### Index PostgreSQL recommandés
- index unique sur `slug`
- index sur `nom`
- index sur `active`

---

## 2. ENTITÉ : Projet

### Description
Un projet est l'unité de périmètre métier. Chaque élément fonctionnel se rattache à un projet unique.

### Clé primaire
- `id_projet`

### Attributs principaux
- `id_projet` : identifiant unique du projet
- `organisation_id` : clé étrangère vers Organisation
- `nom` : nom du projet
- `code` : code projet unique au sein de l'organisation
- `description` : description du projet
- `etat` : statut du projet (planifié, en_cours, clôturé, archivé)
- `devise` : devise du projet
- `date_debut` : date de début prévue
- `date_fin` : date de fin prévue
- `date_creation` : horodatage de création
- `date_modification` : horodatage de dernière mise à jour
- `createur_id` : clé étrangère vers Utilisateur (responsable de création)

### Cardinalités
- Un projet appartient à une organisation (N → 1)
- Un projet a plusieurs logframes, composantes, rubriques, marchés et risques (1 → N)
- Un projet a plusieurs membres utilisateurs (1 → N via ProjetUtilisateur)

### Index PostgreSQL recommandés
- index unique sur `organisation_id` + `code`
- index sur `organisation_id`
- index sur `etat`

---

## 3. ENTITÉ : Utilisateur

### Description
Un utilisateur de la plateforme appartient à une organisation et peut être membre de un ou plusieurs projets avec un rôle défini.

### Clé primaire
- `id_utilisateur`

### Attributs principaux
- `id_utilisateur` : identifiant unique de l'utilisateur
- `organisation_id` : clé étrangère vers Organisation
- `email` : adresse email unique
- `nom_complet` : nom complet de l'utilisateur
- `statut` : actif, inactif, invité
- `telecopie` : numéro de téléphone (optionnel)
- `date_creation` : horodatage de création
- `date_modification` : horodatage de dernière mise à jour

### Cardinalités
- Un utilisateur appartient à une organisation (N → 1)
- Un utilisateur peut être membre de plusieurs projets (N → M via ProjetUtilisateur)

### Index PostgreSQL recommandés
- index unique sur `email`
- index sur `organisation_id`
- index sur `statut`

---

## 4. ENTITÉ : Rôle

### Description
Un rôle définit les permissions ou le niveau d'accès d'un utilisateur sur un projet.

### Clé primaire
- `id_role`

### Attributs principaux
- `id_role` : identifiant unique du rôle
- `nom` : nom du rôle (Admin, éditeur, lecteur, financier)
- `description` : description du rôle
- `scope` : scope global ou projet
- `date_creation` : horodatage de création
- `date_modification` : horodatage de dernière mise à jour

### Cardinalités
- Un rôle peut être utilisé par plusieurs membres de projet (1 → N)

### Index PostgreSQL recommandés
- index unique sur `nom`
- index sur `scope`

---

## 5. ENTITÉ : ProjetUtilisateur

### Description
Table de jonction associant un utilisateur à un projet avec un rôle spécifique.

### Clé primaire
- `id_projet_utilisateur`

### Attributs principaux
- `id_projet_utilisateur` : identifiant unique de la relation
- `projet_id` : clé étrangère vers Projet
- `utilisateur_id` : clé étrangère vers Utilisateur
- `role_id` : clé étrangère vers Rôle
- `est_proprietaire` : booléen indiquant le propriétaire du projet
- `date_ajout` : horodatage d'ajout
- `date_modification` : horodatage de modification

### Cardinalités
- Un projet peut avoir plusieurs membres (1 → N)
- Un utilisateur peut être membre de plusieurs projets (1 → N)
- Un rôle peut être attribué à plusieurs membres (1 → N)

### Index PostgreSQL recommandés
- index unique sur `projet_id` + `utilisateur_id`
- index sur `utilisateur_id`
- index sur `projet_id`
- index sur `role_id`

---

## 6. ENTITÉ : Logique du Projet (LOGFRAME)

### Description
Capture la théorie du changement du projet et les indicateurs associés pour chaque niveau d'intervention.

### Clé primaire
- `id_logframe`

### Attributs principaux
- `id_logframe` : identifiant unique de la ligne LOGFRAME
- `projet_id` : clé étrangère vers Projet
- `niveau_intervention` : Impact, Objectif Spécifique, Extrants, Activités
- `libelle` : description du niveau d'intervention
- `indicateur` : indicateur mesurable (IOV)
- `baseline` : valeur initiale
- `cible` : valeur cible
- `source_verification` : source de vérification
- `hypotheses_risques` : hypothèses ou risques liés
- `date_creation` : horodatage de création
- `date_revision` : horodatage de révision

### Cardinalités
- Un projet a plusieurs lignes LOGFRAME (1 → N)
- Une ligne LOGFRAME correspond à un projet unique (N → 1)

### Index PostgreSQL recommandés
- index sur `projet_id`
- index sur `niveau_intervention`

---

## 7. ENTITÉ : Composante/Activité (PTBA)

### Description
Détaille le plan d'exécution du projet avec calendrier trimestriel et allocation de responsabilités.

### Clé primaire
- `id_composante`

### Attributs principaux
- `id_composante` : identifiant unique de la composante/activité
- `projet_id` : clé étrangère vers Projet
- `code` : code structuré de la composante
- `libelle` : intitulé de la composante/activité
- `responsable` : personne ou équipe responsable
- `budget_prevu` : montant budgétaire prévisionnel
- `q1_executed` : booléen Q1
- `q2_executed` : booléen Q2
- `q3_executed` : booléen Q3
- `q4_executed` : booléen Q4
- `date_planifiee` : date de démarrage prévue
- `date_realisee` : date de réalisation effective
- `logframe_id` : clé étrangère vers LOGFRAME
- `marche_id` : clé étrangère vers Marché public (optionnel)
- `date_creation` : horodatage de création
- `date_modification` : horodatage de modification

### Cardinalités
- Un projet a plusieurs composantes (1 → N)
- Une composante appartient à un seul projet (N → 1)
- Une composante peut être liée à une ligne LOGFRAME (N → 1)
- Une composante peut être liée à un marché public (0..1)

### Index PostgreSQL recommandés
- index sur `projet_id`
- index sur `logframe_id`
- index composite sur `projet_id` + `code`

---

## 8. ENTITÉ : Rubrique Budgétaire (BUDGET & SUIVI FINANCIER)

### Description
Ventilation comptable des budgets par rubrique et suivi du financement du projet.

### Clé primaire
- `id_rubrique`

### Attributs principaux
- `id_rubrique` : identifiant unique de la rubrique
- `projet_id` : clé étrangère vers Projet
- `composante_id` : clé étrangère vers Composante
- `code_rubrique` : code comptable
- `libelle_rubrique` : libellé de la rubrique
- `categorie_parent` : catégorie de la rubrique
- `unite` : unité de mesure
- `quantite` : quantité
- `cout_unitaire` : coût par unité
- `cout_total` : coût total
- `financement_bailleur` : part bailleur
- `contrepartie_etat` : part État
- `budget_depense` : dépenses enregistrées
- `budget_reste` : montant restant
- `date_creation` : horodatage de création
- `date_modification` : horodatage de modification

### Cardinalités
- Un projet contient plusieurs rubriques budgétaires (1 → N)
- Une rubrique appartient à un seul projet (N → 1)
- Une rubrique peut être reliée à une composante (0..1)

### Index PostgreSQL recommandés
- index sur `projet_id`
- index sur `composante_id`
- index composite sur `projet_id` + `code_rubrique`

---

## 9. ENTITÉ : Marché Public (PLAN DE PASSATION DES MARCHÉS)

### Description
Détail des achats publics, de la méthode de passation et du calendrier contractuel.

### Clé primaire
- `id_marche`

### Attributs principaux
- `id_marche` : identifiant unique du marché
- `projet_id` : clé étrangère vers Projet
- `composante_id` : clé étrangère vers Composante
- `description` : intitulé du marché
- `type_marche` : travaux, services, fournitures
- `methode_passation` : AOI, QC, AON, cas particulier
- `type_revue` : a priori, a posteriori
- `date_avis_prevu` : date de publication de l'avis
- `date_signature_contrat` : date de signature
- `montant_estime` : montant estimé
- `montant_contrat_reel` : montant réel du contrat
- `fournisseur` : fournisseur retenu
- `date_realisation` : date de réalisation
- `montant_depense` : montant dépensé
- `date_creation` : horodatage de création
- `date_modification` : horodatage de modification

### Cardinalités
- Un projet a plusieurs marchés publics (1 → N)
- Un marché appartient à un seul projet (N → 1)
- Un marché peut exécuter une composante (0..1)

### Index PostgreSQL recommandés
- index sur `projet_id`
- index sur `composante_id`
- index composite sur `projet_id` + `type_marche`

---

## 10. ENTITÉ : Risque (MATRICE DES RISQUES)

### Description
Identification, évaluation et stratégies d'atténuation des risques du projet.

### Clé primaire
- `id_risque`

### Attributs principaux
- `id_risque` : identifiant unique du risque
- `projet_id` : clé étrangère vers Projet
- `composante_id` : clé étrangère vers Composante (optionnel)
- `logframe_id` : clé étrangère vers LOGFRAME (optionnel)
- `categorie` : catégorie du risque
- `description` : description du risque
- `probabilite` : 1 = Faible, 2 = Moyen, 3 = Fort
- `impact` : 1 = Faible, 2 = Moyen, 3 = Fort
- `criticite` : produit probabilité × impact
- `strategie_attenuation` : actions d'atténuation
- `responsable_id` : clé étrangère vers Utilisateur
- `indicateur_suivi` : indicateur de suivi
- `statut` : identifié, suivi, atténué, réalisé
- `date_identification` : date d'identification
- `date_revision` : date de revue
- `date_creation` : horodatage de création
- `date_modification` : horodatage de modification

### Cardinalités
- Un projet a plusieurs risques (1 → N)
- Un risque appartient à un seul projet (N → 1)
- Un risque peut être rattacher à une composante ou à un logframe
- Un risque a un responsable utilisateur (N → 1)

### Index PostgreSQL recommandés
- index sur `projet_id`
- index sur `composante_id`
- index sur `logframe_id`
- index sur `responsable_id`
- index composite sur `projet_id` + `categorie`

---

## 11. Relations Entités Projet

### Relais du projet
Chaque entité métier contient un champ de liaison vers Projet : `projet_id`.

### Résumé des relations principales
- Organisation 1 → N Projet
- Organisation 1 → N Utilisateur
- Projet 1 → N Logframe
- Projet 1 → N Composante
- Projet 1 → N Rubrique budgétaire
- Projet 1 → N Marché public
- Projet 1 → N Risque
- Projet 1 → N ProjetUtilisateur
- Utilisateur 1 → N ProjetUtilisateur
- Rôle 1 → N ProjetUtilisateur

---

## 12. Préparation pour Prisma ORM

### Principes de modélisation
Le modèle est prêt pour Prisma dès lors qu'il respecte :
- une clé primaire unique par entité
- des clés étrangères explicites entre entités
- des cardinalités claires 1-1, 1-N et N-M
- des types compatibles avec PostgreSQL
- des enums pour les valeurs constantisées

### Entités et relations compatibles
Chaque entité doit être traduite en modèle Prisma avec :
- `id` comme identifiant primaire de type `Int` ou `String`
- `createdAt` et `updatedAt` pour les contrôles d'audit
- relations `@relation` entre `Projet`, `Organisation`, `Utilisateur`, `Role` et les entités métier
- jointure N-M entre `Utilisateur` et `Projet` via `ProjetUtilisateur`

### Types et enums recommandés
- État de projet : `planifie`, `en_cours`, `cloture`, `archive`
- Statut utilisateur : `actif`, `inactif`, `invite`
- Type de marché : `TRAVAUX`, `SERVICES`, `FOURNITURES`
- Méthode de passation : `AOI`, `AON`, `QC`, `CAS_PARTICULIER`
- Type de revue : `A_PRIORI`, `A_POSTERIORI`
- Catégorie de risque : `FIDUCIAIRE`, `OPERATIONNEL`, `SOCIAL`, `POLITIQUE`, `ENVIRONNEMENTAL`, `METEO`
- Statut de risque : `IDENTIFIE`, `SUIVI`, `ATTENUE`, `REALISE`

### Recommandations PostgreSQL
- Utiliser `serial` ou `bigserial` pour les identifiants si nécessaire, ou `uuid` pour l'évolutivité
- Indexer systématiquement les clés étrangères
- Créer des indexes composites sur les paires fréquemment recherchées :
  - projet_id + code
  - projet_id + type_marche
  - projet_id + categorie
- Ajouter des index uniques pour les contraintes d'unicité métier :
  - organisation_id + code projet
  - organisation_id + email utilisateur
  - projet_id + utilisateur_id dans ProjetUtilisateur

---

## 13. Dictionnaire de Colonnes Révisé

### Organisation
| Colonne | Type | Obligatoire | Description |
|---------|------|-------------|-------------|
| id_organisation | Clé primaire | ✓ | Identifiant unique |
| nom | Texte | ✓ | Nom de l'organisation |
| slug | Texte | ✓ | Identifiant lisible unique |
| pays | Texte | ✗ | Pays de l'organisation |
| secteur | Texte | ✗ | Secteur d'activité |
| active | Booléen | ✓ | Organisation active |
| date_creation | Horodatage | ✓ | Date de création |
| date_modification | Horodatage | ✗ | Date de modification |

### Projet
| Colonne | Type | Obligatoire | Description |
|---------|------|-------------|-------------|
| id_projet | Clé primaire | ✓ | Identifiant unique |
| organisation_id | Clé étrangère | ✓ | Référence vers Organisation |
| createur_id | Clé étrangère | ✗ | Créateur du projet |
| nom | Texte | ✓ | Nom du projet |
| code | Texte | ✓ | Code interne unique par organisation |
| description | Texte | ✗ | Description du projet |
| etat | Enum | ✓ | Statut du projet |
| devise | Texte | ✗ | Devise de suivi financier |
| date_debut | Date | ✗ | Début prévu |
| date_fin | Date | ✗ | Fin prévue |
| date_creation | Horodatage | ✓ | Date de création |
| date_modification | Horodatage | ✗ | Date de modification |

### Utilisateur
| Colonne | Type | Obligatoire | Description |
|---------|------|-------------|-------------|
| id_utilisateur | Clé primaire | ✓ | Identifiant unique |
| organisation_id | Clé étrangère | ✓ | Référence vers Organisation |
| email | Texte | ✓ | Adresse email unique |
| nom_complet | Texte | ✓ | Nom complet |
| statut | Enum | ✓ | Statut de l'utilisateur |
| telecopie | Texte | ✗ | Téléphone |
| date_creation | Horodatage | ✓ | Date de création |
| date_modification | Horodatage | ✗ | Date de modification |

### Rôle
| Colonne | Type | Obligatoire | Description |
|---------|------|-------------|-------------|
| id_role | Clé primaire | ✓ | Identifiant unique |
| nom | Texte | ✓ | Nom du rôle |
| description | Texte | ✗ | Description du rôle |
| scope | Texte | ✓ | Scope du rôle |
| date_creation | Horodatage | ✓ | Date de création |
| date_modification | Horodatage | ✗ | Date de modification |

### ProjetUtilisateur
| Colonne | Type | Obligatoire | Description |
|---------|------|-------------|-------------|
| id_projet_utilisateur | Clé primaire | ✓ | Identifiant unique |
| projet_id | Clé étrangère | ✓ | Référence vers Projet |
| utilisateur_id | Clé étrangère | ✓ | Référence vers Utilisateur |
| role_id | Clé étrangère | ✓ | Référence vers Rôle |
| est_proprietaire | Booléen | ✓ | Marque le propriétaire du projet |
| date_ajout | Horodatage | ✓ | Date d'ajout |
| date_modification | Horodatage | ✗ | Date de modification |

### Logframe
| Colonne | Type | Obligatoire | Description |
|---------|------|-------------|-------------|
| id_logframe | Clé primaire | ✓ | Identifiant unique |
| projet_id | Clé étrangère | ✓ | Référence vers Projet |
| niveau_intervention | Enum | ✓ | Impact / Objectif Spécifique / Extrants / Activités |
| libelle | Texte | ✓ | Description |
| indicateur | Texte | ✓ | Indicateur |
| baseline | Texte | ✗ | Ligne de base |
| cible | Texte | ✗ | Cible |
| source_verification | Texte | ✗ | Source de vérification |
| hypotheses_risques | Texte | ✗ | Hypothèses et risques |
| date_creation | Horodatage | ✓ | Date de création |
| date_revision | Horodatage | ✗ | Date de révision |

### Composante
| Colonne | Type | Obligatoire | Description |
|---------|------|-------------|-------------|
| id_composante | Clé primaire | ✓ | Identifiant unique |
| projet_id | Clé étrangère | ✓ | Référence vers Projet |
| logframe_id | Clé étrangère | ✗ | Référence vers Logframe |
| code | Texte | ✓ | Code de composante |
| libelle | Texte | ✓ | Intitulé |
| responsable | Texte | ✗ | Responsable |
| budget_prevu | Décimal | ✗ | Budget prévu |
| q1_executed | Booléen | ✗ | Q1 prévu |
| q2_executed | Booléen | ✗ | Q2 prévu |
| q3_executed | Booléen | ✗ | Q3 prévu |
| q4_executed | Booléen | ✗ | Q4 prévu |
| date_planifiee | Date | ✗ | Date de démarrage |
| date_realisee | Date | ✗ | Date de réalisation |
| marche_id | Clé étrangère | ✗ | Référence vers Marché public |
| date_creation | Horodatage | ✓ | Date de création |
| date_modification | Horodatage | ✗ | Date de modification |

### Rubrique Budgétaire
| Colonne | Type | Obligatoire | Description |
|---------|------|-------------|-------------|
| id_rubrique | Clé primaire | ✓ | Identifiant unique |
| projet_id | Clé étrangère | ✓ | Référence vers Projet |
| composante_id | Clé étrangère | ✗ | Référence vers Composante |
| code_rubrique | Texte | ✓ | Code comptable |
| libelle_rubrique | Texte | ✓ | Intitulé |
| categorie_parent | Texte | ✗ | Catégorie parente |
| unite | Texte | ✗ | Unité |
| quantite | Décimal | ✗ | Quantité |
| cout_unitaire | Décimal | ✗ | Coût unitaire |
| cout_total | Décimal | ✗ | Coût total |
| financement_bailleur | Décimal | ✗ | Part bailleur |
| contrepartie_etat | Décimal | ✗ | Part État |
| budget_depense | Décimal | ✗ | Dépenses |
| budget_reste | Décimal | ✗ | Reste |
| date_creation | Horodatage | ✓ | Date de création |
| date_modification | Horodatage | ✗ | Date de modification |

### Marché public
| Colonne | Type | Obligatoire | Description |
|---------|------|-------------|-------------|
| id_marche | Clé primaire | ✓ | Identifiant unique |
| projet_id | Clé étrangère | ✓ | Référence vers Projet |
| composante_id | Clé étrangère | ✗ | Référence vers Composante |
| description | Texte | ✓ | Intitulé |
| type_marche | Enum | ✓ | Type de marché |
| methode_passation | Enum | ✓ | Méthode |
| type_revue | Enum | ✓ | Revue |
| date_avis_prevu | Date | ✗ | Date avis prévue |
| date_signature_contrat | Date | ✗ | Date signature |
| montant_estime | Décimal | ✗ | Montant estimé |
| montant_contrat_reel | Décimal | ✗ | Montant réel |
| fournisseur | Texte | ✗ | Fournisseur |
| date_realisation | Date | ✗ | Date de réalisation |
| montant_depense | Décimal | ✗ | Montant dépensé |
| date_creation | Horodatage | ✓ | Date de création |
| date_modification | Horodatage | ✗ | Date de modification |

### Risque
| Colonne | Type | Obligatoire | Description |
|---------|------|-------------|-------------|
| id_risque | Clé primaire | ✓ | Identifiant unique |
| projet_id | Clé étrangère | ✓ | Référence vers Projet |
| composante_id | Clé étrangère | ✗ | Référence vers Composante |
| logframe_id | Clé étrangère | ✗ | Référence vers Logframe |
| categorie | Enum | ✓ | Catégorie de risque |
| description | Texte | ✓ | Description |
| probabilite | Entier | ✓ | Probabilité |
| impact | Entier | ✓ | Impact |
| criticite | Entier | ✓ | Criticité |
| strategie_attenuation | Texte | ✗ | Stratégie d'atténuation |
| responsable_id | Clé étrangère | ✗ | Référence vers Utilisateur |
| indicateur_suivi | Texte | ✗ | Indicateur de suivi |
| statut | Enum | ✓ | Statut du risque |
| date_identification | Date | ✗ | Date d'identification |
| date_revision | Date | ✗ | Date de révision |
| date_creation | Horodatage | ✓ | Date de création |
| date_modification | Horodatage | ✗ | Date de modification |

---

## 14. Gouvernance des UX et Permissions

### Utilisation des rôles
- `Admin` : accès global à un projet, configuration et gestion des utilisateurs
- `Financier` : accès aux budgets, marchés et risques financiers
- `Éditeur` : création et modification du PTBA, logframe et marchés
- `Lecteur` : accès en lecture seule aux données du projet

### Modèle de permission
- Le rôle s'applique au niveau projet via la table de jonction ProjetUtilisateur
- Un utilisateur peut avoir un rôle différent selon le projet
- Un propriétaire de projet peut être désigné par le booléen `est_proprietaire`

---

## 15. Points d'Attention pour Prisma

### Convention de nommage
- Utiliser des noms en camelCase pour les champs dans Prisma, mais conserver les noms métiers dans la documentation
- Gérer les relations avec des champs de type `Int` ou `String` selon le choix d'identifiant

### Types scalaires recommandés
- Identifiants : `Int` ou `String` (UUID)
- Dates : `DateTime`
- Booléens : `Boolean`
- Enum : `Enum` pour les valeurs fixes
- Nombres : `Decimal` pour les valeurs financières

### Relations à modéliser
- Organisation 1 → N Projet
- Projet 1 → N Logframe, Composante, RubriqueBudgétaire, MarchéPublic, Risque
- Projet 1 → N ProjetUtilisateur
- Utilisateur 1 → N ProjetUtilisateur
- Rôle 1 → N ProjetUtilisateur

### Index PostgreSQL pour Prisma
- Indexer `organisation_id`, `projet_id`, `utilisateur_id`, `role_id` sur les tables de relation
- Index composites recommandés sur les colonnes filtrées fréquemment
- Préférer les index uniques sur les contraintes métiers

---

## 16. Validation du modèle multi-projet

### Cohérence requise
- Toutes les entités métier existantes sont maintenant rattachées à `Projet`
- Le projet est lui-même rattaché à une organisation
- Les utilisateurs existent à l'échelle de l'organisation, puis sont affectés aux projets
- Les rôles sont séparés des utilisateurs afin d'autoriser un modèle N-M

### Résumé d'architecture
- `Organisation` → `Projet` → entités métier
- `Organisation` → `Utilisateur`
- `Utilisateur` → `Projet` via `ProjetUtilisateur`
- `Rôle` → `ProjetUtilisateur`

Ce modèle est préparé pour un backend PostgreSQL et pour être traduit ensuite dans un schéma Prisma ORM standard sans modification structurelle majeure.
    └─ hypotheses_risques
        ↓
    COMPOSANTE (PTBA)
        ├─ code
        ├─ libelle
        ├─ responsable
        ├─ budget_prevu
        ├─ q1/q2/q3/q4_executed
        ├─ date_planifiee
        └─ date_realisee
        ↓
    RUBRIQUE BUDGETAIRE
        ├─ code_rubrique
        ├─ libelle_rubrique
        ├─ unite
        ├─ quantite
        ├─ cout_unitaire
        ├─ cout_total
        ├─ financement_bailleur
        └─ contrepartie_etat
        ↓
    MARCHE PUBLIC
        ├─ description
        ├─ type_marche
        ├─ methode_passation
        ├─ date_avis_prevu
        ├─ date_signature_contrat
        └─ montant_estime
        ↓
    RISQUE (MATRICE)
        ├─ categorie
        ├─ description
        ├─ probabilite
        ├─ impact
        ├─ criticite
        ├─ strategie_attenuation
        └─ responsable
```

---

## 7. Matrice de Cohérence (Validation)

| Donnée | LOGFRAME | PTBA | BUDGET | MARCHE | RISQUE | Cohérence |
|--------|----------|------|--------|--------|--------|-----------|
| Montant 50 forages | - | 400 000 | Dans rubriques | 400 000 | - | ✓ |
| Calendrier Q1-Q4 | Activités | X dans Q1-Q4 | Ventilation | Date avis/sig | Date révision | ✓ |
| Responsables | Implicites | Nommés | - | - | Assigné | ✓ |
| Indicateurs | IOV | - | - | - | Suivi | ✓ |
| Risques | Hypothèses | - | - | - | Détaillés | ✓ |

---

## 8. Contrôles de Qualité des Données

### Validations Obligatoires

1. **Cohérence Budgétaire**
   ```
   PTBA.budget_prevu ≈ SOMME(RUBRIQUE.cout_total pour composante donnée)
   SOMME(MARCHE.montant_estime) ≥ SOMME(PTBA.budget_prevu)
   ```

2. **Cohérence Temporelle**
   ```
   Marché.date_avis_prevu < Marché.date_signature_contrat
   Composante.date_planifiee <= Composante.date_realisee
   ```

3. **Traçabilité d'Identifiants**
   ```
   Chaque MARCHE.id_composante doit exister dans COMPOSANTE.id_composante
   Chaque RISQUE.id_risque doit être traçable (risque identifié dans LOGFRAME)
   ```

4. **Financement**
   ```
   RUBRIQUE.financement_bailleur + RUBRIQUE.contrepartie_etat = RUBRIQUE.cout_total
   ```

---

## 9. Format de Stockage Actuel et Recommandations

### Format Actuel
- **Contenant** : Classeur Excel (Matrice_Gestion_Projet.xlsx)
- **Structure** : 5 onglets logiques dans 1 feuille physique
- **Granularité** : Niveau d'activité, de rubrique budgétaire, de marché

### Recommandations pour Évolution

#### Migration vers Base de Données Relationnelle
Si volume important :
```sql
CREATE TABLE logframe (
  id_logframe INT PRIMARY KEY AUTO_INCREMENT,
  niveau_intervention ENUM('Impact', 'Objectif Spécifique', 'Extrants', 'Activités'),
  libelle VARCHAR(255) NOT NULL,
  indicateur VARCHAR(255),
  baseline VARCHAR(255),
  cible VARCHAR(255),
  source_verification TEXT,
  hypotheses_risques TEXT,
  date_creation TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  date_revision TIMESTAMP
);

-- Tables similaires pour composante, rubrique, marche, risque
```

#### Normalisation des Données
- Éliminer les redondances
- Utiliser des tables de référence (Énumérations)
- Créer des vues consolidées pour rapports

---

## 10. Dictionnaire Complet des Colonnes

### LOGFRAME
| Colonne | Type | Nullabilité | Description |
|---------|------|-------------|-------------|
| Niveau d'intervention | Texte | Non | Classification hiérarchique |
| Indicateurs (IOV) | Texte | Non | Mesure de succès |
| Ligne de base (Baseline) | Texte | Oui | État initial |
| Cible visée | Texte | Oui | État cible |
| Source de vérification | Texte | Oui | Moyen de vérification |
| Hypothèses & Risques | Texte | Oui | Assomptions et menaces |

### PTBA
| Colonne | Type | Nullabilité | Description |
|---------|------|-------------|-------------|
| Code | Texte | Non | Identifiant structuré |
| Composante/Activité | Texte | Non | Intitulé |
| Responsable | Texte | Non | Responsable d'exécution |
| Q1/Q2/Q3/Q4 | Booléen | Oui | Indicatrice d'activité |
| Budget Prévu | Décimal | Non | Montant prévisionnel |

### BUDGET & SUIVI FINANCIER
| Colonne | Type | Nullabilité | Description |
|---------|------|-------------|-------------|
| Rubrique Budgétaire | Texte | Non | Classification comptable |
| Unité | Texte | Non | Unité de mesure |
| Quantité | Décimal | Oui | Nombre d'unités |
| Coût Unitaire | Décimal | Oui | Prix unitaire |
| Coût Total | Décimal | Non | Quantité × Coût Unitaire |
| Financement Bailleur | Décimal | Non | Part bailleur |
| Contrepartie (État) | Décimal | Non | Part contrepartie |

### PLAN DE PASSATION DES MARCHÉS
| Colonne | Type | Nullabilité | Description |
|---------|------|-------------|-------------|
| Description du Marché | Texte | Non | Intitulé |
| Type | Énumération | Non | Travaux/Services/Fournitures |
| Méthode | Énumération | Non | AOI/Qualité-Coût/etc. |
| Revue | Énumération | Non | A priori/A posteriori |
| Date prévue Avis | Date | Non | Publication avis |
| Date signature contrat | Date | Non | Signature contrat |
| Montant Estimé | Décimal | Non | Budget marché |

### MATRICE DES RISQUES
| Colonne | Type | Nullabilité | Description |
|---------|------|-------------|-------------|
| Catégorie | Énumération | Non | Type de risque |
| Description du Risque | Texte | Non | Explicitation |
| Probabilité (1-3) | Entier | Non | 1=Faible, 2=Moyen, 3=Fort |
| Impact (1-3) | Entier | Non | 1=Faible, 2=Moyen, 3=Fort |
| Criticité (P×I) | Entier | Calculé | Produit P × I |
| Stratégie d'atténuation | Texte | Non | Actions |
| Responsable | Texte | Non | Propriétaire du risque |
