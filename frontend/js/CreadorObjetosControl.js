
routerApp.controller('CreadorObjetosControl', function($scope, $location){
	$scope.paso=1;
	$scope.totalPasos=3;
	$scope.mostrarFormulario=true;
	$scope.mostrarResumen=false;
	$scope.mostrarCreaObjetos=false;

	$scope.resumenOperacion = function() {
		$scope.mostrarFormulario=false;
		$scope.mostrarResumen=true;
		$scope.paso=2;
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
		$scope.paso=1;
	}

});