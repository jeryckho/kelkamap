app
	////////////////////////////
	// Service de Preferences //
	////////////////////////////
	.factory('Prefs', ['$rootScope', function ($rootScope) {
		var svc = {
			Storage: {}
		};

		svc.Get = function (elem, def) {
			return angular.isDefined(svc.Storage[elem]) ? svc.Storage[elem] : def;
		}
		svc.Set = function (elem, val) {
			svc.Storage[elem] = val;
		}

		svc.RestoreState = function () {
			svc.Storage = angular.fromJson(localStorage.Prefs);
		}
		if (localStorage.Prefs) svc.RestoreState();

		svc.SaveState = function () {
			localStorage.Prefs = angular.toJson(svc.Storage);
		}
		$rootScope.$on("savestate", svc.SaveState);


		return svc;
	}]);