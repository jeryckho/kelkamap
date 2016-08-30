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

			filtered.sort(function (a, b) {
            var comparator;
            var reducedA = field.split('.').reduce(index, a);
            var reducedB = field.split('.').reduce(index, b);

            if (isNumeric(reducedA) && isNumeric(reducedB)) {
					reducedA = Number(reducedA);
					reducedB = Number(reducedB);
            }

            if (reducedA === reducedB) {
					comparator = 0;
            } else {
					comparator = reducedA > reducedB ? 1 : -1;
            }

            return comparator;
			});

			if (reverse) {
            filtered.reverse();
			}

			return filtered;
		};
	});

