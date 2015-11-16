controllers.controller('ChannelDetailCtrl', function ($rootScope, $scope, $stateParams, $timeout, ngXml2json, ChannelsService, HttpService) {

    var audio;

    init();
    currentSongCtrl();

    function init() {
        $rootScope.playing = false;
        $scope.channel = ChannelsService.get($stateParams.channelId);
        currentSongCtrl();

        audio = document.getElementById('audio');
    }

    $scope.play = function () {
        audio.play();
        $rootScope.playing = true;
    };

    $scope.pause = function () {
        audio.pause();
        $rootScope.playing = false;
    };

    function currentSongCtrl() {
        (function tick() {
            HttpService.getCurrentSongInfo($scope.channel.radioUuid, $scope.channel.apiKey).then(function(response){
                var currentSongInfo = ngXml2json.parser(response);
                $scope.songTitle = currentSongInfo.tracks.track.title;
                $scope.songArtists = currentSongInfo.tracks.track.artists;
                if (typeof currentSongInfo.tracks.track.cover !== 'undefined'
                    && currentSongInfo.tracks.track.cover !== null
                    && currentSongInfo.tracks.track.cover.length > 1) {
                    $scope.songCover = currentSongInfo.tracks.track.cover;
                } else {
                    $scope.songCover = 'http://www.musicheavens.com/wp-content/gallery/music-photo/beautiful-guitar-guitar-music-1920x1080.jpg';
                }

                // Calling back tick
                $timeout(tick, (currentSongInfo.tracks.track.callmeback));
            });
        })();
    }

});