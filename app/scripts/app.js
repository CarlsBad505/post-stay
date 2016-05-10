(function() {
	function config($stateProvider, $locationProvider) {
		$locationProvider
			.html5mode({
			enabled: true,
			requireBase: false
		});
		
		$stateProvider
			.state('home', {
				url: '/',
				controller: 'HomeCtrl as home',
				templateUrl: '/templates/home.html'
		});
		
	}
	
	angular
		.module('postStay', ['ui.router', 'firebase', 'ui.bootstrap'])
		.config(config)
})();