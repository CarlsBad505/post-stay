(function() {
	function NavCtrl(User, Alert, $uibModal, $scope) {
		var nav = this;
		
		// Handles markup and ng-show logic
		nav.loggedIn = User.loggedIn();
		nav.currentUser = User.getCurrentUser();
		nav.signUpLink = User.signUpLink;
		nav.logInLink = User.logInLink;
		nav.logOutLink = User.logOutLink;
		nav.trackClaims = User.trackClaims;
		
		// Handles Alerts
		nav.alerts = Alert.alerts;
		nav.closeAlert = Alert.closeAlert;
		
		// Handles User Authentication
		nav.logOut = function() {
			User.logOut();
			nav.loggedIn = User.loggedIn();
		};
		
		nav.navLogInModal = function() {
			var modalInstance = $uibModal.open({
				templateUrl: '/templates/log_in.html',
				controller: function($scope, $uibModalInstance) {
					$scope.existingUser = {};
					$scope.cancel = function() {
						$uibModalInstance.dismiss('cancel');
					};
					$scope.create = function() {
						$uibModalInstance.close($scope.existingUser);
					};
					$scope.forgotPassword = function() {
						nav.forgotPassword();
						$uibModalInstance.dismiss('cancel');
					}
				},
				size: 'md'
			});
			
			modalInstance.result.then(function(data) {
				User.logInUser(data, function() {
					nav.loggedIn = User.loggedIn();
					nav.currentUser = User.getCurrentUser();
					$scope.$apply();
				});
			});
		};
		
		nav.forgotPassword = function() {
			var modalInstance = $uibModal.open({
				templateUrl: '/templates/forgot_password.html',
				controller: function($scope, $uibModalInstance) {
					$scope.forgot = {};
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
		
		nav.resetPassword = function() {
			var modalInstance = $uibModal.open({
				templateUrl: '/templates/reset_password.html',
				controller: function($scope, $uibModalInstance) {
					$scope.reset = {};
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
		.controller('NavCtrl', ['User', 'Alert', '$uibModal', '$scope', NavCtrl]);
})();