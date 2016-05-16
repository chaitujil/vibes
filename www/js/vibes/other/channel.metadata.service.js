(function () {
    'use strict';

    angular.module('vibes')
        .factory('ChannelMetadataService', ChannelMetadataService);

    ChannelMetadataService.$inject = ['$rootScope', '$log', '$timeout', 'HttpService'];

    function ChannelMetadataService($rootScope, $log, $timeout, HttpService) {
        var service = {
            refreshChannelMetadata: refreshChannelMetadata
        };
        return service;

        function refreshChannelMetadata() {
            var channel = $rootScope.curChannel;
            HttpService.getCurrentChannelMetadata(channel.name).then(function (response) {
                if ($rootScope.curChannel.id == channel.id && $rootScope.playing == true) {
                    if ($rootScope.songTitle != response.track) {
                        $rootScope.songTitle = response.track;
                        $rootScope.songArtists = response.artist;
                        $rootScope.songCover = 'http://104.131.151.101/' + channel.name + '/image.jpg?' + new Date().getTime();
                    }
                    // Calling back refreshChannelMetadata every 5 sec
                    $timeout(refreshChannelMetadata, 5000);
                }
            }, function (error) {
                if ($rootScope.curChannel.id == channel.id && $rootScope.playing == true) {
                    $rootScope.songTitle = '--';
                    $rootScope.songArtists = '--';
                    $log.error("Error while retrieving song info for channel " + channel.name + " Error: " + error);
                    $timeout(refreshChannelMetadata, 5000);
                }
            });
        }
    }
})();
