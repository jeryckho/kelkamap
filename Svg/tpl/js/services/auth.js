angular.module('SvgMapApp')
	///////////////////////
	// Service d'Authent //
	///////////////////////
	.factory('Auth', ['$firebaseAuth', function ($firebaseAuth) {
		var svc = {};
		svc.auth = $firebaseAuth();

		svc.login = function (lg, mp) {
			return svc.auth.$signInWithEmailAndPassword(lg, mp);
		}

		svc.logout = function () {
			return svc.auth.$signOut();
		}

		svc.isLoggedIn = function () {
			return svc.auth.$getAuth();
		}

		return svc;
	}]);