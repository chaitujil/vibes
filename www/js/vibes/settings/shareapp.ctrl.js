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
            window.plugins.socialsharing.shareViaTwitter (
                null,
                null /* img */,
                'https://play.google.com/store/apps/details?id=com.ionicframework.example146317' /* url */
            );
        }

        function shareViaFacebook() {
            window.plugins.socialsharing.shareViaFacebook(
                null,
                null /* img */,
                'https://play.google.com/store/apps/details?id=com.ionicframework.example146317' /* url */
            );
        }

        function shareViaWhatsApp() {
            window.plugins.socialsharing.shareViaWhatsApp(
                'Message via WhatsApp',
                null /* img */,
                'https://play.google.com/store/apps/details?id=com.ionicframework.example146317' /* url */
            );
        }
    }
})();