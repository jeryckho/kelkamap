angular.module('SvgMapApp').factory('DataSvc', ['$http', function ($http) {
	var svc = {};

	$http.get('data/DataSvc.json').success(function (data) {
		svc.Map = data;
	});

	return svc;
}]);

angular.module('SvgMapApp').factory('FbSvc', ['$firebaseAuth', function ($firebaseAuth) {
	var svc = {};
	svc.auth = $firebaseAuth();

	svc.login = function (lg, mp) {
      return svc.auth.$signInWithEmailAndPassword(lg, mp);
	}

	svc.logout = function () {
      svc.auth.$signOut();
	}

	svc.isLoggedIn = function () {
      return svc.auth.$getAuth();
	}

	return svc;
}]);

