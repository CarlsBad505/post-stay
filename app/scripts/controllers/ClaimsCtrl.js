(function() {
	function ClaimsCtrl($uibModal, Claims, Alert) {
		var cl = this;
		
		cl.claims = Claims.getClaims();
		
		cl.newClaimModal = function() {
			var modalInstance = $uibModal.open({
				templateUrl: '/templates/new_claim.html',
				controller: function($scope, $uibModalInstance) {
//					$scope.new = {
//						caseNumber: null,
//						damageClaim: 'NO',
//						damageClaimNumber: '',
//						reportedDate: '',
//						travelerCheckoutDate: '',
//						resolved: 'NO',
//						itemOne: {
//							name: '',
//							photo: 'NO',
//							invoice: 'NO',
//							chargeSuccess: 'NO'
//						}
//					};
					$scope.new = {};
					$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel');
					};
					$scope.create = function() {
						$uibModalInstance.close($scope.new);
					};
				},
				size: 'lg'
			});
			
			modalInstance.result.then(function(data) {
				Claims.newClaim(data);
			});
		};
	}
	
	angular
		.module('postStay')
		.controller('ClaimsCtrl', ['$uibModal', 'Claims', 'Alert', ClaimsCtrl]);
})();