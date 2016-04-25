(function () {
    'use strict';

    angular.module('vibes')
        .controller('ChannelsCtrl', channelsCtrl);

    channelsCtrl.$inject = ['ChannelsService', 'ModalService', 'AudioService', 'SongInfoService'];

    function channelsCtrl(ChannelsService, ModalService, AudioService, SongInfoService) {
        var vm = this;
        vm.channels = null;
        vm.setChannel = setChannel;
        vm.openModal = openModal;
        vm.closeModal = closeModal;
        vm.play = play;
        vm.pause = pause;

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

        function play() {
            AudioService.play();
            SongInfoService.refreshSongInfo();
        }

        function pause() {
            AudioService.pause();
        }
    }
})();
