(function() {
	function HomeCtrl(User, Alert, $uibModal, $scope) {
		var vm = this;
		
		vm.logInLink = "Log In";
		vm.alerts = Alert.alerts;
		vm.closeAlert = Alert.closeAlert;
		vm.logOut = function() {
			User.logOut();
			vm.currentUser = '';
			vm.logInLink = "Log In";
			vm.logOutLink = '';
			vm.trackClaims = '';
		};
		
		vm.signUpModal = function() {
			var modalInstance = $uibModal.open({
				templateUrl: '/templates/sign_up.html',
				controller: function($scope, $uibModalInstance) {
					$scope.newUser = {
						email: '',
						password: ''
					};
					$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel');
					};
					$scope.create = function() {
						$uibModalInstance.close($scope.newUser); 
					};
				},
				size: 'md'
			});
			
			modalInstance.result.then(function(data) {
				User.createUser(data, function(error, userData){
					if (error) {
						console.log("Error creating user:", error);
						Alert.addAlert("danger", "Whoops, your inputs are wrong, please try again!");
					} else {
						console.log("Successfully created user account with uid:", userData.uid);
						Alert.addAlert("success", "Radical, welcome to the gang. Please log in!");
					}
					$scope.$apply();
				});
			});
		};
		
		vm.logInModal = function() {
			var modalInstance = $uibModal.open({
				templateUrl: '/templates/log_in.html',
				controller: function($scope, $uibModalInstance) {
					$scope.existingUser = {
						email: '',
						password: ''
					};
					$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel');
					};
					$scope.create = function() {
						$uibModalInstance.close($scope.existingUser);
					};
					$scope.forgotPassword = function() {
						vm.forgotPassword();
						$uibModalInstance.dismiss('cancel');
					}
				},
				size: 'md'
			});
			
			modalInstance.result.then(function(data) {
				User.logInUser(data, function() {
					vm.currentUser = User.getCurrentUser();
					vm.logOutLink = "Log Out";
					vm.logInLink = '';
					vm.trackClaims = "Track Claims";
					$scope.$apply();
				});
			});
		};
	
		vm.forgotPassword = function() {
			var modalInstance = $uibModal.open({
				templateUrl: '/templates/forgot_password.html',
				controller: function($scope, $uibModalInstance) {
					$scope.forgot = '';
					$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel');
					};
					$scope.create = function() {
						$uibModalInstance.close($scope.forgot);
					};
				},
				size: 'md'
			});
			
			modalInstance.result.then(function(data) {
				User.forgotPassword(data, function() {
					$scope.$apply();
				});
			});
		}
		
		vm.resetPassword = function() {
			var modalInstance = $uibModal.open({
				templateUrl: '/templates/reset_password.html',
				controller: function($scope, $uibModalInstance) {
					$scope.reset = {
						email: '',
						oldPassword: '',
						newPassword: ''
					};
					$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel');
					};
					$scope.create = function() {
						$uibModalInstance.close($scope.reset);
					};
				},
				size: 'md'
			});
			
			modalInstance.result.then(function(data) {
				User.resetPassword(data, function() {
					$scope.$apply();
				});
			});
		}
	};
	
	angular
		.module('postStay')
		.controller('HomeCtrl', ['User', 'Alert', '$uibModal', '$scope', HomeCtrl]);
})();