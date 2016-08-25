angular.module('SvgMapApp', ['angular-loading-bar', 'firebase', 'ngRoute'])

	.run(['$rootScope', '$location', function ($rootScope, $location) {
		$rootScope.$on('$routeChangeError', function (event, next, previous, error) {
			if (error === 'AUTH_REQUIRED') {
				$location.path('/Log');
			}
		});
	}])

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
				resolve: {
					'currentAuth': ['Auth', function (Auth) {
						return Auth.auth.$requireSignIn();
					}]
				}
			})
			.otherwise({ redirectTo: '/' });
	}])


	.controller('ImgCtrl', ['$scope', 'Data', 'Zoom', function ($scope, Data, Zoom) {

		$scope.Data = Data;
		$scope.Zoom = Zoom;

		$scope.Zoom.setBox();
	}])

	.controller('AdmCtrl', ['$scope', 'currentAuth', function ($scope, currentAuth) {
		$scope.cnt = 'ADM';
	}])

	.controller('LogCtrl', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {
		$scope.Auth = Auth;
		$scope.cnt = 'LOG';

		$scope.connect = function () {
			$scope.Auth.login($scope.alog, $scope.apwd)
				.then(function (data) {
					$scope.cnt = 'OK';
					$location.path('/Adm');
				})
				.catch(function (error) {
					$scope.cnt = error;
				});
		}
		$scope.unlog = function () {
			$scope.Auth.logout()
				.then(function (data) {
					$scope.cnt = '-';
					$location.path('/');
				})
				.catch(function (error) {
					$scope.cnt = error;
				});
		}
	}])

	.controller('InfoCtrl', ['$scope', 'Data', 'Auth', 'Zoom', function ($scope, Data, Auth, Zoom) {
		$scope.Auth = Auth;
		$scope.Data = Data;
		$scope.Zoom = Zoom;
	}]);
