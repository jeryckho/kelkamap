angular.module('SvgMapApp', ['angular-loading-bar', 'firebase'])
	.controller('MainCtrl', ['$scope', '$http', 'DataSvc', 'FbSvc', function ($scope, $http, DataSvc, FbSvc) {
		$scope.vBox = {
			Min: { x: -2640, y: -2520, w: 980, h: 980 },
			Max: { x: 3240, y: 3360, w: 5880, h: 5880 },
			Crt: { x: -2640, y: -2520, w: 5880, h: 5880 }
		};

		$scope.DataSvc = DataSvc;
		$scope.FbSvc = FbSvc;
		$scope.layer = { iFond: true, gHex: true };

		$scope.changeHoverRegion = function (region) {
			$scope.DataSvc.OverNation(region);
		};

		$scope.toZoom = function (fac, bZoom) {
			if (bZoom) {
				$scope.vBox.Crt.w /= fac;
				$scope.vBox.Crt.h /= fac;
			} else {
				$scope.vBox.Crt.w *= fac;
				$scope.vBox.Crt.h *= fac;
			}
			$scope.setBox();
		}

		$scope.toPan = function (mW, mH) {
			$scope.vBox.Crt.x += mW * $scope.vBox.Crt.w;
			$scope.vBox.Crt.y += mH * $scope.vBox.Crt.h;
			$scope.setBox();
		}

		$scope.setBox = function () {
			if ($scope.vBox.Crt.w > $scope.vBox.Max.w) $scope.vBox.Crt.w = $scope.vBox.Max.w;
			if ($scope.vBox.Crt.h > $scope.vBox.Max.h) $scope.vBox.Crt.h = $scope.vBox.Max.h;
			if ($scope.vBox.Crt.w < $scope.vBox.Min.w) $scope.vBox.Crt.w = $scope.vBox.Min.w;
			if ($scope.vBox.Crt.h < $scope.vBox.Min.h) $scope.vBox.Crt.h = $scope.vBox.Min.h;

			if ($scope.vBox.Crt.x < $scope.vBox.Min.x) $scope.vBox.Crt.x = $scope.vBox.Min.x;
			if ($scope.vBox.Crt.y < $scope.vBox.Min.y) $scope.vBox.Crt.y = $scope.vBox.Min.y;
			if ($scope.vBox.Crt.x + $scope.vBox.Crt.w > $scope.vBox.Max.x) $scope.vBox.Crt.x = $scope.vBox.Max.x - $scope.vBox.Crt.w;
			if ($scope.vBox.Crt.y + $scope.vBox.Crt.h > $scope.vBox.Max.y) $scope.vBox.Crt.y = $scope.vBox.Max.y - $scope.vBox.Crt.h;
			$scope.ngViewBox = $scope.vBox.Crt.x + " " + $scope.vBox.Crt.y + " " + $scope.vBox.Crt.w + " " + $scope.vBox.Crt.h;
		};

		$scope.tog = function (id) {
			$scope.layer[id] = !$scope.layer[id];
		}

		$scope.connect = function () {
			$scope.FbSvc.login($scope.alog, $scope.apwd)
				.then(function (data) {
					$scope.cnt = "OK";
				})
				.catch(function (error) {
					$scope.cnt = error;
				});
		}

		$scope.setBox();
	}]);
