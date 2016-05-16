(function () {
    'use strict';

    angular.module('vibes')
        .factory('ModalService', ModalService);

    ModalService.$inject = ['$rootScope', '$ionicModal'];

    function ModalService($rootScope, $ionicModal) {
        var service = {
            setSongsChannel: setSongsChannel,
            setDialoguesChannel: setDialoguesChannel,
            openModal: openModal,
            closeModal: closeModal,
            removeModal: removeModal
        };

        return service;

        function setSongsChannel(channelId) {
            if(typeof $rootScope.modal !== 'undefined') {
                removeModal();
            }
            $rootScope.newChannelId = channelId;
            $ionicModal.fromTemplateUrl('js/vibes/songs/modal-songs-detail.html', {
                scope: $rootScope,
                animation: 'slide-in-up'
            }).then(function (modal) {
                $rootScope.modal = modal;
                openModal();
            });
        }

        function setDialoguesChannel(channelId) {
            if(typeof $rootScope.modal !== 'undefined') {
                removeModal();
            }
            $rootScope.newChannelId = channelId;
            $ionicModal.fromTemplateUrl('js/vibes/dialogues/modal-dialogues-detail.html', {
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



