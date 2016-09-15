app
	///////////////////////////////
	// Service des Donnees Carte //
	///////////////////////////////
	.factory('Data', ['$http', '$document', 'Prefs', function ($http, $document, Prefs) {
		var svc = {};
		svc.Layer = Prefs.Get('Layer', { iFond: true, gHex: true, cLand: true, gCities: true });
		svc.Modif = false;
		svc.Conflit = false;
		svc.Swap = false;
		svc.Pin = "";
		svc.Colors = false;
		svc.Style = {};

		svc.setList = function () {
			var Lst = [];
			var Cnf = {
				OX: 160,
				OY: 340,
				Size: 5880 / 81,
				Vert: (5880 / 81) * Math.sqrt(3),
				W: 5880,
				H: 5880,
				dx: 0,
				dy: 0,
				dV: 0
			};

			for (var x = 0; x < Cnf.W; x += Cnf.Size * 1.5) {
				Cnf.dV = ((Cnf.dx % 2) == 0) ? 0 : Cnf.Vert / 2;
				for (var y = 0; y < Cnf.H; y += Cnf.Vert) {
					Lst.push({
						ID: 'H' + ((Cnf.dx < 10) ? '0' + Cnf.dx : Cnf.dx) + '' + + ((Cnf.dy < 10) ? '0' + Cnf.dy : Cnf.dy),
						X: x + Cnf.OX,
						Y: y + Cnf.OY + Cnf.dV
					});
					Cnf.dy++;
				}
				Cnf.dx++;
				Cnf.dy = 0;
			}
			return Lst;
		}
		svc.HList = svc.setList();

		svc.setColors = function (bool) {
			svc.Colors = bool;
			if (bool) {
				svc.ComputeStyles();
			} else {
				svc.Style = {};
			}
		}

		svc.Save = function () {
			Prefs.Set('Layer', svc.Layer);
		}

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
				return parseFloat(angular.element(queryResult).attr(X ? 'x' : 'y'));
			} else {
				return -1000;
			}
		}

		svc.Xport = function () {
			var x = {};
			angular.copy(svc.Map, x);
			x.Focus = { Hexs: {}, City: "", Nation: "", Over: "" };
			x.Hexs = {};
			angular.forEach(x.Nations, function (nation, code) {
				nation.Hexs.sort();
				delete nation.key;
				delete nation.Population;
			});
			angular.forEach(x.Cities, function (city, code) {
				delete city.key;
				delete city.Nation;
				delete city.Population;
			});
			return x;
		}

		svc.ComputeStyles = function () {
			svc.Style = {};
			angular.forEach(svc.Map.Nations, function (nation, code) {
				svc.Style[code] = { 'fill': nation.Couleur };
			});
		}

		svc.ComputeHexs = function () {
			svc.Map.Hexs = {};
			angular.forEach(svc.Map.Nations, function (nation, code) {
				angular.forEach(nation.Hexs, function (hex) {
					svc.Map.Hexs[hex] = code;
				});
			});
		}

		svc.ComputePopulations = function () {
			angular.forEach(svc.Map.Nations, function (nation, code) {
				var pop = 0;
				angular.forEach(nation.Cities, function (city) {
					var lpop = svc.Map.Population[svc.Map.Cities[city].Type];
					svc.Map.Cities[city].Population = lpop;
					pop += lpop;
				});
				nation.Population = pop;
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
			svc.ComputePopulations();
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
			svc.Map.Focus.City = city;
			if (svc.Pin == "") {
				svc.Map.Focus.Hexs = {};
				svc.OverNation(svc.Map.Cities[city].Nation);
			}
		}

		svc.OverInfoCity = function (city) {
			svc.Map.Focus.City = city;
			if (svc.Pin == "") {
				svc.Map.Focus.Hexs = {};
				svc.Map.Focus.Nation = "";
			}
		}

		svc.Box = function (nation, dlt) {
			var minX, minY, maxX, maxY;
			if ((nation != "") && (angular.isDefined(svc.Map.Nations[nation]))) {
				var Lst = svc.Map.Nations[nation].Hexs;
				angular.forEach(Lst, function (elem) {
					var mx = svc.FindXY(elem, true);
					var my = svc.FindXY(elem, false);
					if (angular.isDefined(minX)) {
						if (mx < minX) { minX = mx; }
						if (my < minY) { minY = my; }
						if (mx > maxX) { maxX = mx; }
						if (my > maxY) { maxY = my; }
					} else {
						minX = mx;
						minY = my;
						maxX = mx;
						maxY = my;
					}
				});
			}
			if (angular.isDefined(minX)) {
				return { X: minX - dlt, Y: minY - dlt, W: 2 * dlt + maxX - minX, H: 2 * dlt + maxY - minY };
			} else {
				return undefined;
			}
		}

		svc.OverNation = function (nation) {
			if (svc.Pin == "") {
				svc.OverNationInner(nation);
			}
		}

		svc.OverNationInner = function (nation) {
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
						if (svc.Swap) {
							svc.SubHexToNation(hOver, svc.Map.Hexs[hOver]);
							svc.AddHexToNation(hOver, svc.Map.Focus.Nation);
						}
					}
					svc.OverNationInner(svc.Map.Focus.Nation);
				}
			} else {
				if (svc.Pin == "") {
					svc.Map.Focus = { Hexs: {}, Nation: "", Over: hOver, City: "" };
					if (angular.isDefined(svc.Map.Hexs[hOver])) {
						svc.OverNation(svc.Map.Hexs[hOver]);
					}
				}
			}
		}

		svc.OverHex = function (hOver) {
			if (svc.Modif) {
				svc.Map.Focus.Over = hOver;
				svc.Conflit = (angular.isDefined(svc.Map.Hexs[hOver])) && (svc.Map.Focus.Nation != "") && (svc.Map.Hexs[hOver] != "") && (svc.Map.Hexs[hOver] != svc.Map.Focus.Nation);
			} else {
				if (svc.Pin == "") {
					svc.Map.Focus = { Hexs: {}, Nation: "", Over: hOver };
					if (angular.isDefined(svc.Map.Hexs[hOver])) {
						svc.OverNation(svc.Map.Hexs[hOver]);
					}
				}
			}
		}

		svc.PinIt = function (nation) {
			svc.Pin = (svc.Pin == nation) ? "" : nation;
			if (svc.Pin != "") { svc.OverNationInner(nation); }
		}

		return svc;
	}]);