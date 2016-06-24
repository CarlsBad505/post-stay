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
				controller: 'NavCtrl as nav',
				templateUrl: '/templates/home.html',
			})
			.state('track-claims', {
				url: '/track-claims',
				controller: 'ClaimsCtrl as cl',
				templateUrl: '/templates/track_claims.html'
			});
		
	}
	
	angular
		.module('postStay', ['ui.router', 'firebase', 'ui.bootstrap', 'ui.grid'])
		.config(config);
})();