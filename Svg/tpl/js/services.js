angular.module('SvgMapApp')
	///////////////////////////////
	// Service des Donnees Carte //
	///////////////////////////////
	.factory('Data', ['$http', '$document', function ($http, $document) {
		var svc = {};
		svc.Layer = { iFond: true, gHex: true, cLand: true, gCities: true };
		svc.Modif = false;
		svc.Conflit = false;

		svc.Find = function (id, pos) {
			var queryResult = $document[0].getElementById(id);
			if (queryResult != null) {
				var res = angular.element(queryResult).attr('points').split(" ");
				return parseFloat(res[pos]);
			} else {
				return -1000;
			}
		}

		svc.FindXY = function (id, X) {
			var queryResult = $document[0].getElementById(id);
			if (queryResult != null) {
				var Res = angular.element(queryResult).attr('points').split(" ");
				var Dlt = X ? 0 : 1;
				var Sum = 0;
				for (var Idx = 0; Idx <= 10; Idx += 2) {
					Sum += parseFloat(Res[Idx + Dlt]);
				}
				return Sum / 6;
			} else {
				return -1000;
			}
		}

		svc.Xport = function () {
			var x = {};
			angular.copy(svc.Map, x);
			x.Focus = { Hexs: {}, Nation: "", Over: "" };
			x.Hexs = {};
			angular.forEach(x.Nations, function (nation, code) {
				nation.Hexs.sort();
			});
			return x;
		}

		svc.ComputeHexs = function () {
			svc.Map.Hexs = {};
			angular.forEach(svc.Map.Nations, function (nation, code) {
				angular.forEach(nation.Hexs, function (hex) {
					svc.Map.Hexs[hex] = code;
				});
			});
		}

		$http.get('data/Map.json').success(function (data) {
			svc.Map = data;
			svc.ComputeHexs();
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
			if (nation != "") {
				var Lst = svc.Map.Nations[nation].Hexs;
				angular.forEach(Lst, function (elem) {
					svc.Map.Focus.Hexs[elem] = true;
				});
			}
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
	}])

	////////////////////
	// Service de Zoom//
	////////////////////
	.factory('Zoom', ['$document', function ($document) {
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

		svc.InOut = function (fac, bZoom, cX, cY) {

			cX = typeof cX !== 'undefined' ? cX : svc.vBox.Crt.x + svc.vBox.Crt.w / 2;
			cY = typeof cY !== 'undefined' ? cY : svc.vBox.Crt.y + svc.vBox.Crt.h / 2;

			if (bZoom) {
				svc.vBox.Crt.w /= fac;
				svc.vBox.Crt.h /= fac;
			} else {
				svc.vBox.Crt.w *= fac;
				svc.vBox.Crt.h *= fac;
			}
			svc.vBox.Crt.x = cX - svc.vBox.Crt.w / 2;
			svc.vBox.Crt.y = cY - svc.vBox.Crt.h / 2;
			svc.setBox();
		}

		svc.Move = function (mW, mH) {
			svc.vBox.Crt.x += mW * svc.vBox.Crt.w;
			svc.vBox.Crt.y += mH * svc.vBox.Crt.h;
			svc.setBox();
		}

      svc.Wheel = function (event, delta, deltaX, deltaY) {
			if (delta > 0) {
				svc.InOut(1.1, true);
			} else if (delta < 0) {
				svc.InOut(1.1, false);
			}
			event.stopPropagation();
			event.preventDefault();
      };

      svc.WheelCenter = function (event, delta, deltaX, deltaY) {
			var svg = $document[0].getElementById('svg4218');
			var pt = svg.createSVGPoint();
			pt.x = event.pageX || event.originalEvent.pageX || event.originalEvent.clientX;
			pt.y = event.pageY || event.originalEvent.pageY || event.originalEvent.clientY;
			var ptm = pt.matrixTransform(svg.getScreenCTM().inverse());

			if (delta > 0) {
				svc.InOut(1.1, true, ptm.x, ptm.y);
			} else if (delta < 0) {
				svc.InOut(1.1, false, ptm.x, ptm.y);
			}
			event.stopPropagation();
			event.preventDefault();
      };

		return svc;
	}]);
