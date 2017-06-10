(function () {
    'use strict';

    angular.module('vibes')
        .controller('ShareThisAppCtrl', ShareThisAppCtrl);

    ShareThisAppCtrl.$inject = ['$cordovaSocialSharing'];

    function ShareThisAppCtrl($cordovaSocialSharing) {
        var vm = this;
        vm.shareViaTwitter = shareViaTwitter;
        vm.shareViaFacebook = shareViaFacebook;
        vm.shareViaWhatsApp = shareViaWhatsApp;

        function shareViaTwitter() {
            window.plugins.socialsharing.shareViaTwitter(
                '',
                null,
                ionic.Platform.isIOS() ? 'https://itunes.apple.com/us/app/bindas/id1120991525?mt=8' : 'https://play.google.com/store/apps/details?id=com.ionicframework.example146317'
            );
        }

        function shareViaFacebook() {
            window.plugins.socialsharing.shareViaFacebook(
                '',
                null,
                ionic.Platform.isIOS() ? 'https://itunes.apple.com/us/app/bindas/id1120991525?mt=8' : 'https://play.google.com/store/apps/details?id=com.ionicframework.example146317'
            );
        }

        function shareViaWhatsApp() {
            window.plugins.socialsharing.shareViaWhatsApp(
                '',
                null,
                ionic.Platform.isIOS() ? 'https://itunes.apple.com/us/app/bindas/id1120991525?mt=8' : 'https://play.google.com/store/apps/details?id=com.ionicframework.example146317'
            );
        }
    }
})();
