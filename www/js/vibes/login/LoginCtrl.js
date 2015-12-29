(function () {
    'use strict';

    angular.module('vibes')
        .controller('LoginCtrl', loginCtrl);

    loginCtrl.$inject = ['$scope', 'LoginService', '$ionicPopup', '$state'];

    function loginCtrl($scope, LoginService, $ionicPopup, $state) {
        $scope.data = {};

        $scope.login = function() {
            LoginService.loginUser($scope.data.username, $scope.data.password).success(function (data) {
                $state.go('tab.channels');
            }).error(function(data) {
                var alertPopup = $ionicPopup.alert({
                    title: 'Login failed!',
                    template: 'Please check your credentials!'
                });
            });
        }
    }
})();