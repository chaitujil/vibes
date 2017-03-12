(function () {
    'use strict';

    angular.module('vibes')
        .controller('SongsCtrl', SongsCtrl);

    SongsCtrl.$inject = ['$rootScope', 'ChannelsService', 'ModalService', 'AudioService', 'ChannelMetadataService'];

    function SongsCtrl($rootScope, ChannelsService, ModalService, AudioService, ChannelMetadataService) {
        var vm = this;
        vm.channels = null;
        vm.setChannel = setChannel;
        vm.curChannel = curChannel;
        vm.openModal = openModal;
        vm.closeModal = closeModal;
        vm.play = play;
        vm.pause = pause;
        vm.isplaying = isplaying;

        init();

        function init() {
            vm.channels = ChannelsService.allSongChannels();
            $rootScope.playing = false;
        }

        function setChannel(channelId) {
            ModalService.setSongsChannel(channelId);
        }
        
        function curChannel() {
            return $rootScope.curChannel;
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

        function isplaying() {
            return $rootScope.playing;
        } 
    }
})();
