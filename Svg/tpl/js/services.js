angular.module('SvgMapApp')
	.factory('DataSvc', ['$http', function ($http) {
		var svc = {};

		$http.get('data/DataSvc.json').success(function (data) {
			svc.Map = data;
		});

		svc.OverNation = function(nation) {
			svc.Map.Focus = {};
			svc.Map.FocusNation = nation;		
			var Lst = svc.Map.Nations[nation].Hexs;
			angular.forEach(Lst, function (elem) {
				svc.Map.Focus[elem] = true;
			});
		}

		svc.OverHex = function(hOver) {
			svc.Map.Focus = {};
			svc.Map.FocusNation = "";
			if (angular.isDefined(svc.Map.Hexs[hOver])) {
				svc.OverNation(svc.Map.Hexs[hOver]);
			}
		}

		return svc;
	}])

	.factory('FbSvc', ['$firebaseAuth', function ($firebaseAuth) {
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
