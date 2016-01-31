(function () {
    'use strict';

    angular.module('vibes')
        .controller('SendSuggestionCtrl', SendSuggestionCtrl);

    SendSuggestionCtrl.$inject = ['$log'];

    function SendSuggestionCtrl($log) {
        var vm = this;

        vm.sendSuggestion = sendSuggestion;

        function sendSuggestion (suggestion) {
            if (typeof suggestion !== "undefined" && suggestion.length > 0) {
                // TODO send suggestion as an email
                $log.debug(suggestion);
                alert("Message sent");
            }
        }
    }
})();