(function() {
	function ClaimsCtrl($uibModal, Claims, Alert) {
		var cl = this;
		var claimsData = Claims.getClaims();
		
		function dateToJSON(input) {
			return input.toJSON();
		};
		
		function conditional(grid, row, col, rowRenderIndex, colRenderIndex) {
          	if (grid.getCellValue(row, col) === "YES") {
            	return 'green';
          	} else {
          		return 'red';
        	};
		};
		
		cl.claims = Claims.getClaims();
		
		cl.gridOptions = {
			enableSorting: true,
			columnDefs: [
				{ name: 'caseNumber', displayName: "Case #", enableHiding: false },
				{ name: 'damageClaim', displayName: "DC Opened?", enableHiding: false },
				{ name: 'damageClaimNumber', displayName: "DC Number", enableHiding: false },
				{ name: 'resolved', displayName: "Resolved?", enableHiding: false, cellClass: conditional },
				{ name: 'reportedDate', displayName: "Reported", enableHiding: false, cellFilter: 'date' },
				{ name: 'travelerCheckoutDate', displayName: "Checkout", enableHiding: false, cellFilter: 'date' },
				{ name: 'itemOne.name', displayName: "Description", enableHiding: false, cellTooltip: true },
				{ name: 'itemOne.photo', displayName: "Photo?", enableHiding: false },
				{ name: 'itemOne.invoice', displayName: "Invoice?", enableHiding: false },
				{ name: 'itemOne.chargeSuccess', displayName: "Charged?", enableHiding: false },
				{ name: '$id', displayName: 'Edit', cellTemplate: 'edit_claim.html', maxWidth: 60, enableColumnMenu: false }
			],
			data: claimsData,
			minRowsToShow: 10,
			enableHorizontalScrollbar: 0
		}
		
		cl.newClaimModal = function() {
			var modalInstance = $uibModal.open({
				templateUrl: '/templates/new_claim.html',
				controller: function($scope, $uibModalInstance) {
					$scope.new = {
						caseNumber: null,
						damageClaim: 'NO',
						damageClaimNumber: '',
						resolved: 'NO',
						itemOne: {
							name: '',
							photo: 'NO',
							invoice: 'NO',
							chargeSuccess: 'NO'
						}
					};
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
				data.reportedDate = dateToJSON(data.reportedDate);
				data.travelerCheckoutDate = dateToJSON(data.travelerCheckoutDate);
				Claims.newClaim(data);
			});
		};
		
		cl.updateClaimsModal = function(id) {
			var key = Claims.getSpecificClaim(id);
			var modalInstance = $uibModal.open({
				templateUrl: '/templates/edit_claim.html',
				controller: function($scope, $uibModalInstance) {
					$scope.edit = {
						caseNumber: key.caseNumber,
						damageClaim: key.damageClaim,
						damageClaimNumber: key.damageClaimNumber,
						resolved: key.resolved,
						reportedDate: new Date(key.reportedDate),
						travelerCheckoutDate: new Date(key.travelerCheckoutDate),
						itemOne: {
							name: key.itemOne.name,
							photo: key.itemOne.photo,
							invoice: key.itemOne.invoice,
							chargeSuccess: key.itemOne.chargeSuccess
						},
						id: key.$id
					};
					$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel');
					};
					$scope.create = function() {
						$uibModalInstance.close($scope.edit);
					};
				},
				size: 'lg'
			});
			
			modalInstance.result.then(function(data) {
				data.reportedDate = dateToJSON(data.reportedDate);
				data.travelerCheckoutDate = dateToJSON(data.travelerCheckoutDate);
				Claims.editClaim(data);
			});
		};
	}
	
	angular
		.module('postStay')
		.controller('ClaimsCtrl', ['$uibModal', 'Claims', 'Alert', ClaimsCtrl]);
})();