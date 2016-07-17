(function () {
    'use strict';

    angular.module('vibes')
        .controller('RateAppCtrl', RateAppCtrl);

    function RateAppCtrl() {
        var vm = this;
        vm.rateIOS = rateIOS;
        vm.rateAndroid = rateAndroid;

        function rateIOS() {
            window.open(
                'https://itunes.apple.com/us/app/bindas/id1120991525?mt=8',
                '_system',
                'location=yes');
            return false;
        }

        function rateAndroid() {
            window.open(
                'https://play.google.com/store/apps/details?id=com.ionicframework.example146317',
                '_system',
                'location=yes');
            return false;
        }
    }
})();
