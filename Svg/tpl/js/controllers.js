angular.module('SvgMapApp')
	/////////////////////////////
	// Controleur partie image //
	/////////////////////////////
	.controller('ImgCtrl', ['$scope', 'Data', 'Zoom', function ($scope, Data, Zoom) {

		$scope.Data = Data;
		$scope.Zoom = Zoom;

		$scope.Zoom.setBox();
	}])

	///////////////////////////////////////
	// Controleur Administration (#/Adm) //
	///////////////////////////////////////
	.controller('AdmCtrl', ['$scope', 'Data', 'currentAuth', function ($scope, Data, currentAuth) {
		$scope.Data = Data;
		$scope.cnt = 'ADM';

		$scope.Toggle = function () {
			$scope.Data.Modif = !$scope.Data.Modif;
		}

		$scope.Add = function (what) {
			if (!$scope.Data.Map.Nations[what]) {
				$scope.Data.Map.Nations[what] = { Nom: 'Nouveau' };
				$scope.New = '';
			}
			$scope.Data.OverNation(what);
		}

		$scope.Vide = function () {
			$scope.Data.OverNation("");
		}

		$scope.Xport = function () {
			$scope.Xpt = $scope.Data.Xport();
			$scope.Json = true;
		}

	}])

	//////////////////////////////
	// Controleur Login (#/Log) //
	//////////////////////////////
	.controller('LogCtrl', ['$scope', 'Auth', '$location', function ($scope, Auth, $location) {
		$scope.Auth = Auth;
		$scope.cnt = 'LOG';

		$scope.connect = function () {
			$scope.Auth.login($scope.alog, $scope.apwd)
				.then(function (data) {
					$scope.cnt = 'OK';
					$location.path('/Adm');
				})
				.catch(function (error) {
					$scope.cnt = error;
				});
		}
		$scope.unlog = function () {
			$scope.Auth.logout()
				.then(function (data) {
					$scope.cnt = '-';
					$location.path('/');
				})
				.catch(function (error) {
					$scope.cnt = error;
				});
		}
	}])

	//////////////////////////
	// Controleur Info (#/) //
	//////////////////////////
	.controller('InfoCtrl', ['$scope', 'Data', 'Auth', 'Zoom', function ($scope, Data, Auth, Zoom) {
		$scope.Auth = Auth;
		$scope.Data = Data;
		$scope.Zoom = Zoom;
	}]);
