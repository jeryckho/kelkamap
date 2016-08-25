angular.module('SvgMapApp')
	// Service des Donnees Carte
	.factory('Data', ['$http', function ($http) {
		var svc = {};
		svc.Layer = { iFond: true, gHex: true, cLand: true };
		svc.Modif = false;
		svc.Conflit = false;

		$http.get('data/Map.json').success(function (data) {
			svc.Map = data;
		});

		svc.Toggle = function (id) {
			svc.Layer[id] = !svc.Layer[id];
		}

		svc.AddHexToNation = function (hOver, nation) {
			svc.Map.Hexs[hOver] = nation;
			if (!angular.isDefined(svc.Map.Nations[nation].Hexs)) {
				svc.Map.Nations[nation].Hexs = [];
			}
			svc.Map.Nations[nation].Hexs.push(hOver);
		}

		svc.SubHexToNation = function (hOver, nation) {
			delete svc.Map.Hexs[hOver];
			var index = svc.Map.Nations[nation].Hexs.indexOf(hOver);
			if (index > -1) {
				svc.Map.Nations[nation].Hexs.splice(index, 1);
			}
		}

		svc.OverNation = function (nation) {
			svc.Map.Focus.Hexs = {};
			svc.Map.Focus.Nation = nation;
			var Lst = svc.Map.Nations[nation].Hexs;
			angular.forEach(Lst, function (elem) {
				svc.Map.Focus.Hexs[elem] = true;
			});
		}

		svc.ClickHex = function (hOver) {
			if (svc.Modif) {
				if (svc.Map.Focus.Nation != "") {
					svc.Map.Focus.Over = hOver;
					if ((!angular.isDefined(svc.Map.Hexs[hOver])) || (svc.Map.Hexs[hOver] == "")) {
						// ADD
						svc.AddHexToNation(hOver, svc.Map.Focus.Nation);
					} else if (svc.Map.Hexs[hOver] == svc.Map.Focus.Nation) {
						// SUB
						svc.SubHexToNation(hOver, svc.Map.Focus.Nation);
					} else {
						// SWAP
						svc.SubHexToNation(hOver, svc.Map.Hexs[hOver]);
						svc.AddHexToNation(hOver, svc.Map.Focus.Nation);
					}
					svc.OverNation(svc.Map.Focus.Nation);
				}
			} else {
				svc.Map.Focus = { Hexs: {}, Nation: "", Over: hOver };
				if (angular.isDefined(svc.Map.Hexs[hOver])) {
					svc.OverNation(svc.Map.Hexs[hOver]);
				}
			}
		}

		svc.OverHex = function (hOver) {
			if (svc.Modif) {
				svc.Map.Focus.Over = hOver;
				svc.Conflit = (angular.isDefined(svc.Map.Hexs[hOver])) && (svc.Map.Focus.Nation != "") && (svc.Map.Hexs[hOver] != "") && (svc.Map.Hexs[hOver] != svc.Map.Focus.Nation);
			} else {
				svc.Map.Focus = { Hexs: {}, Nation: "", Over: hOver };
				if (angular.isDefined(svc.Map.Hexs[hOver])) {
					svc.OverNation(svc.Map.Hexs[hOver]);
				}
			}
		}

		return svc;
	}])

	// Service d'Authent
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
	}])

	// Service de Zoom
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
