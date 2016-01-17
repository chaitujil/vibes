(function () {
    'use strict';

    angular.module('vibes')
        .factory('ModalService', ModalService);

    ModalService.$inject = ['$rootScope', '$ionicModal'];

    function ModalService($rootScope, $ionicModal) {
        var service = {
            setChannel: setChannel,
            openModal: openModal,
            closeModal: closeModal
        };

        return service;

        function setChannel(channelId) {
            closeModal();
            $rootScope.newChannelId = channelId;
            $ionicModal.fromTemplateUrl('js/vibes/channels/modal-channel-detail.html', {
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
    }
})();



