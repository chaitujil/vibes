(function () {
    'use strict';

    angular.module('vibes')
        .controller('DialogueDetailCtrl', DialogueDetailCtrl);

    DialogueDetailCtrl.$inject = ['$rootScope', 'ChannelsService', '$sce', '$log', 'ModalService', 'AudioService', 'ChannelMetadataService'];

    function DialogueDetailCtrl($rootScope, ChannelsService, $sce, $log, ModalService, AudioService, ChannelMetadataService) {
        var vm = this;
        vm.play = play;
        vm.pause = pause;
        vm.channel = null;
        vm.channelUrl = null;
        vm.gotoPrevious = gotoPrevious;
        vm.gotoNext = gotoNext;
        vm.openModal = openModal;
        vm.closeModal = closeModal;

        $rootScope.songTitle = null;
        $rootScope.songArtists = null;
        $rootScope.songCover = null;
        $rootScope.isDefaultTheme = isDefaultTheme;

        init();

        function init() {
            vm.channel = ChannelsService.getChannel($rootScope.newChannelId);
            vm.channelUrl = $sce.trustAsResourceUrl(vm.channel.url);

            if ($rootScope.playing !== true) {
                refreshChannel();
            } else if ((typeof $rootScope.curChannel !== 'undefined') &&
                ($rootScope.curChannel.id !== vm.channel.id)) {
                refreshChannel();
            }
        }

        function refreshChannel() {
            $rootScope.playing = false;
            if (typeof $rootScope.audio !== 'undefined') {
                $rootScope.audio.pause();
            }
            $rootScope.curChannel = vm.channel;
            play();
        }

        function play() {
            AudioService.play();
            refreshChannelMetadata();
        }

        function pause() {
            AudioService.pause();
        }

        function gotoPrevious(curChannelId) {
            if (curChannelId > 0) {
                $rootScope.newChannelId = (curChannelId - 1);
            } else {
                $rootScope.newChannelId = ChannelsService.allChannels().length - 1;
            }
            init();
        }

        function gotoNext(curChannelId) {
            if (curChannelId < (ChannelsService.allChannels().length - 1)) {
                $rootScope.newChannelId = (curChannelId + 1);
            } else {
                $rootScope.newChannelId = 0;
            }
            init();
        }

        function openModal() {
            ModalService.openModal();
        }

        function closeModal() {
            ModalService.closeModal();
        }

        function refreshChannelMetadata() {
            ChannelMetadataService.refreshChannelMetadata()
        }

        function isDefaultTheme() {
            return true;
        }
    }
})();
