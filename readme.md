# Kelkalor Responsive Map

 - [Fonctionnalités](#Fonc)
  - [Carte](#Carte)
  - [Zone d'Information](#Info)
    - [Nations](#Nations)
    - [Cités](#Cities)
    - [Affichage](#Aff)
  - [Zone d'Administration](#Admin)
 - [Installation](#Install)
 - [A faire](#Todo)

<a name="Fonc"/>
## Fonctionnalités

<a name="Carte"/>
### Carte

La carte est composée :

 - D'un layer "Fond de Carte" en png en jpg. Juste les terres, mers, reliefs. 
 - Ensuite un layer "Hexagones" calculé à la volée, masquable. Ce est celui qui porte les informations d'appartenance à une nation. Par défaut, il est limité aux terres, mais peut être étendu aux zones maritimes.
 - Un layer Cités, masquable. (Les icônes sont en Png)

Sur la carte, on peut :

 - zoomer/dézoomer en utilisant la roulette de la souris,
 - survoler une nation pour la mettre en surbrillance,
 - survoler une cité pour la mettre en sur surbrillance.

> **Il manque :**

> - La possibilité de déplacer la carte par drag'n'drop.

<a name="Info"/>
### Zone d'Information

<a name="Nations"/>
#### Nations

Cette zone liste les différentes Nations. Elle donne accès à certains éléments particulier.

 - /!\ L'icône **Globe** affiche la vue synthétique, chaque nation étant représentée par sa couleur  ,
 - L'icône **Filtre** permet de filtrer la liste des Nations,
 - L'icône **Plein Ecran** pour réinitialiser le zoom.

Sur la liste, on peut :

 - survoler la liste pour mettre en surbrillance la Nation sur la carte,
 - zoomer sur une Nation avec l'icône**Loupe**,
 - punaiser une Nation en cliquant sur son nom.

> **Il manque :**

> - La possibilité de trier les Nations selon divers critères.

<a name="Cities"/>
#### Cités

Cette zone liste les différentes Cités.

 - L'icône **Tri** permet d'ordonner les cités suivant leur nom, ou leur taille,
 - L'icône **Filtre** permet de filtrer la liste des Cités.

Sur la liste, on peut :

 - survoler la liste pour mettre en avant la Cité sur la carte.

> **Il manque :**

> - La possibilité de centrer la carte sur une Cité.  

<a name="Aff"/>
#### Affichage

La **Rose des Vents** permet de zoomer et de déplacer la carte, en cliquant sur ses branches ou son centre.

Les **Layers** peuvent afficher/cacher :

 - Le Fond de Carte,
 - Les Hexagones (_ie_ les Nations),
  - C'est ici que l'on peut restreindre (ou non) les hexagones aux zones terrestres,
 - Les Cités.

La **Taille de la Carte** peut être ajustée ( 640x640 pixels, 800x800 pixels ou 980x980 pixels).

> **Il manque :**

> - Les ressources,
> - Un récap des informations de la Nation, **_(en cours)_**
> - Un layer Annotations, masquable. (Vecto, c'est du texte)

<a name="Admin"/>
### La Zone admin

 :lock: Cette zone est limité aux administrateurs de la carte.

> **Il manque :**

> - Les gestions des cités et des ressources.  
 
<a name="Install"/>
## Installation ##
    npm install
    gulp prod
    cd bin
    firebase login
    firebase deploy

<a name="Todo"/>
## A faire

> - Vérifier le fonctionnement des naviguateurs suivants : 
   - FireFox
   - Google Chrome
   - ~~Internet Explorer~~
   - Opera
   - Safari
   - SeaMonkey
   - Vivaldi
