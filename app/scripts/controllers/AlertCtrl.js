// I think this should be a factory service instead. Then you can inject it into HomeCtrl and call the right alert
// on the right function... try it.

(function() {
	function AlertCtrl() {
		this.alerts = [
			{ type: 'success', msg: 'You logged in successfully!' }
		];
		
		this.closeAlert = function(index) {
			$scope.alerts.splice(index, 1);
		};
	}
	
	angular
		.module('postStay')
		.controller('AlertCtrl', AlertCtrl);
})();