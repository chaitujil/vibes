(function () {
    'use strict';

    angular.module('vibes')
        .controller('ContactUsCtrl', contactUsCtrl);

    function contactUsCtrl() {
        var vm = this;

        vm.email = "vibesdeveloper@gmail.com";
    }
})();