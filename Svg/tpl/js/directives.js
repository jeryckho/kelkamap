angular.module('SvgMapApp').directive('svgMap', ['$compile', function ($compile) {
    return {
        restrict: 'A',
        templateUrl: 'img/KelkaMap.svg',
        link: function (scope, element, attrs) {
            var regions = element[0].querySelectorAll('.H');
            angular.forEach(regions, function (path, key) {
                var regionElement = angular.element(path);
                regionElement.attr("region", "");
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
                regionElement.attr("hover-region", "hoverRegion");
                $compile(regionElement)(scope);
            })
        }
    }
}]);

angular.module('SvgMapApp').directive('region', ['$compile', 'DataSvc', function ($compile, DataSvc) {
    return {
        restrict: 'A',
        scope: {
            hoverRegion: "="
        },
        link: function (scope, element, attrs) {
            scope.elementId = element.attr("id");
				scope.DataSvc = DataSvc;
            scope.regionClick = function () {
					// alert(scope.elementId);
                scope.hoverRegion = scope.elementId;
					 scope.DataSvc.Map.Focus = {};
					 scope.DataSvc.Map.FocusNation = "";					 
					 if (angular.isDefined(scope.DataSvc.Map.Hexagones[scope.hoverRegion])) {
						 scope.DataSvc.Map.FocusNation = scope.DataSvc.Map.Hexagones[scope.hoverRegion];
						 var Lst = scope.DataSvc.Map.Nations[scope.DataSvc.Map.Hexagones[scope.hoverRegion]].Hexagones;
						 angular.forEach(Lst, function (elem) {
							scope.DataSvc.Map.Focus[elem] = true;
						 });
					 }
            };
            scope.regionMouseOver = function () {
                scope.hoverRegion = scope.elementId;
					 scope.DataSvc.Map.Focus = {};
					 scope.DataSvc.Map.FocusNation = "";					 
					 if (angular.isDefined(scope.DataSvc.Map.Hexagones[scope.hoverRegion])) {
						 scope.DataSvc.Map.FocusNation = scope.DataSvc.Map.Hexagones[scope.hoverRegion];
						 var Lst = scope.DataSvc.Map.Nations[scope.DataSvc.Map.Hexagones[scope.hoverRegion]].Hexagones;
						 angular.forEach(Lst, function (elem) {
							scope.DataSvc.Map.Focus[elem] = true;
						 });
					 }
               //  element[0].parentNode.appendChild(element[0]);	
            };
            element.attr("ng-click", "regionClick()");
            element.attr("ng-mouseover", "regionMouseOver()");
            element.attr("ng-class", "{active:hoverRegion==elementId,nation:DataSvc.Map.Focus[elementId]}");
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
