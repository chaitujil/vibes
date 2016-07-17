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
                //'https://play.google.com/store/apps/details?id=com.ionicframework.example146317' /* url */
                'https://itunes.apple.com/us/app/bindas/id1120991525?mt=8' /* url */
            );
        }

        function shareViaFacebook() {
            window.plugins.socialsharing.shareViaFacebook(
                '',
                null,
                //'https://play.google.com/store/apps/details?id=com.ionicframework.example146317' /* url */
                'https://itunes.apple.com/us/app/bindas/id1120991525?mt=8' /* url */
            );
        }

        function shareViaWhatsApp() {
            window.plugins.socialsharing.shareViaWhatsApp(
                '',
                null,
                //'https://play.google.com/store/apps/details?id=com.ionicframework.example146317' /* url */
                'https://itunes.apple.com/us/app/bindas/id1120991525?mt=8' /* url */
            );
        }
    }
})();
