controllers.controller('ChannelDetailCtrl', function ($scope, $stateParams, $timeout, ngXml2json, ChannelsService, HttpService) {

    angular.element(document).ready(function () {
        var stream = {
                title: $scope.channel.name,
                mp3: "http://listen.radionomy.com/vadapav"
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

    $scope.currentSongInfo = [];

    function init() {
        $scope.channel = ChannelsService.get($stateParams.channelId);

        HttpService.getCurrentSongInfo().then(function (response) {
            $scope.currentSongInfo = ngXml2json.parser(response);
            setSongCover($scope.currentSongInfo);
        });
    }

    init();


    $scope.channelDetailStyle = "{'background-image': 'url(http://www.arrahman.com/images/background-images/arrahman_bodybg.jpg)'}";

    function currentSongCtrl() {
        (function tick() {
            HttpService.getCurrentSongInfo().then(function(response){
                $scope.currentSongInfo = ngXml2json.parser(response);
                setSongCover($scope.currentSongInfo);
                $timeout(tick, ($scope.currentSongInfo.tracks.track.callmeback + 2000));
            });
        })();
    }

    currentSongCtrl();

    function setSongCover(currentSongInfo) {
        var curSongCover = currentSongInfo.tracks.track.cover;

        if (typeof curSongCover !== 'undefined' && curSongCover !== null && curSongCover.length > 1) {
            $scope.songCover = curSongCover;
        } else {
            $scope.songCover = 'http://www.youwall.com/wallpapers/201204/classic-music-wallpaper.jpg';
        }
    }

});