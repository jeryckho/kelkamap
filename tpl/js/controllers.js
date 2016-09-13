app
	/////////////////////////////
	// Controleur partie image //
	/////////////////////////////
	.controller('ImgCtrl', ['Data', 'Zoom', function (Data, Zoom) {
		var vm = this;
		vm.Data = Data;
		vm.Zoom = Zoom;

		vm.Zoom.setBox();
	}])

	///////////////////////////////////////
	// Controleur Administration (#/Adm) //
	///////////////////////////////////////
	.controller('AdmCtrl', ['Data', 'currentAuth', function (Data, currentAuth) {
		var vm = this;
		vm.Data = Data;
		vm.cnt = 'ADM';

		vm.Toggle = function () {
			vm.Data.Modif = !vm.Data.Modif;
		}

		vm.Add = function (what) {
			if (!vm.Data.Map.Nations[what]) {
				vm.Data.Map.Nations[what] = { Nom: 'Nouveau' };
				vm.New = '';
			}
			vm.Data.OverNation(what);
		}

		vm.Vide = function () {
			vm.New = "";
			vm.Data.OverNation("");
		}

		vm.Xport = function () {
			vm.Xpt = vm.Data.Xport();
			vm.Json = true;
		}
	}])

	//////////////////////////////
	// Controleur Login (#/Log) //
	//////////////////////////////
	.controller('LogCtrl', ['Auth', '$location', function (Auth, $location) {
		var vm = this;
		vm.Auth = Auth;
		vm.cnt = 'LOG';

		vm.connect = function (alog, apwd) {
			vm.Auth.login(alog, apwd)
				.then(function (data) {
					vm.cnt = 'OK';
					$location.path('/Adm');
				})
				.catch(function (error) {
					vm.cnt = error;
				});
		}
		vm.unlog = function () {
			vm.Auth.logout()
				.then(function (data) {
					vm.cnt = '-';
					$location.path('/');
				})
				.catch(function (error) {
					vm.cnt = error;
				});
		}
	}])

	//////////////////////////
	// Controleur Info (#/) //
	//////////////////////////
	.controller('InfoCtrl', ['Data', 'Auth', 'Zoom', function (Data, Auth, Zoom) {
		var vm = this;
		vm.Auth = Auth;
		vm.Data = Data;
		vm.Zoom = Zoom;
	}]);
