(function () {
    'use strict';

    angular.module('vibes')
        .factory('AudioService', AudioService);

    AudioService.$inject = ['$rootScope'];

    function AudioService($rootScope) {
        var service = {
            play: play,
            pause: pause
        };

        return service;

        function play() {
            if (typeof $rootScope.audio !== 'undefined') {
                $rootScope.audio.src = $rootScope.curChannel.url;
            } else {
                $rootScope.audio = new Audio($rootScope.curChannel.url);
            }
            $rootScope.audio.play();
            $rootScope.playing = true;
        }

        function pause() {
            $rootScope.audio.pause();
            $rootScope.playing = false;
        }
    }
})();
