angular.module('SvgMapApp')
	.factory('DataSvc', ['$http', function ($http) {
		var svc = {};

		$http.get('data/DataSvc.json').success(function (data) {
			svc.Map = data;
		});

		svc.OverNation = function(nation) {
			svc.Map.Focus.Hexs = {};
			svc.Map.Focus.Nation = nation;		
			var Lst = svc.Map.Nations[nation].Hexs;
			angular.forEach(Lst, function (elem) {
				svc.Map.Focus.Hexs[elem] = true;
			});
		}

		svc.OverHex = function(hOver) {
			svc.Map.Focus = { Hexs: {}, Nation: "", Over: hOver };		
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
