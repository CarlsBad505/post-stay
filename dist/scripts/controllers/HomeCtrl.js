(function() {
	function HomeCtrl(User, Alert, $uibModal, $scope) {
		var vm = this;
		
		vm.currentUser = User.currentUser;
		// vm.closeAlert = Alert.closeAlert; // Fix this after you get the alerts to work
		
		vm.alerts = Alert.get();
		
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
				User.createUser(data, function(){
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
				},
				size: 'md'
			});
			
			modalInstance.result.then(function(data) {
				User.logInUser(data);
			});
		};
	};
	
	angular
		.module('postStay')
		.controller('HomeCtrl', ['User', 'Alert', '$uibModal', '$scope', HomeCtrl]);
})();