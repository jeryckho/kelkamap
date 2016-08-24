angular.module('SvgMapApp')
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

	.directive('region', ['$compile', 'Data', function ($compile, Data) {
		return {
			restrict: 'A',
			scope: {
			},
			link: function (scope, element, attrs) {
				scope.elementId = element.attr("id");
				scope.Data = Data;
				scope.regionClick = function () {
					scope.Data.OverHex(scope.elementId);
				};
				scope.regionMouseOver = function () {
					scope.Data.OverHex(scope.elementId);
				};
				element.attr("ng-click", "regionClick()");
				element.attr("ng-mouseover", "regionMouseOver()");
				element.attr("ng-class", "{active:Data.Map.Focus.Over==elementId,nation:Data.Map.Focus.Hexs[elementId]}");
				element.removeAttr("region");
				$compile(element)(scope);
			}
		}
	}])

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
	]);
