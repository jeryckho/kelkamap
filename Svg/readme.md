# Kelkalor Responsive Map #
La carte interactive pour Kelkalor.

## Fonctionnalités ##

### Eléments graphiques ###
 - D'abord, un layer "Fond de Carte" en png en jpg. Juste les terres, mers, reliefs. 
 - Ensuite un layer "Hexagones" calculé à la volée, masquable. Ce layer sera celui qui portera les informations d'appartenance à une nation.
 - Un layer Cités, masquable. (Png)
 - Slider pour réduire la taille de carte
 - l'Administration des Nations

### Eléments d'information ###
 - Une zone qui donne les infos de l'hexagone sélectionné.
le cas échéant, les infos de la nation à qui il appartient (dans ce cas, la nation est en surbrillance)
 - des éléments pour zoom/pan (Rose des vents)
 - des éléments pour masquer les layers 
 - Zoom direct sur la carte avec MouseWheel
 
### A faire ###
 - Un layer Ressources, masquable. (Png)
 - Un layer Annotations, masquable. (Vecto, c'est du texte)
 - l'Administration des Cités
 - Drag'n'Drop de la Carte pour Pan
 - Vérifier le fonctionnement des naviguateurs suivants : 
   - FireFox
   - Google Chrome
   - Internet Explorer
   - Opera
   - Safari
   - SeaMonkey
   - Vivaldi

## Installation ##
    npm install
    gulp prod
    cd bin
    firebase login
    firebase deploy

