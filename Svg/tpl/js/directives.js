angular.module('SvgMapApp')
	///////////////////
	// Inclusion Map //
	///////////////////
	.directive('svgMap', ['$compile', function ($compile) {
		return {
			restrict: 'A',
			templateUrl: 'img/KelkaMap.svg',
			link: function (scope, element, attrs) {
				var regions = element[0].querySelectorAll('.H');
				angular.forEach(regions, function (path, key) {
					var regionElement = angular.element(path);
					regionElement.attr("region", "");
					$compile(regionElement)(scope);
				})
			}
		}
	}])

	///////////////////
	// Inclusion Hex //
	///////////////////
	.directive('svgGrid', ['$compile', function ($compile) {
		return {
			restrict: 'A',
			templateUrl: 'img/KelkaGrid.svg',
			link: function (scope, element, attrs) {
				var regions = element[0].querySelectorAll('.H');
				angular.forEach(regions, function (path, key) {
					var regionElement = angular.element(path);
					regionElement.attr("region", "");
					$compile(regionElement)(scope);
				})
			}
		}
	}])

	////////////////////////
	// Decoration des Hex //
	////////////////////////
	.directive('region', ['$compile', 'Data', function ($compile, Data) {
		return {
			restrict: 'A',
			scope: {
			},
			link: function (scope, element, attrs) {
				scope.elementId = element.attr("id");
				scope.Data = Data;
				scope.regionClick = function () {
					scope.Data.ClickHex(scope.elementId);
				};
				scope.regionMouseOver = function () {
					scope.Data.OverHex(scope.elementId);
				};
				element.attr("ng-click", "regionClick()");
				element.attr("ng-mouseover", "regionMouseOver()");
				element.attr("ng-class", "{conflit:(Data.Map.Focus.Over==elementId)&&(Data.Conflit)&&(Data.Modif),nation:Data.Map.Focus.Hexs[elementId]}");
				element.removeAttr("region");
				$compile(element)(scope);
			}
		}
	}])

	///////////////////
	// Suivi ViewBox //
	///////////////////
	.directive('viewBox', [
		function () {
			'use strict';
			return {
				link: function (scope, element, attributes) {
					attributes.$observe('viewBox', function (value) {
						element.attr('viewBox', value);
					});
				}
			};
		}
	])

	///////////////////
	// Suivi value X //
	///////////////////
	.directive('ngX', function () {
		return function (scope, elem, attrs) {
			attrs.$observe('ngX', function (x) {
				elem.attr('x', x);
			});
		};
	})

	///////////////////
	// Suivi value Y //
	///////////////////
	.directive('ngY', function () {
		return function (scope, elem, attrs) {
			attrs.$observe('ngY', function (y) {
				elem.attr('y', y);
			});
		};
	})

	////////////////////
	// Inclusion Rose //
	////////////////////
	.directive('svgRose', ['$compile', function ($compile) {
		return {
			restrict: 'A',
			templateUrl: 'img/Rose.svg'
		}
	}]);
