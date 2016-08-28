# Kelkalor Responsive Map #
La carte interactive pour Kelkalor.

## Fonctionnalités ##

### Eléments graphiques ###
 - D'abord, un layer "Fond de Carte" en png en jpg. Juste les terres, mers, reliefs. 
 - Ensuite un layer "Hexagones" calculé à la volée, masquable. Ce layer sera celui qui portera les informations d'appartenance à une nation.
 - Un layer Cités, masquable. (Png)

### Eléments d'information ###
 - Une zone qui donne les infos de l'hexagone sélectionné.
le cas échéant, les infos de la nation à qui il appartient (dans ce cas, la nation est en surbrillance)
 - des éléments pour zoom/pan 
 - des éléments pour masquer les layers 
 
### A faire ###
 - Un layer Ressources, masquable. (Png)
 - Un layer Annotations, masquable. (Vecto, c'est du texte)

## Installation ##
    npm install
    gulp prod
    cd bin
    firebase login
    firebase deploy

