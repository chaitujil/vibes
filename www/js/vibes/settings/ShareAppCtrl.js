(function () {
    'use strict';

    angular.module('vibes')
        .controller('ShareThisAppCtrl', ShareThisAppCtrl);

    ShareThisAppCtrl.$inject = [];

    function ShareThisAppCtrl() {
        var vm = this;
        vm.shareViaTwitter = shareViaTwitter;
        vm.shareViaFacebook = shareViaFacebook;

        function shareViaTwitter() {
        }

        function shareViaFacebook() {
        }
    }
})();