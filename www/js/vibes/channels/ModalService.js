(function () {
    'use strict';

    angular.module('vibes')
        .factory('ModalService', ModalService);

    ModalService.$inject = ['$rootScope', '$ionicModal'];

    function ModalService($rootScope, $ionicModal) {
        var service = {
            setChannel: setChannel,
            openModal: openModal,
            closeModal: closeModal,
            removeModal: removeModal
        };

        return service;

        function setChannel(channelId) {
            if(typeof $rootScope.modal !== 'undefined') {
                removeModal();
            }
            $rootScope.newChannelId = channelId;
            $ionicModal.fromTemplateUrl('js/vibes/channels/modal-channel-detail.html', {
                scope: $rootScope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $rootScope.modal = modal;
                openModal();
            });
        }

        function openModal() {
            if (typeof $rootScope.modal !== 'undefined') {
                $rootScope.modal.show();
            }
        }

        function closeModal() {
            if (typeof $rootScope.modal !== 'undefined') {
                $rootScope.modal.hide();
            }
        }

        function removeModal() {
            if (typeof $rootScope.modal !== 'undefined') {
                $rootScope.modal.remove();
            }
        }
    }
})();



