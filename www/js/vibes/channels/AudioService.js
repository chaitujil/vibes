(function () {
    'use strict';

    angular.module('vibes')
        .factory('AudioService', AudioService);

    AudioService.$inject = ['$rootScope', '$log'];

    function AudioService($rootScope, $log) {
        var service = {
            play: play,
            pause: pause
        };

        return service;

        function playchannel() {
            $rootScope.playing = true;
            if (typeof $rootScope.audio !== 'undefined') {
                $rootScope.audio.src = $rootScope.curChannel.url;
            } else {
                $rootScope.audio = new Audio($rootScope.curChannel.url);

            	//
            	// Create event listeners for Html audio events.
            	//
            	$rootScope.audio.addEventListener("pause", function() {
                    //$rootScope.audio.removeEventListener("pause", null, true);
            	    //$log.error("stream is paused");
            	    $rootScope.playing = false;
            	    $rootScope.audio.src = "";
            	    $rootScope.audio.load();
            	}, true);

                $rootScope.audio.addEventListener("play", function() {
                    //$rootScope.audio.removeEventListener("play", null, true);
            	    //$log.error("stream ready to play");
                    if ($rootScope.playing == false) {
            	        playchannel();
                    }
                }, true);

            	//$rootScope.audio.addEventListener("error", function() {
            	//    alert('stream encountered error');
            	//}, false);

           	//$rootScope.audio.addEventListener("playing", function() {
            	//    alert('stream is playing');
            	//}, false);

            	//$rootScope.audio.addEventListener("waiting", function() {
            	//    alert('stream is waiting');
            	//}, false);

            	//$rootScope.audio.addEventListener("stalled", function() {
            	//    alert('stream is stalled');
            	//}, false);

            	//$rootScope.audio.addEventListener("suspend", function() {
            	//    alert('stream is suspended');
            	//}, false);
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
    }
})();
