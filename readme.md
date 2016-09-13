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
 - Ensuite un layer "Hexagones" calculé à la volée, masquable. C'est celui qui porte les informations d'appartenance à une _Nation_. Par défaut, il est limité aux terres, mais peut être étendu aux zones maritimes.
 - Un layer _Cités_, masquable. (Les icônes sont en Png)

Sur la carte, on peut :

 - zoomer/dézoomer en utilisant la roulette de la souris,
 - survoler une _Nation_ pour la mettre en surbrillance,
 - survoler une _Cité_ pour la mettre en sur surbrillance.

> **Il manque :**

> - La possibilité de déplacer la carte par drag'n'drop.

<a name="Info"/>
### Zone d'Information

<a name="Nations"/>
#### _Nations_

Cette zone liste les différentes _Nations_. Elle donne accès à certains éléments particulier.

 - /!\ L'icône **Globe** affiche la vue synthétique, chaque _Nation_ étant représentée par sa couleur  ,
 - L'icône **Filtre** permet de filtrer la liste des _Nations_,
 - L'icône **Plein Ecran** pour réinitialiser le zoom.

Sur la liste, on peut :

 - survoler la liste pour mettre en surbrillance la _Nation_ sur la carte,
 - zoomer sur une _Nation_ avec l'icône **Loupe**,
 - punaiser une _Nation_ en cliquant sur son nom. Un récap des informations de la _Nation_ est alors affiché.

> **Il manque :**

> - La possibilité de trier les _Nations_ selon divers critères **_(en cours)_**.

<a name="Cities"/>
#### _Cités_

Cette zone liste les différentes _Cités_.

 - L'icône **Tri** permet d'ordonner les _Cités_ suivant leur nom, ou leur taille,
 - L'icône **Filtre** permet de filtrer la liste des _Cités_.

Sur la liste, on peut :

 - survoler la liste pour mettre en avant la _Cité_ sur la carte.

> **Il manque :**

> - La possibilité de centrer la carte sur une _Cité_.  

<a name="Aff"/>
#### Affichage

La **Rose des Vents** permet de zoomer et de déplacer la carte, en cliquant sur ses branches ou son centre.

Les **Layers** peuvent afficher/cacher :

 - Le Fond de Carte,
 - Les Hexagones (_ie_ les _Nations_),
  - C'est ici que l'on peut restreindre (ou non) les hexagones aux zones terrestres,
 - Les _Cités_.

La **Taille de la Carte** peut être ajustée ( 640x640 pixels, 800x800 pixels ou 980x980 pixels).

> **Il manque :**

> - Les ressources,
> - Un récap des informations de la _Nation_, **_(en cours)_**
> - Un layer Annotations, masquable. (Vecto, c'est du texte)

<a name="Admin"/>
### La Zone admin

 :lock: Cette zone est limité aux administrateurs de la carte.

> **Il manque :**

> - Les gestions des _Cités_ et des ressources.  
 
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
