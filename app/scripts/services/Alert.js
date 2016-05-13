(function() {
	function Alert() {
		var alerts = [];
		
		var alertService = {
			alerts: alerts,
			closeAlert: closeAlert,
			addAlert: addAlert,
			get: get
		}
		
		return alertService;
		
		function closeAlert(index) {
			alerts.splice(index, 1);	
		}
		
		function addAlert(type, msg) {
			alerts.push({type: type, msg: msg});	
		}
		
		function get() {
			return alerts;
		};
	}
	
	angular
		.module('postStay')
		.factory('Alert', Alert);
})();