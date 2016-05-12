(function() {
	function HomeCtrl(User, $uibModal) {
		var vm = this;
		
		vm.currentUser = User.currentUser; 
		
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
				User.createUser(data);
			});
		}
		
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
				},
				size: 'md'
			});
			
			modalInstance.result.then(function(data) {
				User.logInUser(data);
			});
		}
	};
	
	angular
		.module('postStay')
		.controller('HomeCtrl', ['User', '$uibModal', HomeCtrl]);
})();