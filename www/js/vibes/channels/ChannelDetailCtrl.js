(function () {
    'use strict';

    angular.module('vibes')
        .controller('ChannelDetailCtrl', channelDetailCtrl);

    channelDetailCtrl.$inject = ['$rootScope', '$stateParams', '$timeout', 'HttpService',
        'ngXml2json', 'ChannelsService', '$sce', '$log', '$state'];

    function channelDetailCtrl($rootScope, $stateParams, $timeout, HttpService,
                               ngXml2json, ChannelsService, $sce, $log, $state) {
        var vm = this;
        vm.play = play;
        vm.pause = pause;
        vm.channel = null;
        vm.channelUrl = null;
        vm.songTitle = null;
        vm.songArtists = null;
        vm.songCover = null;
        vm.isDefaultTheme = isDefaultTheme;
        vm.gotoPrevious = gotoPrevious;
        vm.gotoNext = gotoNext;

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
                vm.songTitle = response.track;
                vm.songArtists = response.artist;
                vm.songCover = 'http://104.131.151.101/' + vm.channel.name + '/image.jpg?' + new Date().getTime();
                // Calling back refreshGowthamSongInfo every 5 sec
                $timeout(refreshGowthamSongInfo, 5000);
            }, function (error) {
                vm.songTitle = '--';
                vm.songArtists = '--';
                $log.error("Error while retrieving song info for channel " + vm.channel.name + " Error: " + error);
            });
        }

        function refreshRadionomySongInfo() {
            HttpService.getRadionomyCurrentSongInfo(vm.channel.radioUuid, vm.channel.apiKey).then(function (response) {
                var currentSongInfo = ngXml2json.parser(response);
                vm.songTitle = currentSongInfo.tracks.track.title;
                vm.songArtists = currentSongInfo.tracks.track.artists;
                if (typeof currentSongInfo.tracks.track.cover !== 'undefined' && currentSongInfo.tracks.track.cover !== null && currentSongInfo.tracks.track.cover.length > 1) {
                    vm.songCover = currentSongInfo.tracks.track.cover;
                } else {
                    vm.songCover = 'http://www.musicheavens.com/wp-content/gallery/music-photo/beautiful-guitar-guitar-music-1920x1080.jpg';
                }

                // Calling back refreshRadionomySongInfo
                $timeout(refreshRadionomySongInfo, (currentSongInfo.tracks.track.callmeback));
            }, function (error) {
                $log.error("Error while retrieving song info for channel " + vm.channel.name + " Error: " + error);
            });
        }

        function gotoPrevious(curChannelId) {
            if (curChannelId > 0) {
                $state.go('tab.channel-detail', {channelId: (curChannelId - 1)});
            }
        }

        function gotoNext(curChannelId) {
            if (curChannelId < (ChannelsService.all().length - 1)) {
                $state.go('tab.channel-detail', {channelId: (curChannelId + 1)});
            }
        }

        function isDefaultTheme() {
            return true;
        }
    }
})();
