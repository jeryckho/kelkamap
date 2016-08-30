angular.module('SvgMapApp')
	///////////////////////////////
	// Service des Donnees Carte //
	///////////////////////////////
	.factory('Data', ['$http', '$document', function ($http, $document) {
		var svc = {};
		svc.Layer = { iFond: false, gHex: true, cLand: true, gCities: true };
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
			x.Focus = { Hexs: {}, Nation: "", City: "", Over: "" };
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

		svc.ComputeCities = function () {
			angular.forEach(svc.Map.Nations, function (nation, code) {
				angular.forEach(nation.Cities, function (city) {
					svc.Map.Cities[city].Nation = code;
				});
			});
		}

		$http.get('data/Map.json').success(function (data) {
			svc.Map = data;
			svc.ComputeHexs();
			svc.ComputeCities();
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

		svc.OverCity = function (city) {
			svc.Map.Focus.Hexs = {};
			svc.Map.Focus.City = city;
			svc.OverNation(svc.Map.Cities[city].Nation);
		}

		svc.OverInfoCity = function (city) {
			svc.Map.Focus.Hexs = {};
			svc.Map.Focus.Nation = "";
			svc.Map.Focus.City = city;
		}

		svc.OverNation = function (nation) {
			svc.Map.Focus.Hexs = {};
			svc.Map.Focus.City = "";
			svc.Map.Focus.Nation = nation;
			if ((nation != "") && (angular.isDefined(svc.Map.Nations[nation]))) {
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
				svc.Map.Focus = { Hexs: {}, Nation: "", Over: hOver, City: "" };
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
	}]);
