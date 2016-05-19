(function() {
	function User(Alert){
		var ref = new Firebase("https://post-stay.firebaseio.com");
		var authData = ref.getAuth();
		
		var users = {
			createUser: createUser,
			logInUser: logInUser,
			getCurrentUser: getCurrentUser,
			logOut: logOut,
			forgotPassword: forgotPassword,
			resetPassword: resetPassword
		};
		
		return users;
		
		function getCurrentUser() {
			if (authData) {
				return "Welcome - " + authData.password.email;
			} else {
				return '';
			}
		}
		
		function logOut() {
			ref.unauth();
			Alert.addAlert("warning", "What? You're leaving already? Goodbye!");
		}
		
		function createUser(userObj, callback) {
			ref.createUser({
				email: userObj.email,
				password: userObj.password
			}, callback);
		}
		
		function logInUser(userObj, callback) {
			ref.authWithPassword({
				email: userObj.email,
				password: userObj.password
			}, function(error, authData) {
				if (error) {
					console.log("Login Failed!", error); // Comment out when done testing
					Alert.addAlert("danger", "Invalid credentials, please try again!")
				} else {
					console.log("Authenticated successfully with payload:", authData); // Comment out when done testing
					Alert.addAlert("success", "Awwww yeah, logged in successfully!");
				}
				callback();
			});
		}
		
		function forgotPassword(email, callback) {
			ref.resetPassword({ email: email }, function(error) {
				if(error) {
					console.log("Error: ", error); // Comment out when done testing
					Alert.addAlert("danger", "Couldn't find that email, please try again.");
				} else {
					console.log("Password reset email sent successfully!"); // Comment out when done testing
					Alert.addAlert("success", "Check your inbox, we sent you the password reset link!");
				}
				callback();
			});
		}
		
		function resetPassword(userObj, callback) {
			ref.changePassword({
				email: userObj.email,
				oldPassword: userObj.oldPassword,
				newPassword: userObj.newPassword
			}, function(error) {
				if (error) {
					console.log("Error: ", error);
					Alert.addAlert("danger", "Whoops, check your inputs and try again!");
				} else {
					console.log("Password changed successfully!");
					Alert.addAlert("success", "Well done, password changed successfully!");
				}
				callback();
			});
			
		}
	};
	
	angular
		.module('postStay')
		.factory('User', ['Alert', User]);
})();