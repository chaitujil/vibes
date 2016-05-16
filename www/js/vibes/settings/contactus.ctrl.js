(function () {
    'use strict';

    angular.module('vibes')
        .controller('ContactUsCtrl', ContactUsCtrl);

    function ContactUsCtrl() {
        var vm = this;

        vm.email = "developervibes@gmail.com";
    }
})();