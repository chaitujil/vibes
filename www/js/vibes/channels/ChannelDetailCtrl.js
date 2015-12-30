(function () {
    'use strict';

    angular.module('vibes')
        .controller('ChannelDetailCtrl', channelDetailCtrl);

    channelDetailCtrl.$inject = ['$rootScope', '$stateParams', '$timeout', 'HttpService',
        'ngXml2json', 'ChannelsService'];

    function channelDetailCtrl($rootScope, $stateParams, $timeout, HttpService, ngXml2json, ChannelsService) {
        var vm = this;
        var audio;
        vm.play = play;
        vm.pause = pause;
        vm.channel = null;
        vm.songTitle = null;
        vm.songArtists = null;
        vm.songCover = null;

        init();

        function init() {
            $rootScope.playing = false;
            vm.channel = ChannelsService.get($stateParams.channelId);
            refreshSongInfo();
            audio = document.getElementById('audio');
        }

        function play() {
            audio.play();
            $rootScope.playing = true;
        }

        function pause() {
            audio.pause();
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
                    $log.error("Error while retrieving song info");
                });
        }
    }
})();