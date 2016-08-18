angular.module('SvgMapApp', ['angular-loading-bar'])
    .controller('MainCtrl', ['$scope', function ($scope) {
		  $scope.ngViewBox = "0 0 1070 1100";
		//   $scope.ngViewBox = "100 100 1230 870";
        var states = [
				"path3344","path3342","path3346","path3348","polygon3350","polygon3352","polygon3354","polygon3356",
				"polygon3358","polygon3360","polygon3362","polygon3364","polygon3368","polygon3370",
		  		"polygon3372","path3374","path3376","path3378","path3380","polygon3382","path3384","path3386"];
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