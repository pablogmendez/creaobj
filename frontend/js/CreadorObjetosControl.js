
routerApp.controller('CreadorObjetosControl', function($scope, $location){
	$scope.paso=1;
	$scope.totalPasos=3;
	$scope.mostrarFormulario=true;
	$scope.mostrarResumen=false;
	$scope.mostrarCreaObjetos=false;

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