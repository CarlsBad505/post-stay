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
			return alerts.splice(index, 1);	
		}
		
		function addAlert(type, msg) {
			return alerts.push({type: type, msg: msg});	
		}
		
		function get() {
			return alerts;
		}
	}
	
	angular
		.module('postStay')
		.factory('Alert', Alert);
})();