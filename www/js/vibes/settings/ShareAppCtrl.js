(function () {
    'use strict';

    angular.module('vibes')
        .controller('ShareThisAppCtrl', ShareThisAppCtrl);

    ShareThisAppCtrl.$inject = ['$cordovaSocialSharing'];

    function ShareThisAppCtrl($cordovaSocialSharing) {
        var vm = this;
        vm.shareViaTwitter = shareViaTwitter;
        vm.shareViaFacebook = shareViaFacebook;

        function shareViaTwitter() {
            $cordovaSocialSharing
                .shareViaTwitter('Message via Twitter', null /* img */, null /* url */)
                .then(function (result) {
                    console.log('share ok');
                }, function (err) {
                    alert(err)
                });
        }

        function shareViaFacebook() {
            window.plugins.socialsharing.shareViaFacebook('Message via Facebook', null /* img */, null /* url */, function () {
                console.log('share ok');
            }, function (errormsg) {
                alert(errormsg)
            });
        }
    }
})();