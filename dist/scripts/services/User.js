(function() {
	function User($firebaseArray){
		var ref = new Firebase("https://post-stay.firebaseio.com");
		var currentUser = '';
		
		var users = {
			createUser: createUser,
			logInUser: logInUser,
			currentUser: currentUser
		};
		
		return users;
		
		function createUser(userObject) {
			ref.createUser(userObject, function(error, userData) {
				if (error) {
					console.log("Error creating user:", error);
				} else {
					console.log("Successfully created user account with uid:", userData.uid);
				}
			});
		}
		
		function logInUser(userObject) {
			ref.authWithPassword(userObject, function(error, authData) {
				if (error) {
					console.log("Login Failed!", error);
				} else {
					console.log("Authenticated successfully with payload:", authData);
					currentUser = authData.password.email; // Not working currently
				}
			});
		}
	};
	
	angular
		.module('postStay')
		.factory('User', ['$firebaseArray', User]);
})();