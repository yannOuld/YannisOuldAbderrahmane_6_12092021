---
presentation:
  theme: beige.css
  progress: true
  slideNumber: true
  history: true
  keyboard: true
  
  
---
<!-- slide -->
# Projet 6
# Construire une API sécurisée
par **Yannis Ould Abderrahmane**

<!-- slide -->
## Fonctionnement  de l'API
- Server.js >
- app.js >
- Routes >
- Middleware / Controllers >
- Models 

<!-- slide -->
### Base de Données

- MongoDB Atlas 
les configurations de connection sont dans sur un fichier auths.config.js present uniquement sur mon ordinateur pour plus de securité

<!-- slide -->
### Cross-Origin Ressources Sharing (CORS)
-  Nodes Packages Manager Cors

appel des middleware du npm avec un app.use dans le fichier app.js
le cors va gèrer les authorisations et l'accès entre un Frontend et un Backend qui ne partagent pas la même source

<!-- slide -->
### Helmet

- Helmet est un nodes packages manager qui améliore la securité et bloque la plupart des attaques XSS de redirections vers des sites tiers tout en controlant les noms de domaines et empêchant les fuites de données sensibles sur l'application 



<!-- slide -->
### Fonction de Server.js

- Trouver un port de connection valide
- parametrer le port avec express
- gerer les erreurs de connection au port 
- crée un server à l'ecoute de l'application app.js
- écoutes des requetes 

<!-- slide -->
### Fonction de app.js

- utiliser les packages nécessaire (express, bodyparser, helmet ... )
- mettre en place l'interaction entre le backend et le frontend avec le cors
- trouver les routes utilisés par l'application
- mettre en place la sécuritée 

<!-- slide -->
### Routes

 Prends en charge de trouver les elements nécessaires aux requêtes :
- les URI correspondantes 
- les appels de l'authentification sur les requêtes des sauces avec auth.js 
- les appels de multer pour la creation et la modification d'une sauce  avec multer-configs.js
- ainsi que les appels aux controllers contenant la logique pour chaque requêtes

<!-- slide -->
### Multer

- Multer est un nodes packages manager qui permet le telechargement de fichier pour une base de données.
Il est ici utiliser pour permettre aux utilisateurs de mettre une image avec le contenu qu'ils veulent poster

<!-- slide -->
### Controllers Users

- Un module signup pour s'inscrire sur la base de données 
ce module prends en compte un hash du mot de passe avec le npm bcrypt et 10 tours de cryptages, ainsi qu'un modele User.

- Un module login de connection qui va comparer les hash des mots de passe avec bcrypt ainsi que fournir avec une clé secrete (mise dans un .env) un Token d'identification avec jsonwebtoken qui sera valide 24h

<!-- slide -->
### bcrypt

Bcrypt est un npm qui va crypter une chaine de charactère avec une clée de cryptage connu uniquement de l'algorithme de bcrypt avec le choix du nombre de fois que l'on souhaite crypter cette donnée. 

<!-- slide -->
### JsonWebToken

JWT est un npm utilisé pour fournir un id à un utilisateur et ainsi permettre la mise en place des authorisations sur un site (ex: eviter qu'un utilisateur qui n'en a pas le droit modifie un contenu qui ne lui appartient pas)

<!-- slide -->
### Controllers Sauces

Create Read Update Delete (CRUD)

- Un module pour crée une sauce 
- Un module pour obtenir toute les sauces sur l'index
- Un module pour obtenir une sauce en particulier
- Un module pour modifié / mettre a jour une sauce
- Un module pour supprimer une sauce 
- Un module pour poster des likes ou dislikes sur une sauce 

<!-- slide -->
### Models

Mongoose est un npm qui va permettre aux données de s'incorporer dans la base MongoDB

- Un schema Mongoose pour le modele de sauce comprenant tout les elements composant une sauce ainsi que leurs types ( String , Number...)

- Un schema Mongoose pour le modele user avec l'utilisation du npm mongoose-unique-validator afin de verifier que l'email n'est pas déja utilisée

