angular.module('SvgMapApp', ['angular-loading-bar'])
    .controller('MainCtrl', ['$scope', function ($scope) {
		  $scope.ngViewBox = "-2640 -2520 5880 5880";
		//   $scope.ngViewBox = "100 100 1230 870";
        var states = [
				"Terres","Autre"];
        $scope.createDummyData = function () {
            var dataTemp = {};
            angular.forEach(states, function (state, key) {
                dataTemp[state] = {value: Math.random()}
            });
            $scope.dummyData = dataTemp;
        };
        $scope.createDummyData();

        $scope.changeHoverRegion = function (region) {
            $scope.hoverRegion = region;
        };
    }]);