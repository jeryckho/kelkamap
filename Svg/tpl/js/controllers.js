angular.module('SvgMapApp', ['angular-loading-bar', 'firebase', 'ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'html/Info.html',
				controller: 'InfoCtrl',
			})
			.when('/Log', {
				templateUrl: 'html/Log.html',
				controller: 'LogCtrl',
			})
			.when('/Adm', {
				templateUrl: 'html/Adm.html',
				controller: 'AdmCtrl',
			})
			.otherwise({ redirectTo: '/' });
	}])


	.controller('ImgCtrl', ['$scope', 'Data', 'Zoom', function ($scope, Data, Zoom) {

		$scope.Data = Data;
		$scope.Zoom = Zoom;

		$scope.Zoom.setBox();
	}])

	.controller('AdmCtrl', ['$scope', function ($scope) {
		$scope.cnt = "ADM";
	}])

	.controller('LogCtrl', ['$scope', function ($scope) {
		$scope.cnt = "LOG";
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
