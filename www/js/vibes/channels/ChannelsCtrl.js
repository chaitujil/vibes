(function () {
    'use strict';

    angular.module('vibes')
        .controller('ChannelsCtrl', channelsCtrl);

    channelsCtrl.$inject = ['ChannelsService', 'ModalService'];

    function channelsCtrl(ChannelsService, ModalService) {
        var vm = this;
        vm.channels = null;
        vm.setChannel = setChannel;
        vm.openModal = openModal;
        vm.closeModal = closeModal;

        init();
        function init() {
            vm.channels = ChannelsService.all();
        }

        function setChannel(channelId) {
            ModalService.setChannel(channelId);
        }

        function openModal() {
            ModalService.openModal();
        }

        function closeModal() {
            ModalService.closeModal();
        }
    }
})();
