(function() {
	function User($firebaseArray, Alert){
		var ref = new Firebase("https://post-stay.firebaseio.com");
		var authData = ref.getAuth();
		var currentUser = '';
		
		var users = {
			createUser: createUser,
			logInUser: logInUser,
			currentUser: currentUser,
		};
		
		return users;
		
		function createUser(userObject, callback) {
			ref.createUser(userObject, function(error, userData) {
				if (error) {
					console.log("Error creating user:", error);
					Alert.addAlert("danger", "Error Message");
				} else {
					console.log("Successfully created user account with uid:", userData.uid);
					Alert.addAlert("success", "Account created successfully!");
				}
				callback();
			});
		}
		
		function logInUser(userObject) {
			ref.authWithPassword(userObject, function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated successfully with payload:", authData);
					Alert.addAlert("success", "Logged in successfully!");
					//currentUser = authData.password.email; // Not working currently
				}
			});
		}
		
//		function currentUser(authData) {
//			if (authData) {
//				console.log("user is logged in");
//				Alert.addAlert("success", "Logged in successfully!");
//			} else {
//				console.log("user is logged out");
//			}
//		}
	};
	
	angular
		.module('postStay')
		.factory('User', ['$firebaseArray', 'Alert', User]);
})();