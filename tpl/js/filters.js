app
	.filter('map_colour', [function () {
		return function (input) {
			var b = 255 - Math.floor(input * 255);
			var g = Math.floor(input * 255);
			return "rgba(255," + g + "," + b + ",1)";
		}
	}])
	.filter('orderObjectBy', function () {
		return function (items, field, reverse) {

			function isNumeric(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
			}

			var filtered = [];

			angular.forEach(items, function (item, key) {
            item.key = key;
            filtered.push(item);
			});

			function index(obj, i) {
            return obj[i];
			}

			function Compare(elem, a, b) {
            var comparator;
				var invertor = 1;
				if (elem.substr(0, 1) === '-') {
					invertor = -1;
					elem = elem.slice(1);
				}
            var reducedA = elem.split('.').reduce(index, a);
            var reducedB = elem.split('.').reduce(index, b);

            if (isNumeric(reducedA) && isNumeric(reducedB)) {
					reducedA = Number(reducedA);
					reducedB = Number(reducedB);
            }

            if (reducedA === reducedB) {
					comparator = 0;
            } else {
					comparator = reducedA > reducedB ? 1 : -1;
            }

            return invertor * comparator;
			}

			filtered.sort(function (a, b) {
				if (angular.isArray(field)) {
					var compGlob = 0;
					angular.forEach(field, function (elem) {
						var compLoc = Compare(elem, a, b);
						if (compGlob === 0) {
							compGlob = compLoc;
						}
					});
					return compGlob;
				} else {
					return Compare(field, a, b);
				}
			});

			if (reverse) {
            filtered.reverse();
			}

			return filtered;
		};
	})
	.filter('population', function () {
		return function (input) {
			var out = "";
			var size = parseInt(input);
			if (isNaN(size)) return "0";
			var unit = ["", "k", "M", "G", "T", "P", "E", "Z", "Y"];
			var i = 0;
			while (size >= 1000) {
				size = Math.round(size);
				i++;
				size = size / 1000;
			}
			out = size + unit[i];
			return out;
		}
	});

