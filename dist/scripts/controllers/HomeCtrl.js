//(function() {
//	function HomeCtrl(User, Alert, $uibModal, $scope) {
//		var vm = this;
//		
//		vm.signUpModal = function() {
//			var modalInstance = $uibModal.open({
//				templateUrl: '/templates/sign_up.html',
//				controller: function($scope, $uibModalInstance) {
//					$scope.newUser = {
//						email: '',
//						password: ''
//					};
//					$scope.cancel = function() {
//						$uibModalInstance.dismiss('cancel');
//					};
//					$scope.create = function() {
//						$uibModalInstance.close($scope.newUser); 
//					};
//				},
//				size: 'md'
//			});
//			
//			modalInstance.result.then(function(data) {
//				User.createUser(data, function(error, userData){
//					if (error) {
//						console.log("Error creating user:", error);
//						Alert.addAlert("danger", "Whoops, your inputs are wrong, please try again!");
//					} else {
//						console.log("Successfully created user account with uid:", userData.uid);
//						Alert.addAlert("success", "Radical, welcome to the gang. Please log in!");
//					}
//					$scope.$apply();
//				});
//			});
//		};
//		
//		vm.logInModal = function() {
//			var modalInstance = $uibModal.open({
//				templateUrl: '/templates/log_in.html',
//				controller: function($scope, $uibModalInstance) {
//					$scope.existingUser = {
//						email: '',
//						password: ''
//					};
//					$scope.cancel = function() {
//						$uibModalInstance.dismiss('cancel');
//					};
//					$scope.create = function() {
//						$uibModalInstance.close($scope.existingUser);
//					};
//					$scope.forgotPassword = function() {
//						vm.forgotPassword();
//						$uibModalInstance.dismiss('cancel');
//					}
//				},
//				size: 'md'
//			});
//			
//			modalInstance.result.then(function(data) {
//				User.logInUser(data, function() {
//					vm.currentUser = User.getCurrentUser();
//					vm.currentUserShow = true;
//					vm.loggedIn = true;
//					$scope.$apply();
//				});
//			});
//		};
//	};
//	
//	angular
//		.module('postStay')
//		.controller('HomeCtrl', ['User', 'Alert', '$uibModal', '$scope', HomeCtrl]);
//})();