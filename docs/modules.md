# Modules du Système - Matrice de Gestion de Projet

## Vue d'Ensemble

La Matrice de Gestion de Projet est structurée en **5 modules fonctionnels** qui forment un système cohérent de pilotage, chacun traitant un aspect complémentaire de la gestion de projet.

---

## Module 1 : CADRE LOGIQUE (LOGFRAME)

### Objectif du Module
Établir la théorie du changement du projet et définir les résultats attendus selon la méthodologie LOGFRAME standard du Groupe Banque Mondiale.

### Rôle Métier
Fournir une vision stratégique et logique du projet en articulant les niveaux d'intervention hiérarchiques (impact, effets, extrants, activités) avec leurs indicateurs mesurables.

### Structure des Données

| Niveau | Définition | Exemple |
|--------|-----------|---------|
| **Objectif Global (Impact)** | Changement socio-économique long terme | Réduction de la pauvreté via accès à l'eau |
| **Objectif Spécifique (Effets)** | Résultat immédiat à moyen terme du projet | 80% de taux d'accès à l'eau potable |
| **Résultats (Extrants/Outputs)** | Biens ou services produits directement | 50 forages construits |
| **Activités** | Actions à mener pour produire les outputs | Études, forage, formation |

### Colonnes Clés
1. **Niveau d'intervention** : Classification de la logique (Impact, Effets, Extrants, Activités)
2. **Indicateurs (IOV)** : Indicateurs mesurables (Input, Output, Outcome, Impact)
3. **Ligne de base (Baseline)** : Valeur initiale avant le projet
4. **Cible visée** : Valeur objectif à atteindre
5. **Source de vérification** : Où et comment vérifier l'atteinte de la cible
6. **Hypothèses & Risques** : Hypothèses externes et risques identifiés

### Relations avec Autres Modules
- **Vers PTBA** : Les activités du LOGFRAME sont détaillées et planifiées trimestriellement
- **Vers Risques** : Les hypothèses et risques du LOGFRAME sont évalués dans la matrice des risques
- **Vers Marchés** : Les activités générent des marchés publics

### Données Actuelles
- 4 niveaux d'intervention
- 6 indicateurs ou hypothèses définis
- Source : Projet d'accès à l'eau potable

---

## Module 2 : PTBA (Plan de Travail et Budgets Annuels)

### Objectif du Module
Détailler le calendrier d'exécution du projet par composante et trimestre, en articulant le timing avec les ressources humaines et les budgets.

### Rôle Métier
Assurer un planning opérationnel réaliste et coordonné, permettant :
- Allocation claire des responsabilités
- Calendrier trimestrial cohérent
- Prévision budgétaire par période

### Structure des Données

| Colonne | Objectif |
|---------|----------|
| **Code** | Identifiant unique de la composante ou activité |
| **Composante/Activité** | Intitulé de l'action à mener |
| **Responsable** | Personne ou entité responsable de l'exécution |
| **Q1, Q2, Q3, Q4** | Marquage (X) indiquant l'activité durant le trimestre |
| **Budget Prévu** | Montant budgétaire alloué |

### Exemple d'Articulation
```
Composante 1.0 : Infrastructures en eau (Budget 500 000)
  ├─ 2026-01-01 : Études topographiques (Q1) - Cabinet externe - 50 000
  ├─ 2026-02-01 : Forage et installation (Q2, Q3) - Entreprise BTP - 400 000
  └─ 2026-03-01 : Formation des comités (Q4) - Expert Social - 50 000
```

### Relations avec Autres Modules
- **À partir de** : LOGFRAME (définit les activités)
- **Vers** : BUDGET & SUIVI FINANCIER (détaille les rubriques budgétaires)
- **Vers** : PLAN DE PASSATION DES MARCHÉS (identifie les marchés à lancer)
- **Vers** : MATRICE DES RISQUES (associe responsables et délais)

### Données Actuelles
- 1 composante principale (Infrastructures en eau)
- 4 activités/sous-composantes
- Couverture : 2026 (4 trimestres)
- Budget total : 500 000

---

## Module 3 : BUDGET ET SUIVI FINANCIER

### Objectif du Module
Décomposer et suivre les budgets par rubrique de dépenses, avec traçabilité du financement (bailleur vs contrepartie).

### Rôle Métier
Fournir la granularité budgétaire nécessaire pour :
- Justifier chaque euro dépensé
- Tracer le financement bailleur et contrepartie
- Permettre l'audit et le suivi comptable

### Structure des Données

| Colonne | Définition |
|---------|-----------|
| **Rubrique Budgétaire** | Classification comptable (Équipements, Fonctionnement, etc.) |
| **Unité** | Unité de mesure (Unité, Litre, etc.) |
| **Quantité** | Nombre d'unités |
| **Coût Unitaire** | Montant par unité |
| **Coût Total** | Quantité × Coût Unitaire |
| **Financement Bailleur** | Part financée par le bailleur |
| **Contrepartie (État)** | Part financée par l'État/contrepartie nationale |

### Hiérarchie Comptable
```
1. ÉQUIPEMENTS (Catégorie)
   ├─ 1.1 Pompes solaires (Ligne) : 50 unités × 5 000 = 250 000
2. FONCTIONNEMENT (Catégorie)
   ├─ 2.1 Carburant véhicules (Ligne) : 10 000 litres × (coût unitaire) = 15 000
```

### Relations avec Autres Modules
- **À partir de** : PTBA (montants budgétaires des activités)
- **Vers** : AUDIT ET CONFORMITÉ (justification des dépenses)
- **Vers** : RAPPORT FINANCIER (consolidation des dépenses)

### Données Actuelles
- 4 rubriques ou sous-rubriques
- Coûts totaux consolidés
- Financement : Bailleur + Contrepartie

---

## Module 4 : PLAN DE PASSATION DES MARCHÉS (PPM)

### Objectif du Module
Orchestrer les achats publics en spécifiant la méthode, le calendrier et le montant de chaque marché.

### Rôle Métier
Assurer la conformité réglementaire et la transparence des approches publiques, en détaillant :
- Type de marché (Travaux, Services, Fournitures)
- Méthode de passation (AOI, Sélection Qualité-Coût, etc.)
- Calendrier de notification et de signature
- Montant estimé pour budgétisation

### Structure des Données

| Colonne | Signification |
|---------|---------------|
| **Description du Marché** | Intitulé du marché |
| **Type** | Travaux / Services / Fournitures / Consultants |
| **Méthode** | Appel d'Offres International, Sélection Qualité-Coût, etc. |
| **Revue** | A priori (avant) / A posteriori (après exécution) |
| **Date prévue Avis** | Date prévue de publication de l'avis |
| **Date signature contrat** | Date prévue de signature |
| **Montant Estimé** | Budget associé au marché |

### Exemples Actuels
1. **Construction de 50 forages**
   - Type : Travaux
   - Méthode : Appel d'Offres International
   - Avis prévu : 15 janvier 2026
   - Signature : 30 mars 2026
   - Montant : 400 000

2. **Audit financier du projet**
   - Type : Services de consultants
   - Méthode : Sélection Fondée sur Qualité et Coût
   - Avis prévu : 1er septembre 2026
   - Signature : 15 novembre 2026
   - Montant : 30 000

### Relations avec Autres Modules
- **À partir de** : PTBA (activités à mettre en œuvre)
- **À partir de** : BUDGET & SUIVI (montants à engager)
- **Vers** : CONFORMITÉ RÉGLEMENTAIRE (traçabilité légale)
- **Vers** : AUDIT (justification des marchés)

### Données Actuelles
- 2 marchés publics majeurs
- Calendrier chevauchant 2026
- Montants cohérents avec budget total

---

## Module 5 : MATRICE DES RISQUES

### Objectif du Module
Identifier, évaluer et planifier l'atténuation des risques susceptibles de compromettre le succès du projet.

### Rôle Métier
Établir un cadre de gestion des risques permettant :
- Priorisation des risques par criticité
- Attribution des responsabilités
- Suivi des mesures d'atténuation

### Méthodologie d'Évaluation

**Criticité = Probabilité × Impact**

| Niveau | Probabilité | Impact | Criticité (P×I) |
|--------|-------------|--------|-----------------|
| 1 (Faible) | 1/3 | 1/3 | 1-2 (Faible) |
| 2 (Moyen) | 2/3 | 2/3 | 3-4 (Moyen) |
| 3 (Fort) | 3/3 | 3/3 | 6-9 (Élevé) |

### Structure des Données

| Colonne | Définition |
|---------|-----------|
| **Catégorie** | Type de risque (Fiduciaire, Opérationnel, Social, Politique, etc.) |
| **Description du Risque** | Intitulé explicite du risque |
| **Probabilité** | Évaluation 1-3 de la probabilité d'occurrence |
| **Impact** | Évaluation 1-3 de l'impact si survenance |
| **Criticité** | Produit P × I, indicatif de la priorité |
| **Stratégie d'atténuation** | Actions préventives ou correctives |
| **Responsable** | Personne/entité en charge de l'atténuation |

### Risques Identifiés

#### Risque 1 : Déviation Fiduciaire (Criticité : 3)
- **Probabilité** : Faible (1)
- **Impact** : Fort (3)
- **Stratégie** : Audits annuels, manuel de procédures strict
- **Responsable** : Spécialiste Financier

#### Risque 2 : Retard Opérationnel (Criticité : 6)
- **Probabilité** : Fort (3)
- **Impact** : Moyen (2)
- **Stratégie** : Pénalités contractuelles, suivi hebdomadaire
- **Responsable** : Chef de Projet

### Relations avec Autres Modules
- **À partir de** : LOGFRAME (hypothèses et risques)
- **À partir de** : PTBA (calendrier d'exécution)
- **Vers** : COMITÉ DE PILOTAGE (révision trimestrielle)

### Données Actuelles
- 2 risques majeurs identifiés
- Criticité variant de 3 à 6
- Responsables clairement assignés

---

## 6. Architecture d'Intégration des Modules

```
CADRE LOGIQUE (Théorie du changement)
         ↓
         ├─→ PTBA (Planification opérationnelle)
         │    ↓
         │    ├─→ BUDGET & SUIVI (Granularité comptable)
         │    │
         │    └─→ PLAN PASSATION DES MARCHÉS (Mise en œuvre)
         │         ↓
         │         └─→ BUDGET & SUIVI (Suivi exécution)
         │
         └─→ MATRICE DES RISQUES (Gestion des incertitudes)
              ↓
         ┌────┴────┐
         ↓         ↓
    PTBA (calendrier)  BUDGET & SUIVI (montants)
         ↓         ↓
    Ajustements iteratifs
```

---

## 7. Flux de Travail Recommandé

1. **Initialisation** : Remplir le CADRE LOGIQUE (vision stratégique)
2. **Planification** : Élaborer le PTBA (calendrier détaillé)
3. **Budgétisation** : Détailler le BUDGET & SUIVI FINANCIER
4. **Marchés** : Définir le PLAN DE PASSATION DES MARCHÉS
5. **Risques** : Construire la MATRICE DES RISQUES
6. **Suivi** : Réviser cycliquement tous les modules (trimestriel)

---

## 8. Utilisateurs et Rôles

| Rôle | Modules utilisés | Fréquence d'accès |
|------|------------------|-------------------|
| Chef de Projet | Tous | Permanent |
| Ingénieur Chef | LOGFRAME, PTBA, Risques | Hebdo/Mensuel |
| Spécialiste Financier | Budget, PPM, Risques | Mensuel |
| Bailleur | LOGFRAME, PTBA, Budget | Trimestriel |
| Audit externe | Budget, PPM, Risques | Ad hoc |
