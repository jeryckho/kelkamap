angular.module('SvgMapApp', ['angular-loading-bar', 'firebase'])
	.controller('MainCtrl', ['$scope', 'Data', 'Auth', 'Zoom', function ($scope, Data, Auth, Zoom) {

		$scope.Data = Data;
		$scope.Auth = Auth;
		$scope.Zoom = Zoom;

		$scope.tog = function (id) {
			$scope.layer[id] = !$scope.layer[id];
		}

		$scope.connect = function () {
			$scope.Auth.login($scope.alog, $scope.apwd)
				.then(function (data) {
					$scope.cnt = "OK";
				})
				.catch(function (error) {
					$scope.cnt = error;
				});
		}

		$scope.layer = { iFond: true, gHex: true };
		$scope.Zoom.setBox();
	}]);
