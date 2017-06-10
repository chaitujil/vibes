(function () {
    'use strict';

    angular.module('vibes')
        .factory('ChannelMetadataService', ChannelMetadataService);

    ChannelMetadataService.$inject = ['$rootScope', '$ionicPlatform', '$log', '$timeout', 'HttpService'];

    function ChannelMetadataService($rootScope, $ionicPlatform, $log, $timeout, HttpService) {
        var service = {
            refreshChannelMetadata: refreshChannelMetadata,
            cancelRefreshChannelMetadata: cancelRefreshChannelMetadata,
            setIOSNowPlayingInfo: setIOSNowPlayingInfo,
            setIOSNowPlayingCover: setIOSNowPlayingCover
        };

        return service;
        
        function setIOSNowPlayingInfo() {
          $ionicPlatform.ready(function() {
            if (ionic.Platform.isIOS()) {
              NowPlaying.set({
                  artist: $rootScope.songArtists,
                  title: $rootScope.songTitle
              });
            }
          }, false);
        }

        function setIOSNowPlayingCover() {
          $ionicPlatform.ready(function() {
            if (ionic.Platform.isIOS()) {
              NowPlaying.set({
                  artwork: $rootScope.songCover
              });
            }
          }, false);
        }

        function refreshChannelMetadata(initialize) {  
            var channel = $rootScope.curChannel;
            var timestamp = (new Date).getTime();
            $rootScope.refreshMetadataTimestamp = timestamp;
            $timeout(refreshMetadata /* fn */,
                     100 /* delay msec */,
                     true /* invokeApply */,
                     channel, timestamp, initialize /* params */);
        }

        function cancelRefreshChannelMetadata() {  
            var timestamp = (new Date).getTime();
            // add 1 to timestamp so that the resulting timestamp is different
            // from the timestamp generated in refreshChannelMetadata when 
            // two time calls from two different services race and end up
            // getting the same timestamp.
            $rootScope.refreshMetadataTimestamp = timestamp + 1;
        }

        function refreshMetadata(channel, timestamp, initialize) {
            // If the refresh timestamp has changed, suspend the timeout cycle.
            if ($rootScope.refreshMetadataTimestamp !== timestamp) {
                return;
            }
            // Get song info for 'channel' and refresh every 'delay' sec.
            // If rootScope.Channel changes the refresh cycle for this channel terminates.
            // Upon succesful http response get song cover only if the song has changed.
            // Upon error retry in 1 sec. 
	    if ($rootScope.curChannel.id === channel.id) {
                var delay_msec = 5000;
                // Fetch song info if a stream is playing.
                HttpService.getCurrentChannelMetadata(channel.name).then(function (response) {
                    // If the track has changed, fetch song cover and update info.
                    if (initialize || $rootScope.songTitle !== response.track) {
                        $rootScope.songTitle = response.track;
                        $rootScope.songArtists = response.artist;
                        $rootScope.songCover = 'http://104.131.151.101/' + channel.name + '/image.jpg?' + new Date().getTime();
                        setIOSNowPlayingCover();
                    }
                    setIOSNowPlayingInfo();
                }, function (error) {
                    delay_msec = 1000;
                });
                // Calling back refreshMetadata.
                $timeout(refreshMetadata /* fn */,
                         delay_msec /* delay */,
                         true /* invokeApply */,
                         channel, timestamp, false /* params */);
            }
        }
    }
})();
