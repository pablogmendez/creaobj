
routerApp.controller('CreadorObjetosControl', function($scope, $location, $http, GlobalService, GlobalConf){
	$scope.paso=1;
	$scope.totalPasos=3;
	$scope.mostrarFormulario=true;
	$scope.mostrarResumen=false;
	$scope.mostrarCreaObjetos=false;
	$scope.mostrarProductos=false;
	$scope.mostrarError=false;
	$scope.loadingProducts = true;
	$scope.loadingUser = false;
	$scope.datosUsuarioOk = false;
	$scope.desaEvo = false;

	$http.get(GlobalConf.creador_objetos_url + "?action=getProducts&user=" + GlobalService.usuario + "&pass=" + GlobalService.password)
	.then(function successCallback(response) {
		if(response.data.status == 0) {
			$scope.loadingProducts = false;
			$scope.mostrarProductos = true;
			$scope.mostrarError = false;
			$scope.productos = response.data.data;
		}
		else {
			$scope.mensajeConsultaProductos = response.data.message;
			$scope.loadingProducts = false;
			$scope.mostrarError = true;
		}
	 }, function errorCallback(response) {
	    $scope.mensajeConsultaProductos = "Error inespereado. (" + response.status + ") " + response.statusText;
	   	$scope.loadingProducts = false;
	   	$scope.mostrarError = true;
	 });

	$scope.resumenOperacion = function() {
		var dmOk=false, rcOk=false;

		$scope.submitted=true;
		dmOk = ($scope.titulo) ? true : false;
		rcOk = ($scope.tipoReleaseSeleccionado && $scope.version && $scope.descripcion) ? true : false;

		// Si alguno de los puntos no esta checkeado entonces le borro los datos seteados
		if(!$scope.dimensionsChecked) {
			resetearCamposDimensions();
		}

		if(!$scope.releaseControlChecked) {
			resetearCamposReleaseControl();
		}

		if(($scope.dimensionsChecked && dmOk && !$scope.releaseControlChecked) ||
		   ($scope.releaseControlChecked && rcOk && !$scope.dimensionsChecked) ||
		   ($scope.dimensionsChecked && dmOk && $scope.releaseControlChecked && rcOk)) {
			$scope.mostrarFormulario=false;
			$scope.mostrarResumen=true;
			$scope.paso=2;
		}
	}

	$scope.productSelected = function() {
		$scope.loadingUser = true;
		$scope.datosUsuarioOk = false;
		$http.get(GlobalConf.creador_objetos_url + "?action=getDevelopers&user=" + GlobalService.usuario + "&pass=" + GlobalService.password + "&product=" + $scope.productoSeleccionado)
		.then(function successCallback(response) {
			if(response.data.status == 0) {
				$scope.desarrolladores = response.data.data;
				//////////////
				$http.get(GlobalConf.creador_objetos_url + "?action=hasEvoStreams&user=" + GlobalService.usuario + "&pass=" + GlobalService.password + "&product=" + $scope.productoSeleccionado)
				.then(function successCallback(response) {
					if(response.data.status == 0) {
						if (response.data.data[0] == "true") {
							$scope.desaEvo = true;
						}
						//////////////////
						$http.get(GlobalConf.creador_objetos_url + "?action=getReleseTypes&user=" + GlobalService.usuario + "&pass=" + GlobalService.password + "&product=" + $scope.productoSeleccionado)
						.then(function successCallback(response) {
							if(response.data.status == 0) {
								$scope.releasesType = response.data.data;
								$scope.datosUsuarioOk = true;
							}
							else {
								$scope.mensajeConsultaUsuario = response.data.message;
							}
						}, function errorCallback(response) {
				    		$scope.mensajeConsultaUsuario = "Error inespereado. (" + response.status + ") " + response.statusText;
				 		});
						//////////////////
					}
					else {
						$scope.mensajeConsultaUsuario = response.data.message;
					}
				}, function errorCallback(response) {
		    		$scope.mensajeConsultaUsuario = "Error inespereado. (" + response.status + ") " + response.statusText;
		 		});
		 		/////////////
			}
			else {
				$scope.mensajeConsultaUsuario = response.data.message;
			}
		 }, function errorCallback(response) {
		    $scope.mensajeConsultaUsuario = "Error inespereado. (" + response.status + ") " + response.statusText;
		 });
		$scope.loadingUser = false;
	}

	$scope.formularioAlta = function() {
		$scope.mostrarFormulario=true;
		$scope.mostrarResumen=false;
		$scope.paso=1;
	}

	$scope.crearObjetos = function() {
		$scope.mostrarCreaObjetos=true;
		$scope.mostrarResumen=false;
		$scope.paso=3;
	}

	$scope.volverAlInicio = function() {
		$scope.mostrarFormulario=true;
		$scope.mostrarCreaObjetos=false;
		$scope.submitted=false;
		$scope.paso=1;
		$scope.productoSeleccionado="";
		// Reseteo los campos de Dimensions
		resetearCamposDimensions();
		// Reseteo los campos de Release Control
		resetearCamposReleaseControl();
	}

	resetearCamposDimensions = function() {
		$scope.dimensionsChecked=false;
		$scope.titulo="";
		$scope.desarrolloEvoChecked=false;
		$scope.crearTaskChecked=false;
		$scope.desarrolladorSeleccionado="";
	}

	resetearCamposReleaseControl = function() {
		$scope.releaseControlChecked=false;
		$scope.tipoReleaseSeleccionado="";
		$scope.ppm="";
		$scope.version="";
		$scope.descripcion="";
	}

});