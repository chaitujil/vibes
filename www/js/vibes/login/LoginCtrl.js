(function () {
    'use strict';

    angular.module('vibes')
        .controller('LoginCtrl', loginCtrl);

    loginCtrl.$inject = ['LoginService', '$ionicPopup', '$state'];

    function loginCtrl(LoginService, $ionicPopup, $state) {
        var vm = this;
        
        vm.data = {};
        vm.login = login;

        function login () {
            LoginService.loginUser(vm.data.username, vm.data.password).success(function (data) {
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