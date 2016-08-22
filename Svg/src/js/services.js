angular.module('SvgMapApp').factory('DataSvc', ['$http', function ($http) {
	var svc = {};

	$http.get('data/DataSvc.json').success(function (data) {
		svc.Map = data;
	});

	return svc;
}]);