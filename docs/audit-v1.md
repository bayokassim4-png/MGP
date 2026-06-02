# Audit de cohérence documentaire - MGP

Ce rapport compare les documents suivants :
- `docs/cahier-des-charges.md`
- `docs/modules.md`
- `docs/modele-donnees.md`
- `docs/architecture.md`
- `docs/roadmap-v1.md`
- `docs/screens.md`

Il identifie les incohérences, doublons, écrans manquants, tables manquantes, relations manquantes et permissions manquantes.

---

## 1. Synthèse générale

Les documents partagent une vision commune de MGP autour des thèmes suivants :
- gestion de projets multi-projets et organisations
- cadre logique (logframe)
- PTBA
- budget et suivi financier
- marchés publics
- gestion des risques
- rôles et utilisateurs
- reporting / tableau de bord

Les principales divergences concernent la couverture du module d’organisation, la modélisation de PTBA, le traitement des marchés publics et la structuration des permissions.

---

## 2. Incohérences détectées

### 2.1. Organisation et administration
- `architecture.md` décrit une entité `Organisation` et un module d’administration d’organisation.
- `roadmap-v1.md` ne définit pas de phase dédiée à la gestion des organisations, juste une mention optionnelle en phase 1.
- `screens.md` inclut des écrans `Organisation` et `Gestion des organisations` sans qu’ils apparaissent clairement dans la feuille de route.

### 2.2. PTBA
- `roadmap-v1.md` définit des tables `PTBA` et `PTBALine`.
- `modele-donnees.md` implémente le PTBA via l’entité `Composante` sans présenter de modèle explicite `PTBA`/`PTBALine`.
- `architecture.md` ne cite pas de module PTBA explicite côté backend/frontend.

### 2.3. Marchés publics
- `roadmap-v1.md` propose une table `Vendor`/`Supplier` optionnelle.
- `modele-donnees.md` ne contient pas d’entité séparée `Vendor`/`Supplier`, mais un champ `fournisseur` dans `Marché Public`.
- `screens.md` parle de marchés publics mais ne précise pas la gestion des fournisseurs.

### 2.4. Risques et mitigation
- `roadmap-v1.md` prévoit une API de mitigation distincte (`/risks/:riskId/mitigations`).
- `modele-donnees.md` stocke l’atténuation dans le champ `strategie_attenuation` de l’entité `Risque`, sans entité de mitigation séparée.

### 2.5. Reporting
- `screens.md` positionne un module `Reporting` clair.
- `modules.md` ne mentionne pas un module de reporting dédié, ce qui crée un flou sur la place du reporting dans l’architecture fonctionnelle.
- `cahier-des-charges.md` ne détaille pas explicitement des besoins de reporting ou de dashboard, alors que ces aspects sont présents dans `architecture.md`, `roadmap-v1.md` et `screens.md`.

### 2.6. Nommage et vocabulaire
- `roadmap-v1.md` utilise à la fois `UserRole`, `ProjectUser`, `ProjetUtilisateur` et `Role`.
- `modele-donnees.md` parle de `ProjetUtilisateur`, alors que la roadmap utilise des variantes anglo-françaises.
- `architecture.md` cite `Market` et `Risk` tandis que le modèle de données emploie `Marché Public` et `Risque`.

---

## 3. Doublons observés

### 3.1. Contenu redondant
- `overview` des modules est répété dans `modules.md`, `architecture.md` et `roadmap-v1.md`.
- Les descriptions de `Logframe`, `Budget`, `Marchés publics` et `Risques` apparaissent dans plusieurs documents sans harmonisation complète.

### 3.2. Écrans et APIs
- `roadmap-v1.md` et `screens.md` listent des écrans très similaires pour l’authentification, les projets, les utilisateurs et les modules métier.
- La liste d’API de `roadmap-v1.md` redouble certaines sections déjà implicites dans `architecture.md`.

### 3.3. Tables et entités
- `modele-donnees.md` et `roadmap-v1.md` couvrent les mêmes entités métier avec des désignations différentes.
- La description des permissions et des rôles est présente dans `architecture.md`, `roadmap-v1.md` et `screens.md`.

> Impact : ces doublons ne sont pas bloquants, mais ils augmentent le risque d’incohérence si les documents évoluent séparément.

---

## 4. Écrans manquants

### 4.1. Écrans identifiés comme absents ou insuffisamment couverts
- `Gestion des organisations` : présent dans `screens.md`, absent de la roadmap détaillée.
- `Historique des actions (audit)` : mentionné dans `screens.md` mais pas dans la roadmap ni le modèle de données.
- `Reporting multi-projets` : `screens.md` parle de reporting projet, mais il manque un écran global de type `Tableau de bord global multi-projets` clairement lié à l’architecture.

### 4.2. Écrans à préciser
- Écrans `Paramètres de projet` et `Paramètres organisation` ne sont pas explicitement listés même s’ils sont implicites dans les fonctionnalités d’administration.
- `Gestion des fournisseurs / prestataires` : attendu côté marchés publics, mais absent de la liste d’écrans.
- `Pages de détail des indicateurs` : `roadmap-v1.md` évoque des pages de détail pour objectifs, résultats, activités, indicateurs, mais `screens.md` ne liste pas explicitement d’écran distinct pour les indicateurs.

---

## 5. Tables manquantes

### 5.1. Entités manquantes ou non alignées
- `Vendor` / `Supplier` : suggérée dans `roadmap-v1.md`, non modélisée dans `modele-donnees.md`.
- `RiskMitigation` : implicite dans l’API de `roadmap-v1.md`, absent du modèle de données.
- `AuditLog` ou `ActionHistory` : mentionné dans `screens.md` mais non présent dans le modèle.

### 5.2. Modèles partiels ou fusionnés
- `PTBA` / `PTBALine` : la roadmap les attend comme entités distinctes, alors que le modèle de données les fusionne dans `Composante`.
- `Indicator` : la roadmap les traite comme entité séparée, alors que le modèle de données les intègre dans les attributs de `Logframe`.

---

## 6. Relations manquantes

### 6.1. Relations attendues mais non explicites
- Relation `Marché Public` ⇄ `Vendor/Supplier` si la fonctionnalité de fournisseurs est développée.
- Relation séparée `Risque` ⇄ `RiskMitigation` pour prendre en charge l’API dédiée aux mesures de mitigation.
- Relation `Organisation` ⇄ `Role` ou `Organisation` ⇄ `AdminUtilisateur` pour clarifier le scope global vs projet.

### 6.2. Relations partielles ou sous-dimensionnées
- `PTBA` n’est pas formalisé en relation distincte de `Projet`, ce qui rend la trace entre planning et logframe moins directe.
- `Reporting` n’a pas de support de données dédié, ce qui signifie que les rapports doivent être dérivés de plusieurs tables sans modèle documentaire clair.

---

## 7. Permissions manquantes

### 7.1. Permissions non couvertes ou floues
- Permissions globales d’organisation : `Gestion des organisations` est listée, mais les droits par rôle ne sont pas détaillés.
- Permissions de `Historique des actions` / audit : absence totale de définition ar rôle.
- Permissions fines pour la création / édition de marchés publics et budgets : `screens.md` laisse des `Oui*` imprécis pour `Financier` et `Éditeur`.
- Permissions pour les écrans `Export / impression de rapports` : listées comme `Oui*` sans règles claires.

### 7.2. Permissions attendues par les documents mais non listées
- `Admin` global vs `Admin` projet : distinction non formalisée dans le modèle de rôles.
- Paramètres de projet vs paramètres organisation : permissions non séparées.
- Droits en lecture seule pour les utilisateurs invités / externes : mentionnés par le rôle `Lecteur`, mais sans scénario précis.

---

## 8. Recommandations

### 8.1. Harmoniser le vocabulaire
- Normaliser les noms d’entités entre les documents : `ProjetUtilisateur` / `ProjectUser` / `UserRole`.
- Choisir une convention unique pour les modules métier et les noms de tables.

### 8.2. Compléter le modèle de données
- Ajouter une entité `Vendor` / `Supplier` si la fonctionnalité marchés publics doit gérer des prestataires.
- Ajouter une entité `RiskMitigation` si l’API de mitigation distincte est conservée.
- Formaliser `PTBA` / `PTBALine` si l’on souhaite conserver l’approche roadmap.
- Ajouter une entité `AuditLog` si l’historique des actions est effectivement requis.

### 8.3. Aligner les documents
- Ajouter une phase ou un point de roadmap dédié à la gestion des organisations.
- Mettre à jour `architecture.md` pour y intégrer explicitement le module PTBA.
- Préciser `modules.md` pour inclure le reporting comme module fonctionnel si le reporting est stratégique.

### 8.4. Renforcer les permissions
- Définir clairement les permissions du rôle `Financier` vs `Éditeur` pour les modules budget, marchés et PTBA.
- Documenter les permissions d’administration d’organisation et d’audit.
- Clarifier l’accès aux exports et aux rapports par rôle.

---

## 9. Conclusion

Le corpus documentaire est globalement cohérent autour des grands domaines fonctionnels de MGP, mais plusieurs points de structuration et de modélisation doivent être alignés pour éviter des écarts lors du développement.

Les priorités d’ajustement sont :
1. la gestion des organisations et des permissions associées,
2. la formalisation du PTBA et du modèle marchés publics,
3. la cohérence des entités de gestion des risques,
4. l’harmonisation des écrans de reporting et d’audit.
