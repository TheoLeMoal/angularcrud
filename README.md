# Angularcrud

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.8.

## Introduction

Cette application Angular est un projet CRUD (Create, Read, Update, Delete) permettant de gérer une liste de produits. Elle utilise Angular pour le frontend, json-server pour la gestion des produits, et Bootstrap 5 pour la mise en page.

## Prérequis

Avant de démarrer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- Node.js
- Angular CLI 
- Json-server

## Installation

Clonez le dépôt sur votre machine locale :

```bash
git clone https://github.com/TheoLeMoal/angularcrud.git
cd votre-repo
npm i
```

## Backend 

Pour lancer le serveur JSON, assurez-vous d'être dans le répertoire contenant le fichier `db.json` :

```bash
npx json-server db.json
```

## Serveur de développement
Assurez-vous d'être à la racine du projet pour lancer le serveur Angular :

```bash
ng serve
```
Accédez à l'application sur « http://localhost:4200/ ».

## Choix techniques

- Bootstrap : Bootstrap a été intégré pour créer une interface utilisateur responsive et moderne, notamment pour les boutons, les cartes de produits et les modales.

- Modale de confirmation : Pour la suppression et la modification des produits, une modale Bootstrap a été implémentée pour demander une confirmation à l'utilisateur. Cela permet d'éviter les suppressions ou modifications accidentelles.

### Intégration des modales

Lors de l'intégration des modales, j'ai rencontré quelques difficultés pour les faire fonctionner correctement. Pour résoudre ce problème, j'ai ajouté deux attributs au bouton :

- `data-bs-toggle="modal"`
- `data-bs-target="#nom de la modale"`

De plus, j'ai ajouté le fichier JavaScript de Bootstrap dans angular.json pour s'assurer que les fonctionnalités JavaScript de Bootstrap soient correctement chargées :

```json
    "scripts": [
        "node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"
    ]
```
J'ai également ajouté un événement `click` pour lancer une fonction qui modifie une variable. Cette variable, si elle est `null` ou `false`, empêche la validation des modifications. Cela oblige l'utilisateur à passer par la modale pour confirmer les suppressions ou modifications.

##Explication du Code
###Fonction `register()`
- Mise à Jour du Produit : La fonction vérifie si on est passé par la modale et ensuite si un produit est chargé et si celui-ci a un identifiant. Si ces conditions sont satisfaites, la fonction appelle le service `productsService` pour mettre à jour le produit via la méthode `patchProduct`.
`patchProduct` envoie une requête HTTP PATCH pour mettre à jour partiellement les détails d'un produit existant.

###Fonction `handleDeleteProduct()`
- Suppression du Produit : La fonction commence par vérifier si un identifiant de produit à supprimer est défini et si on est passé par la modale et ensuite elle appelle le service `productsService` pour supprimer le produit via la méthode `deleteProduct`, en passant l'identifiant du produit à supprimer.
`deleteProduct` envoie une requête HTTP DELETE pour supprimer un produit spécifique par son ID.
