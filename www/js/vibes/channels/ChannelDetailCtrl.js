(function () {
    'use strict';

    angular.module('vibes')
        .controller('ChannelDetailCtrl', channelDetailCtrl);

    channelDetailCtrl.$inject = ['$rootScope', '$timeout', 'HttpService', 'ngXml2json', 'ChannelsService', '$sce', '$log', 'ModalService'];

    function channelDetailCtrl($rootScope, $timeout, HttpService, ngXml2json, ChannelsService, $sce, $log, ModalService) {
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
            vm.channel = ChannelsService.get($rootScope.newChannelId);
            vm.channelUrl = $sce.trustAsResourceUrl(vm.channel.url);

            if ($rootScope.playing !== true) {
                refreshChannel();
            } else if ((typeof $rootScope.curChannel !== 'undefined') &&
                ($rootScope.curChannel.id !== vm.channel.id)) {
                refreshChannel();
            }

            refreshSongInfo();
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
            if (typeof $rootScope.audio !== 'undefined') {
                $rootScope.audio.src = vm.channelUrl;
            } else {
                $rootScope.audio = new Audio(vm.channelUrl);
            }
            $rootScope.audio.play();
            $rootScope.playing = true;
        }

        function pause() {
            $rootScope.audio.pause();
            $rootScope.playing = false;
        }

        function refreshSongInfo() {
            if (typeof vm.channel.sprovider !== 'undefined') {
                switch (vm.channel.sprovider) {
                    case 'gowtham':
                        refreshGowthamSongInfo();
                        break;
                    case 'radionomy':
                        refreshRadionomySongInfo();
                        break;
                }
            }
        }

        function refreshGowthamSongInfo() {
            HttpService.getGowthamCurrentSongInfo(vm.channel.name).then(function (response) {
                $rootScope.songTitle = response.track;
                $rootScope.songArtists = response.artist;
                $rootScope.songCover = 'http://104.131.151.101/' + vm.channel.name + '/image.jpg?' + new Date().getTime();
                // Calling back refreshGowthamSongInfo every 5 sec
                $timeout(refreshGowthamSongInfo, 5000);
            }, function (error) {
                $rootScope.songTitle = '--';
                $rootScope.songArtists = '--';
                $log.error("Error while retrieving song info for channel " + vm.channel.name + " Error: " + error);
            });
        }

        function refreshRadionomySongInfo() {
            HttpService.getRadionomyCurrentSongInfo(vm.channel.radioUuid, vm.channel.apiKey).then(function (response) {
                var currentSongInfo = ngXml2json.parser(response);
                $rootScope.songTitle = currentSongInfo.tracks.track.title;
                $rootScope.songArtists = currentSongInfo.tracks.track.artists;
                if (typeof currentSongInfo.tracks.track.cover !== 'undefined' && currentSongInfo.tracks.track.cover !== null && currentSongInfo.tracks.track.cover.length > 1) {
                    $rootScope.songCover = currentSongInfo.tracks.track.cover;
                } else {
                    $rootScope.songCover = 'http://www.musicheavens.com/wp-content/gallery/music-photo/beautiful-guitar-guitar-music-1920x1080.jpg';
                }

                // Calling back refreshRadionomySongInfo
                $timeout(refreshRadionomySongInfo, (currentSongInfo.tracks.track.callmeback));
            }, function (error) {
                $log.error("Error while retrieving song info for channel " + vm.channel.name + " Error: " + error);
            });
        }

        function gotoPrevious(curChannelId) {
            if (curChannelId > 0) {
                ModalService.setChannel(curChannelId - 1);
            }
        }

        function gotoNext(curChannelId) {
            if (curChannelId < (ChannelsService.all().length - 1)) {
                ModalService.setChannel(curChannelId + 1);
            }
        }

        function isDefaultTheme() {
            return true;
        }

        function openModal() {
            ModalService.openModal();
        }

        function closeModal() {
            ModalService.closeModal();
        }
    }
})();
