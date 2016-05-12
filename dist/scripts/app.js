(function() {
	function config($stateProvider, $locationProvider) {
		$locationProvider
			.html5Mode({
			enabled: true,
			requireBase: false
		});
		
		$stateProvider
			.state('home', {
				url: '/',
				controller: 'HomeCtrl as vm',
				templateUrl: '/templates/home.html'
		});
		
	}
	
	angular
		.module('postStay', ['ui.router', 'firebase', 'ui.bootstrap'])
		.config(config);
})();