(function() {
	function Claims($firebaseArray, Alert) {
		var ref = new Firebase("https://post-stay.firebaseio.com");
		var claimRef = $firebaseArray(ref.child('claims'));
		
		var claimsService = {
			newClaim: newClaim,
			getClaims: getClaims
		};
		
		return claimsService;
		
		function getClaims() {
			return claimRef;
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
		
	}
	
	
	angular
		.module('postStay')
		.factory('Claims', ['$firebaseArray', 'Alert', Claims]);
})();