
routerApp.controller('LoginControl', function($scope, $location){
	$scope.validarLogin = function() {
		$scope.submitted=true;
		$scope.usuarioOk=true;
		$scope.passwordOk=true;
		if($scope.usuario && $scope.password  && $scope.usuarioOk && $scope.passwordOk) {
			$location.path('/dashboard');			
		}
	};
	
});