(function () {
    'use strict';

    angular.module('vibes')
        .controller('SendSuggestionCtrl', SendSuggestionCtrl);

    SendSuggestionCtrl.$inject = ['$log'];

    function SendSuggestionCtrl($log) {
        var vm = this;

        vm.sendSuggestion = sendSuggestion;

        function sendSuggestion(suggestion) {
            if (typeof suggestion !== "undefined" && suggestion.length > 0) {
                if (window.plugins && window.plugins.emailComposer) {
                    alert("window plugins not null");
                    window.plugins.emailComposer.showEmailComposerWithCallback(function (result) {
                            alert("Email successfully sent " + result);
                        },
                        "Suggestion from user", // Subject
                        suggestion,                      // Body
                        ["chaitu.jil@gmail.com"],    // To
                        null,                    // CC
                        null,                    // BCC
                        false,                   // isHTML
                        null,                    // Attachments
                        null);                   // Attachment Data
                }
                $log.debug(suggestion);
                alert("Message sent");
            }
        }
    }
})();