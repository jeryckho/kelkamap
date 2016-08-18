**ToDo**

Bon, maintenant qu'on a une vision un peu plus clair du truc, voici ce que je dirais :

 - D'abord, un layer "Fond de Carte" en png en jpg. Juste les terres, mers, reliefs. (Pas les frontières, annotations, cités, ressources, ni les hexagones.) (Rodolphe m'a passé les sources de la carte...)
 - Ensuite un layer "Hexagones" calculé à la volée, masquable. Ce layer sera celui qui portera les informations d'appartenance à une nation.
 - Un layer Cités, masquable. (Png)
 - Un layer Ressources, masquable. (Png)
 - Un layer Annotations, masquable. (Vecto, c'est du texte)
 
Ensuite, à côté ou en dessous de la carte (suivant la taille de l'écran) :

 - Une zone qui donne les infos de l'hexagone sélectionné.
le cas échéant, les infos de la nation à qui il appartient (dans ce cas, la nation est en surbrillance)
 - des éléments pour zoom/pan (je sais pas encore comment les représenter par contre)
 - des éléments pour masquer les layers 

----------

**ViewBox**

    angular
    	.module('directives.viewBox', [])
    	.directive('viewBox', [
    		/**
    		 * @ngdoc directive
    		 * @name directives.viewBox.directive:viewBox
    		 * @description
    		 * Supports using expression for SVG viewBox, by
    		 * using `data-view-box` which sets `viewBox` attribute.
    		 * Code borrowed from http://stackoverflow.com/a/14596319
    		 * @element SVG
    		 * @example
    			 <doc:example>
    		        <doc:source>
    		            <svg data-view-box="{{ APP_VIEWPORT.viewBox }}"></svg>
    		        </doc:source>
    		    </doc:example>
    		 */
    		function () {
    			'use strict';
    			return {
    				link: function (scope, element, attributes) {
    					attributes.$observe('viewBox', function(value) {
    						element.attr('viewBox', value);
    					});
    				}
    			};
    		}
    ]);
