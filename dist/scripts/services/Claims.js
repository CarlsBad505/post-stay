(function() {
	function Claims($firebaseArray, Alert) {
		var ref = new Firebase("https://post-stay.firebaseio.com");
		var claimRef = $firebaseArray(ref.child('claims'));
		
		var claimsService = {
			newClaim: newClaim,
			getClaims: getClaims,
			editClaim: editClaim,
			getSpecificClaim: getSpecificClaim
		};
		
		return claimsService;
		
		function getClaims() {
			for (var claim in claimRef) {
				claim.reportedDate = new Date(claim.reportedDate).toDateString();
			}
			return claimRef;
		}
		
		function getSpecificClaim(id) {
			return claimRef.$getRecord(id);
		}
		
		function newClaim(submittedObj) {
			var newClaimObj = {
				caseNumber: submittedObj.caseNumber,
				damageClaim: submittedObj.damageClaim,
				damageClaimNumber: submittedObj.damageClaimNumber,
				reportedDate: submittedObj.reportedDate,
				travelerCheckoutDate: submittedObj.travelerCheckoutDate,
				resolved: submittedObj.resolved,
				itemOne: {
					name: submittedObj.itemOne.name,
					photo: submittedObj.itemOne.photo,
					invoice: submittedObj.itemOne.invoice,
					chargeSuccess: submittedObj.itemOne.chargeSuccess
				}	
			};
			if (claimRef.$add(newClaimObj)) {
				Alert.addAlert('success', 'You successfully added a new claim');
			} else {
				Alert.addAlert('danger', 'You messed something up, please try again');
			}
		}
		
		function editClaim(submittedObj) {
			var editClaimRef = claimRef.$getRecord(submittedObj.id);
			
			editClaimRef.caseNumber = submittedObj.caseNumber,
			editClaimRef.damageClaim = submittedObj.damageClaim,
			editClaimRef.damageClaimNumber = submittedObj.damageClaimNumber,
			editClaimRef.reportedDate = submittedObj.reportedDate,
			editClaimRef.travelerCheckoutDate = submittedObj.travelerCheckoutDate,
			editClaimRef.resolved = submittedObj.resolved,

			editClaimRef.itemOne.name = submittedObj.itemOne.name,
			editClaimRef.itemOne.photo = submittedObj.itemOne.photo,
			editClaimRef.itemOne.invoice = submittedObj.itemOne.invoice,
			editClaimRef.itemOne.chargeSuccess = submittedObj.itemOne.chargeSuccess

			if (claimRef.$save(editClaimRef)) {
				Alert.addAlert('success', 'You successfully editted this claim');
			} else {
				Alert.addAlert('danger', 'Something went wrong, please try again')
			}
		}
		
	}
	
	
	angular
		.module('postStay')
		.factory('Claims', ['$firebaseArray', 'Alert', Claims]);
})();