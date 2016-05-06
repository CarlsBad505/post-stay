(function() {
	function config($stateProvider, $locationProvider) {
		$locationProvider
			.html5mode({
			enabled: true,
			requireBase: false
		});
		
		
	}
	
	angular
		.module('postStay', ['ui.router', 'firebase', 'ui.bootstrap'])
		.config(config)
})();