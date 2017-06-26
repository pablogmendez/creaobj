
routerApp.controller('LoginControl', function($scope, $location, $http, GlobalService, GlobalConf){
	$scope.validarLogin = function() {
		$scope.submitted = true;
		$scope.credValidadas = false;
		$scope.mensajeValidacion = "";
		$scope.loading = false;

		if($scope.usuario && $scope.password){
			$scope.loading = true;
			$http.get(GlobalConf.creador_objetos_url + "?action=authenticateUser&user=" + $scope.usuario + "&pass=" + $scope.password)
			.then(function successCallback(response) {
				if(response.data.status == 0) {
					$scope.usuarioOk = true;
					$scope.passwordOk = true;
					$scope.loading = false;
					GlobalService.usuario = $scope.usuario;
					GlobalService.password = $scope.password;
					$location.path('/dashboard');
				}
				else {
					$scope.mensajeValidacion = response.data.message;
					$scope.credValidadas = true;
					$scope.loading = false;
				}
			 }, function errorCallback(response) {
			    $scope.mensajeValidacion = "Error inespereado. (" + response.status + ") " + response.statusText;
			    $scope.credValidadas = true;
			   	$scope.loading = false;
			 });
		}
	};
	
});