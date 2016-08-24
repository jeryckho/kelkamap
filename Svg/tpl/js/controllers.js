angular.module('SvgMapApp', ['angular-loading-bar', 'firebase'])
	.controller('MainCtrl', ['$scope', 'Data', 'Zoom', function ($scope, Data, Zoom) {

		$scope.Data = Data;
		$scope.Zoom = Zoom;

		$scope.Zoom.setBox();
	}])
	.controller('InfoCtrl', ['$scope', 'Data', 'Auth', 'Zoom', function ($scope, Data, Auth, Zoom) {

		$scope.Data = Data;
		$scope.Auth = Auth;
		$scope.Zoom = Zoom;

		$scope.connect = function () {
			$scope.Auth.login($scope.alog, $scope.apwd)
				.then(function (data) {
					$scope.cnt = "OK";
				})
				.catch(function (error) {
					$scope.cnt = error;
				});
		}
		$scope.unlog = function () {
			$scope.Auth.logout()
				.then(function (data) {
					$scope.cnt = "-";
				})
				.catch(function (error) {
					$scope.cnt = error;
				});
		}
	}]);
