app
	///////////////////////////////
	// Service des Donnees Carte //
	///////////////////////////////
	.factory('Data', ['$http', 'Prefs', function ($http, Prefs) {
		var svc = {
			Modif: false,
			Conflit: false,
			Swap: false,
			Pin: "",
			Colors: false,
			Bound: {},
			BoundOpacity: 0.1,
			Poly: {},
			Cnf: {
				OX: 160,
				OY: 340,
				Size: 5880 / 81,
				Vert: (5880 / 81) * Math.sqrt(3),
				W: 5880,
				H: 5880,
				dx: 0,
				dy: 0,
				dV: 0
			}
		};
		svc.Layer = Prefs.Get('Layer', { iFond: true, gBound: false, gHex: true, cLand: true, gCities: true });

		svc.MkID = function (a, b) {
			return ((a < 10) ? 'H0' : 'H') + a + ((b < 10) ? '0' : '') + b;
		}

		svc.MkXY = function (ID) {
			var a = parseInt(ID.substr(1, 2));
			var b = parseInt(ID.substr(3, 2));
			return [a, b];
		}

		svc.setList = function () {
			var Lst = {};
			for (var x = 0; x < svc.Cnf.W; x += svc.Cnf.Size * 1.5) {
				svc.Cnf.dV = ((svc.Cnf.dx % 2) == 0) ? 0 : svc.Cnf.Vert / 2;
				for (var y = 0; y < svc.Cnf.H; y += svc.Cnf.Vert) {
					var id = svc.MkID(svc.Cnf.dx, svc.Cnf.dy);
					Lst[id] = {
						ID: id,
						X: Math.round(x + svc.Cnf.OX),
						Y: Math.round(y + svc.Cnf.OY + svc.Cnf.dV)
					};
					svc.Cnf.dy++;
				}
				svc.Cnf.dx++;
				svc.Cnf.dy = 0;
			}
			return Lst;
		}
		svc.HList = svc.setList();

		svc.setColors = function (bool) {
			svc.Colors = bool;
			if (bool) {
				svc.BoundOpacity = 0.9;
			} else {
				svc.BoundOpacity = 0.1;
			}
		}

		svc.Save = function () {
			Prefs.Set('Layer', svc.Layer);
		}

		svc.FindXY = function (id, bX) {
			if (angular.isDefined(svc.HList[id])) {
				return bX ? svc.HList[id].X : svc.HList[id].Y;
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

		svc.ComputeHexs = function () {
			svc.Map.Hexs = {};
			angular.forEach(svc.Map.Nations, function (nation, code) {
				angular.forEach(nation.Hexs, function (hex) {
					svc.Map.Hexs[hex] = code;
				});
			});
		}

		svc.hexPoint = function (i, cx, cy, r) {
			return {
				X: Math.round(cx + r * Math.cos(60 * i * (Math.PI / 180))),
				Y: Math.round(cy + r * Math.sin(60 * i * (Math.PI / 180))),
			}
		}

		svc.hexLine = function (pt, natcod, ox, oy, id) {
			if ((!angular.isDefined(svc.Map.Hexs[id])) || (svc.Map.Hexs[id] != natcod)) {
				var P1 = svc.hexPoint(pt, ox, oy, svc.Cnf.Size);
				var P2 = svc.hexPoint(pt + 1, ox, oy, svc.Cnf.Size);
				svc.Bound[natcod].push({ X1: P1.X, Y1: P1.Y, X2: P2.X, Y2: P2.Y });
			}
		}

		svc.ComputeBoundary = function (natcod) {
			svc.Bound[natcod] = [];
			svc.Poly[natcod] = [];
			angular.forEach(svc.Map.Nations[natcod].Hexs, function (hex) {
				var org = svc.MkXY(hex);
				var ox = svc.FindXY(hex, true);
				var oy = svc.FindXY(hex, false);
				var DH = org[0] % 2;
				svc.hexLine(5, natcod, ox, oy, svc.MkID(org[0] + 1, org[1] + DH - 1));
				svc.hexLine(4, natcod, ox, oy, svc.MkID(org[0], org[1] - 1));
				svc.hexLine(3, natcod, ox, oy, svc.MkID(org[0] - 1, org[1] + DH - 1));
				svc.hexLine(2, natcod, ox, oy, svc.MkID(org[0] - 1, org[1] + DH));
				svc.hexLine(1, natcod, ox, oy, svc.MkID(org[0], org[1] + 1));
				svc.hexLine(0, natcod, ox, oy, svc.MkID(org[0] + 1, org[1] + DH));
			});
			var Idx = 0;
			while (svc.Bound[natcod].length > 0) {
				var First = svc.Bound[natcod].shift();
				svc.Poly[natcod][Idx] = [First.X1, First.Y1, First.X2, First.Y2];
				var fnd;
				do {
					fnd = 0;
					for (var i = svc.Bound[natcod].length - 1; i >= 0; i--) {
						var crt = svc.Bound[natcod][i];
						if ((Math.abs(crt.X1 - First.X2) <= 2) && (Math.abs(crt.Y1 - First.Y2) <= 2)) {
							svc.Poly[natcod][Idx].push(crt.X2, crt.Y2);
							First.X2 = crt.X2;
							First.Y2 = crt.Y2;
							svc.Bound[natcod].splice(i, 1);
							fnd++;
						}
					}
				} while (fnd > 0);
				Idx++;
			}
		}

		svc.ComputeBoundaries = function () {
			angular.forEach(svc.Map.Nations, function (nation, code) {
				svc.ComputeBoundary(code);
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
			svc.ComputeBoundaries();
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
