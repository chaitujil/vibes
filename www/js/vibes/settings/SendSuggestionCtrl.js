(function () {
    'use strict';

    angular.module('vibes')
        .controller('SendSuggestionCtrl', SendSuggestionCtrl);

    SendSuggestionCtrl.$inject = ['$log'];

    function SendSuggestionCtrl($log) {
        var vm = this;

        vm.sendSuggestion = sendSuggestion;

        function sendSuggestion (suggestion) {
            $log.debug(suggestion);
        }
    }
})();