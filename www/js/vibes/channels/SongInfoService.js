(function () {
    'use strict';

    angular.module('vibes')
        .factory('SongInfoService', SongInfoService);

    SongInfoService.$inject = ['$rootScope', '$log', '$timeout', 'HttpService'];

    function SongInfoService($rootScope, $log, $timeout, HttpService) {
        var service = {
            refreshSongInfo: refreshSongInfo,
        };
        var channel = this;
        return service;

        function refreshSongInfo() {
            channel = $rootScope.curChannel;
            if (typeof channel.sprovider !== 'undefined') {
                switch (channel.sprovider) {
                    case 'vibes':
                        refreshGowthamSongInfo();
                        break;
                    case 'radionomy':
                        refreshRadionomySongInfo();
                        break;
                }
            }
        }

        function refreshGowthamSongInfo() {
            HttpService.getGowthamCurrentSongInfo(channel.name).then(function (response) {
                if ($rootScope.curChannel.id == channel.id && $rootScope.playing == true) {
                    $rootScope.songTitle = response.track;
                    $rootScope.songArtists = response.artist;
                    $rootScope.songCover = 'http://104.131.151.101/' + channel.name + '/image.jpg?' + new Date().getTime();
                    // Calling back refreshGowthamSongInfo every 5 sec
                    $timeout(refreshGowthamSongInfo, 5000);
                }
            }, function (error) {
                if ($rootScope.curChannel.id == channel.id && $rootScope.playing == true) {
                    $rootScope.songTitle = '--';
                    $rootScope.songArtists = '--';
                    $log.error("Error while retrieving song info for channel " + channel.name + " Error: " + error);
                    $timeout(refreshGowthamSongInfo, 5000);
                }
            });
        }

        function refreshRadionomySongInfo() {
            HttpService.getRadionomyCurrentSongInfo(channel.radioUuid, channel.apiKey).then(function (response) {
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
                $log.error("Error while retrieving song info for channel " + channel.name + " Error: " + error);
            });
        }
    }
})();
