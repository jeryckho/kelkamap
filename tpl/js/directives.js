app
	///////////////////
	// Inclusion Map //
	///////////////////
	.directive('svgMap', [ function () {
		return {
			restrict: 'A',
			templateUrl: 'img/KelkaMap.svg'
		}
	}])

	////////////////////////
	// Composant Filtrage //
	////////////////////////
	.directive('filtre', [ function () {
		return {
			restrict: 'E',
			scope: {
				item: '=',
				name: '@'
			},
			replace: 'true',
			template: '<span class="form-group"><input type="checkbox" ng-change="cbChange()" ng-model="myCb" id="cbFil{{ name }}" class="sr-only"/><label for="cbFil{{ name }}"><span class="cursor-pointer glyphicon glyphicon-filter"> </span></label> <input type="text" class="form-control smallinput" ng-model="item" ng-show="myCb"></span>',
			link: function (scope, element, attrs) {
				scope.tmp = "";
				scope.cbChange = function () {
					if (!scope.myCb) {
						scope.tmp = scope.item;
						scope.item = "";
					} else {
						scope.item = scope.tmp;
					}
				};
			}
		}
	}])

	////////////////////
	// Inclusion Rose //
	////////////////////
	.directive('svgRose', [ function () {
		return {
			restrict: 'A',
			templateUrl: 'img/Rose.svg'
		}
	}]);
