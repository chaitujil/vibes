(function () {
    'use strict';

    angular.module('vibes')
        .factory('UtilService', UtilService);

    UtilService.$inject = ['$rootScope', '$log', '$ionicLoading', '$ionicPopup'];

    function UtilService($rootScope, $log, $ionicLoading, $ionicPopup) {
        var service = {
            showSpinner: showSpinner,
            hideSpinner: hideSpinner,
            showConnectionAlert: showConnectionAlert,
            hideConnectionAlert: hideConnectionAlert
        };

        return service;

        function showSpinner() {
            $ionicLoading.show({
                template: '<ion-spinner icon="spiral" class="spinner-energized"></ion-spinner>',
                duration: 3000,
            });
        }

        function hideSpinner() {
            $ionicLoading.hide();
        }

        function hideConnectionAlert() {
            if (typeof $rootScope.alertPopup !== 'undefined') {
                $rootScope.alertPopup.close();
            }
        }

        function showConnectionAlert() {
            // Close alert popup if it exists.
            hideConnectionAlert();
            $rootScope.alertPopup = $ionicPopup.alert({
                title: 'Connection Error',
                template: 'Please try again later!',
            });
            $timeout(function() {
                alertPopup.close(); //close the popup after 3 seconds.
            }, 3000);
        }
    }
})();
