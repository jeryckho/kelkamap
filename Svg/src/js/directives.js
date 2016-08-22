angular.module('SvgMapApp').directive('svgMap', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'img/KelkaMap.svg',
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.H');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                regionElement.attr("dummy-data", "dummyData");
                regionElement.attr("hover-region", "hoverRegion");
                $compile(regionElement)(scope);
            })
        }
    }
}]);

angular.module('SvgMapApp').directive('svgGrid', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'img/KelkaGrid.svg',
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.H');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
                regionElement.attr("dummy-data", "dummyData");
                regionElement.attr("hover-region", "hoverRegion");
                $compile(regionElement)(scope);
            })
        }
    }
}]);

angular.module('SvgMapApp').directive('region', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        scope: {
            dummyData: "=",
            hoverRegion: "="
        },
        link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
            scope.regionClick = function () {
					// alert(scope.elementId);
                scope.hoverRegion = scope.elementId;
					 if (angular.isDefined(scope.dummyData.Hexagones[scope.hoverRegion])) {
						 scope.dummyData.Focus = {};
						 var Lst = scope.dummyData.Nations[scope.dummyData.Hexagones[scope.hoverRegion]].Hexagones;
						 angular.forEach(Lst, function (elem) {
							scope.dummyData.Focus[elem] = true;
						 });
					 } else {
						 scope.dummyData.Focus = {};
					 }
            };
            scope.regionMouseOver = function () {
                scope.hoverRegion = scope.elementId;
					 if (angular.isDefined(scope.dummyData.Hexagones[scope.hoverRegion])) {
						 scope.dummyData.Focus = {};
						 var Lst = scope.dummyData.Nations[scope.dummyData.Hexagones[scope.hoverRegion]].Hexagones;
						 angular.forEach(Lst, function (elem) {
							scope.dummyData.Focus[elem] = true;
						 });
					 } else {
						 scope.dummyData.Focus = {};
					 }
               //  element[0].parentNode.appendChild(element[0]);	
            };
            element.attr("ng-click", "regionClick()");
            // element.attr("ng-attr-fill", "{{dummyData[elementId].value | map_colour}}");
            element.attr("ng-mouseover", "regionMouseOver()");
            element.attr("ng-class", "{active:hoverRegion==elementId,nation:dummyData.Focus[elementId]}");
            element.removeAttr("region");
            $compile(element)(scope);
        }
    }
}]);

angular.module('SvgMapApp').directive('viewBox', [
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
