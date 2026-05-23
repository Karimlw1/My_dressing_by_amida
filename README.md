My Dressing by Amida

Application e-commerce simple développée avec Node.js et Express, incluant un panneau d’administration pour la gestion des produits, l’upload d’images via Cloudinary, la sauvegarde locale des données et la synchronisation avec GitHub. Le projet est déployable sur Render.

Présentation du projet

Ce projet permet de :

Afficher des produits sur un site vitrine

Ajouter et supprimer des produits via une interface administrateur

Uploader des images produits sur Cloudinary

Sauvegarder les données produits dans un fichier JSON

Synchroniser automatiquement les produits avec un dépôt GitHub

Télécharger les données produits depuis le serveur Render

Créer et consulter des commandes simples

*** Stack technique

Node.js

Express

Cloudinary (gestion des images)

Multer (upload de fichiers)

Octokit (API GitHub)

Render (hébergement)

HTML, CSS, JavaScript (frontend)

Structure du projet
.
├── server.js
├── products.json
├── orders.json
├── package.json
├── public/
│   ├── index.html
│   ├── admin.html
│   ├── filter.js
│   └── ...
└── .env (local uniquement)

??? Prérequis

Node.js (version 18 ou supérieure recommandée)

Un compte Cloudinary

Un compte GitHub

Un compte Render

Variables d’environnement

Créer un fichier .env en local (ne pas versionner ce fichier sur GitHub) :

PORT=3000

ADMIN_KEY=****

CLOUDINARY_CLOUD_NAME=xxxx
CLOUDINARY_API_KEY=xxxx
CLOUDINARY_API_SECRET=xxxx

GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxx

Détails
Variable	Description
ADMIN_KEY	Clé utilisée pour sécuriser les routes admin
CLOUDINARY_*	Identifiants Cloudinary pour l’upload d’images
GITHUB_TOKEN	Token GitHub avec permissions repo
PORT	Port du serveur en local
Installation et lancement en local
npm install
node server.js


Accès locaux :

http://localhost:3000
http://localhost:3000/admin.html

Déploiement sur Render

Pousser le projet sur GitHub

Créer un nouveau Web Service sur Render

Connecter le dépôt GitHub

Définir les commandes :

-- Build command :

npm install


Start command :

node server.js


Ajouter toutes les variables d’environnement dans Render (sans fichier .env)

Téléchargement des données depuis Render

Endpoint protégé :

GET /admin/download-products
Header: x-admin-key: ADMIN_KEY


Cette fonctionnalité permet de récupérer le fichier products.json depuis l’interface admin pour sauvegarde locale ou versionnement manuel sur GitHub.

Gestion du stockage sur Render

Render utilise un stockage éphémère.
Les données locales peuvent être perdues lors d’un redéploiement.

Stratégie adoptée :

Sauvegarde locale dans products.json

Synchronisation automatique vers GitHub

Téléchargement manuel possible depuis l’interface admin

Bonne pratique :
Télécharger régulièrement products.json et le versionner dans le dépôt GitHub.

Suppression d’un produit

Endpoint :

DELETE /admin/delete-product/:id
Header: x-admin-key: ADMIN_KEY


Cette fonctionnalité est intégrée dans admin.html via un champ de saisie d’ID et un bouton de suppression.

Sécurité

Ce projet est un prototype (MVP) et n’est pas prêt pour un usage en production.

Limites connues :

Clé admin exposée côté frontend

Absence d’authentification utilisateur réelle

Stockage des données dans des fichiers JSON

Pas de validation avancée des entrées

Pas de base de données

Pistes d’amélioration

Authentification admin sécurisée

Base de données (MongoDB, PostgreSQL, Supabase)

Interface admin avec liste et édition des produits

Gestion de stock

Historique des commandes

Gestion des rôles utilisateurs

Dépannage
Erreur “Accès refusé”

Vérifier que :

ADMIN_KEY côté Render correspond à celui utilisé dans admin.html

Le header est bien envoyé :

headers: { "x-admin-key": ADMIN_KEY }

Problème d’upload Cloudinary

Vérifier les identifiants Cloudinary dans les variables d’environnement Render.

Problème de synchronisation GitHub

Vérifier :

Le token GitHub est valide

Les permissions repo sont activées

Le nom du dépôt, du owner et de la branche sont corrects

Auteur

Projet développé par karim 
Intégration et backend par Karim

Cliente: AMIDA 