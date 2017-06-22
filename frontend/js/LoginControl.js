
routerApp.controller('LoginControl', function($scope, $location){
	$scope.validarLogin = function() {
		
		$location.path('/dashboard');
	};
	
});