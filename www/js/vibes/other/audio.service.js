(function () {
    'use strict';

    angular.module('vibes')
        .factory('AudioService', AudioService);

    AudioService.$inject = ['$rootScope', '$log', '$ionicLoading'];

    function AudioService($rootScope, $log, $ionicLoading) {
        var service = {
            play: play,
            pause: pause
        };

        return service;

        function showSpinner() {
            $ionicLoading.show({
                template: '<ion-spinner icon="spiral" class="spinner-energized"></ion-spinner>',
                duration: 3000,
            });
        }

        function hideSpinner() {
            $ionicLoading.hide();
        }

        function playchannel() {
            $rootScope.playing = true;
            showSpinner();
            if (typeof $rootScope.audio !== 'undefined') {
                $rootScope.audio.src = $rootScope.curChannel.url;
            } else {
                $rootScope.audio = new Audio($rootScope.curChannel.url);

                // Add event handlers to show/hide spinner
                $rootScope.audio.addEventListener("pause", pauseEventHandler, true);
                $rootScope.audio.addEventListener("play", playEventHandler, true);
                $rootScope.audio.addEventListener("error", errorEventHandler, false);
                $rootScope.audio.addEventListener("playing", playingEventHandler, false);
                $rootScope.audio.addEventListener("waiting", waitingEventHandler, false);
                $rootScope.audio.addEventListener("stalled", stalledEventhandler, false);
                $rootScope.audio.addEventListener("suspend", suspendEventHandler, false);
            }
            $rootScope.audio.play();
        }

        function play() {
            playchannel();
        }

        function pause() {
            $rootScope.audio.pause();
            $rootScope.playing = false;
        }

        function pauseEventHandler() {
            //$rootScope.audio.removeEventListener("pause", null, true);
            //$log.error("stream is paused");
            $rootScope.playing = false;
            $rootScope.audio.src = "";
            $rootScope.audio.load();
        }

        function playEventHandler() {
            //$rootScope.audio.removeEventListener("play", null, true);
            //$log.error("stream ready to play");
            if ($rootScope.playing == false) {
                playchannel();
            }
        }

        function errorEventHandler() {
            //hideSpinner();
            //alert('Connection encountered an error');
        }

        function playingEventHandler() {
            hideSpinner();
        }

        function waitingEventHandler() {
            showSpinner();
        }

        function stalledEventhandler() {
            hideSpinner();
        }

        function suspendEventHandler() {
            hideSpinner();
        }
    }
})();
