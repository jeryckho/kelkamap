angular.module('SvgMapApp', ['angular-loading-bar', 'firebase', 'ngRoute'])
	// Redirection de #/Adm vers #/Log
	.run(['$rootScope', '$location', function ($rootScope, $location) {
		$rootScope.$on('$routeChangeError', function (event, next, previous, error) {
			if (error === 'AUTH_REQUIRED') {
				$location.path('/Log');
			}
		});
	}])

	// Config Routeur
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
	}]);