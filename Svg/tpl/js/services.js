angular.module('SvgMapApp')
	.factory('Data', ['$http', function ($http) {
		var svc = {};
		svc.Layer = { iFond: true, gHex: true };

		$http.get('data/Map.json').success(function (data) {
			svc.Map = data;
		});

		svc.Toggle = function (id) {
			svc.Layer[id] = !svc.Layer[id];
		}

		svc.OverNation = function (nation) {
			svc.Map.Focus.Hexs = {};
			svc.Map.Focus.Nation = nation;
			var Lst = svc.Map.Nations[nation].Hexs;
			angular.forEach(Lst, function (elem) {
				svc.Map.Focus.Hexs[elem] = true;
			});
		}

		svc.OverHex = function (hOver) {
			svc.Map.Focus = { Hexs: {}, Nation: "", Over: hOver };
			if (angular.isDefined(svc.Map.Hexs[hOver])) {
				svc.OverNation(svc.Map.Hexs[hOver]);
			}
		}

		return svc;
	}])

	.factory('Auth', ['$firebaseAuth', function ($firebaseAuth) {
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
	}])

	.factory('Zoom', [function () {
		var svc = {};
		svc.ViewBox = "";
		svc.vBox = {
			Min: { x: -2640, y: -2520, w: 980, h: 980 },
			Max: { x: 3240, y: 3360, w: 5880, h: 5880 },
			Crt: { x: -2640, y: -2520, w: 5880, h: 5880 }
		};

		svc.setBox = function () {
			if (svc.vBox.Crt.w > svc.vBox.Max.w) svc.vBox.Crt.w = svc.vBox.Max.w;
			if (svc.vBox.Crt.h > svc.vBox.Max.h) svc.vBox.Crt.h = svc.vBox.Max.h;
			if (svc.vBox.Crt.w < svc.vBox.Min.w) svc.vBox.Crt.w = svc.vBox.Min.w;
			if (svc.vBox.Crt.h < svc.vBox.Min.h) svc.vBox.Crt.h = svc.vBox.Min.h;

			if (svc.vBox.Crt.x < svc.vBox.Min.x) svc.vBox.Crt.x = svc.vBox.Min.x;
			if (svc.vBox.Crt.y < svc.vBox.Min.y) svc.vBox.Crt.y = svc.vBox.Min.y;
			if (svc.vBox.Crt.x + svc.vBox.Crt.w > svc.vBox.Max.x) svc.vBox.Crt.x = svc.vBox.Max.x - svc.vBox.Crt.w;
			if (svc.vBox.Crt.y + svc.vBox.Crt.h > svc.vBox.Max.y) svc.vBox.Crt.y = svc.vBox.Max.y - svc.vBox.Crt.h;
			svc.ViewBox = svc.vBox.Crt.x + " " + svc.vBox.Crt.y + " " + svc.vBox.Crt.w + " " + svc.vBox.Crt.h;
		};

		svc.InOut = function (fac, bZoom) {
			if (bZoom) {
				svc.vBox.Crt.w /= fac;
				svc.vBox.Crt.h /= fac;
			} else {
				svc.vBox.Crt.w *= fac;
				svc.vBox.Crt.h *= fac;
			}
			svc.setBox();
		}

		svc.Move = function (mW, mH) {
			svc.vBox.Crt.x += mW * svc.vBox.Crt.w;
			svc.vBox.Crt.y += mH * svc.vBox.Crt.h;
			svc.setBox();
		}

		return svc;
	}]);
