controllers.controller('ChannelDetailCtrl', function ($scope, $stateParams, $timeout, ngXml2json, ChannelsService, HttpService) {

    angular.element(document).ready(function () {
        var stream = {
                title: $scope.channel.name,
                mp3: $scope.channel.url
            },
            ready = false;

        $("#jquery_jplayer_1").jPlayer({
            ready: function (event) {
                ready = true;
                $(this).jPlayer("setMedia", stream);
            },
            pause: function() {
                $(this).jPlayer("clearMedia");
            },
            error: function(event) {
                if(ready && event.jPlayer.error.type === $.jPlayer.error.URL_NOT_SET) {
                    // Setup the media stream again and play it.
                    $(this).jPlayer("setMedia", stream).jPlayer("play");
                }
            },
            swfPath: "lib/jPlayer-2.9.2/dist/jplayer",
            supplied: "mp3",
            preload: "none",
            wmode: "window",
            useStateClassSkin: true,
            autoBlur: false,
            keyEnabled: true
        });
    });

    function init() {
        $scope.channel = ChannelsService.get($stateParams.channelId);
        currentSongCtrl();
    }

    init();

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

    currentSongCtrl();

});