(function () {
    'use strict';

    angular.module('vibes')
        .controller('SongsCtrl', SongsCtrl);

    SongsCtrl.$inject = ['ChannelsService', 'ModalService', 'AudioService', 'ChannelMetadataService'];

    function SongsCtrl(ChannelsService, ModalService, AudioService, ChannelMetadataService) {
        var vm = this;
        vm.channels = null;
        vm.setChannel = setChannel;
        vm.openModal = openModal;
        vm.closeModal = closeModal;
        vm.play = play;
        vm.pause = pause;

        init();
        function init() {
            vm.channels = ChannelsService.allSongChannels();
        }

        function setChannel(channelId) {
            ModalService.setSongsChannel(channelId);
        }

        function openModal() {
            ModalService.openModal();
        }

        function closeModal() {
            ModalService.closeModal();
        }

        function play() {
            AudioService.play();
            ChannelMetadataService.refreshChannelMetadata();
        }

        function pause() {
            AudioService.pause();
        }
    }
})();
