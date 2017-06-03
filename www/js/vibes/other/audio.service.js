(function () {
    'use strict';

    angular.module('vibes')
        .factory('AudioService', AudioService);

    AudioService.$inject = ['$rootScope', 'ChannelMetadataService', 'UtilService', '$timeout','$log', '$ionicPlatform'];

    function AudioService($rootScope, ChannelMetadataService, UtilService, $timeout, $log, $ionicPlatform) {
        var service = {
            play: play,
            pause: pause
        };

        //
        // Comment below section to work in web browser.
        // For mobile this code section detects headphone jack connection.
        //
        $ionicPlatform.ready(function() {
            window.HeadsetDetection.registerRemoteEvents(function(status) {
                switch (status) {
                    case 'headsetAdded':
                        break;
                    case 'headsetRemoved':
                        pause();
                        break;
                }
           });
        }, false);

        return service;

        // On IOS when the stream cannot play due to bandwidth or connection failure, the waiting event fires.
        // When enough data buffers, or the pipe starts working again, the playing event fires.
        // Nearly all other browsers do not have that behaviour. Instead, when the stream fails, the stalled event occurs.
        // The waiting/playing events work correctly on Safari/iOS and the stalled event works correctly on the other browsers.
        // Safari/iOS seems to generate the stalled event by default shortly after it starts playing the media and also fires
        // stalled event  a moment (~ 10s) after plaback is stopped by pluggin out headphone jack.

        function playchannel() {
            // cancel any existing monitoring service.
            cancelRefreshMonitorAudioPlaying(); 

            //set 'playing' to control play/pause button toggle. Show a short spinner.
            $rootScope.playing = true;
            UtilService.showSpinner();

            // Setup a new audio if not found otherwise simply change source of audio.
            if (typeof $rootScope.audio !== 'undefined') {
                $rootScope.audio.src = $rootScope.curChannel.url;
                $rootScope.audio.title = 'Bindas-' + $rootScope.curChannel.cname;
            } else {
                $rootScope.audio = new Audio($rootScope.curChannel.url);
                $rootScope.audio.title = 'Bindas-' + $rootScope.curChannel.cname;

                // Add event handlers to show/hide spinner
                $rootScope.audio.addEventListener("play", playEventHandler, false);
                $rootScope.audio.addEventListener("pause", pauseEventHandler, false);
                $rootScope.audio.addEventListener("playing", playingEventHandler, false);
                $rootScope.audio.addEventListener("waiting", waitingEventHandler, false);
                // Stalled event doesnot work properly on ios devices.
                $rootScope.audio.addEventListener("stalled", stalledEventHandler, false);
                $rootScope.audio.addEventListener("error", errorEventHandler, false);
            }
            $rootScope.audio.play();
        }

        function play() {
            playchannel();
            ChannelMetadataService.refreshChannelMetadata(true /* initialize */);
        }

        function pause() {
            $rootScope.playing = false;
            $rootScope.audio.pause();
        }

        // Handler for play event triggered from buttons/actions external to app.
        // playEvent is triggered as a result of audio.play() call. To prevent a infinite loop
        // of play and playEventhandler here, we check if the 'playing' is false. 
        function playEventHandler() {
            if ($rootScope.playing == false) {
                play(); 
            }
        }

        function pauseEventHandler() {
            $rootScope.playing = false;
            cancelRefreshMonitorAudioPlaying(); 
            ChannelMetadataService.cancelRefreshChannelMetadata();
            $rootScope.audio.src = "";
            $rootScope.audio.load();
        }

        // This event is triggered when stream actually starts playing.
        function playingEventHandler() {
            UtilService.hideConnectionAlert();
            UtilService.hideSpinner();

            // 'playing' could be set to false and refresh metadata cycle could be cancelled by
            // audio monitoring routine due to intermittent connection errors. 'playing' set it
            // to true again and refresh metadata cycle is restarted.
            $rootScope.playing = true;
            ChannelMetadataService.refreshChannelMetadata(true /* initialize */);
            refreshMonitorAudioPlaying();

            // These is set here because the html5 audio stream resets the lock screen nowplaying info.
            // They need to be reset after stream starts playing. The song cover is set here. Song info
            // is set during metadata refresh cycle.
            ChannelMetadataService.setIOSNowPlayingCover();
        }

        function waitingEventHandler() {
            UtilService.showSpinner();
        }

        function stalledEventHandler() {
            UtilService.showSpinner();
        }

        function errorEventHandler() {
            // Error event is called when there is connection error or when the src
            // is undefined.
            if ($rootScope.playing == true) {
                // Show connection error.
                pause();
                UtilService.showConnectionAlert();
            }
        }

        function refreshMonitorAudioPlaying() {  
            var timestamp = (new Date).getTime();
            $rootScope.refreshAudioMonitorTimestamp = timestamp;
            $timeout(monitorAudioPlaying /* fn */,
                     5000 /* delay */,
                     true /* invokeApply */,
                     0 /* current_time */ /* param 1 */,
                     timestamp /* param 2 */);
        }

        function cancelRefreshMonitorAudioPlaying() {  
            // add 1 to timestamp so that the resulting timestamp is different
            // from the timestamp generated in refreshMonitorAudio when two time calls
            // from two different services end up getting the same timestamp in usecs.
            var timestamp = (new Date).getTime();
            $rootScope.refreshAudioMonitorTimestamp = timestamp + 1;
        }

        function monitorAudioPlaying(current_time, timestamp){ 
            var audio_current_time = $rootScope.audio.currentTime;
            var delay_sec = 5;

            // If the refresh timestamp has changed, suspend the timeout cycle.
            if ($rootScope.refreshAudioMonitorTimestamp !== timestamp) {
                return;
            }
            // If the audio hasn't progressed for timeout seconds, consider stream
            // is stalled and cancel the refresh metadata cycle and set 'playing' to false.
            // If connection resumes the playing event is triggered which initiates the
            // refresh metadata cycle and sets 'playing' to true.
            if (current_time && audio_current_time <= current_time) {
                //$rootScope.playing = false;
                //ChannelMetadataService.cancelRefreshChannelMetadata();
                play();
                return;
            } 
            // Calling back monitorAudioPlaying.
            $timeout(monitorAudioPlaying /* fn */,
                     (delay_sec * 1000) /* delay */,
                     true /* invokeApply */,
                     audio_current_time, timestamp /* params */);
        }
    }
})();
