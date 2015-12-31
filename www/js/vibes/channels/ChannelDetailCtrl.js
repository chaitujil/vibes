(function () {
    'use strict';

    angular.module('vibes')
        .controller('ChannelDetailCtrl', channelDetailCtrl);

    channelDetailCtrl.$inject = ['$rootScope', '$stateParams', '$timeout', 'HttpService',
        'ngXml2json', 'ChannelsService', '$sce'];

    function channelDetailCtrl($rootScope, $stateParams, $timeout, HttpService, ngXml2json, ChannelsService, $sce) {
        var vm = this;
        vm.play = play;
        vm.pause = pause;
        vm.channel = null;
        vm.channelUrl = null;
        vm.songTitle = null;
        vm.songArtists = null;
        vm.songCover = null;

        init();

        function init() {
            vm.channel = ChannelsService.get($stateParams.channelId);
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
            $rootScope.audio = new Audio(vm.channelUrl);
            $rootScope.audio.play();
            $rootScope.playing = true;
        }

        function pause() {
            $rootScope.audio.pause();
            $rootScope.playing = false;
        }

        function refreshSongInfo() {
            HttpService.getCurrentSongInfo(vm.channel.radioUuid, vm.channel.apiKey)
                .then(function (response) {
                    var currentSongInfo = ngXml2json.parser(response);
                    vm.songTitle = currentSongInfo.tracks.track.title;
                    vm.songArtists = currentSongInfo.tracks.track.artists;
                    if (typeof currentSongInfo.tracks.track.cover !== 'undefined'
                        && currentSongInfo.tracks.track.cover !== null
                        && currentSongInfo.tracks.track.cover.length > 1) {
                        vm.songCover = currentSongInfo.tracks.track.cover;
                    } else {
                        vm.songCover = 'http://www.musicheavens.com/wp-content/gallery/music-photo/beautiful-guitar-guitar-music-1920x1080.jpg';
                    }

                    // Calling back tick
                    $timeout(refreshSongInfo, (currentSongInfo.tracks.track.callmeback));
                }, function (error) {
                    $log.error("Error while retrieving song info" + error);
                });
        }
    }
})();