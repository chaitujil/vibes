(function () {
    'use strict';

    angular.module('vibes')
        .factory('ChannelsService', channelsService);

    function channelsService() {
        var channels = [{
            id: 0,
            name: 'station1',
            sprovider: 'vibes',
            face: 'http://studentmediahub.com/wp-content/uploads/2015/09/6908980-party-time.jpg',
            url: 'http://104.131.151.101:8000/station1',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 1,
            name: 'station2',
            sprovider: 'vibes',
            face: 'http://www.thecoolhunter.net/images/stories/2007pics/storiesnew2007pics/marchpics/1music.jpg',
            url: 'http://104.131.151.101:8000/station2',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 2,
            name: 'station3',
            sprovider: 'vibes',
            face: 'http://www.arrahman.com/images/background-images/arrahman_bodybg.jpg',
            url: 'http://104.131.151.101:8000/station3',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 3,
            name: 'station4',
            sprovider: 'vibes',
            face: 'http://examinedexistence.com/wp-content/uploads/2013/03/music-notes.jpg',
            url: 'http://104.131.151.101:8000/station4',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 4,
            name: 'vadapav2',
            sprovider: 'radionomy',
            face: 'http://www.ultrahighdefinitionwallpapers.com/wp-content/uploads/2015/07/romantic-white-and-red-hearts-uhd-wallpapers.jpg',
            url: 'http://listen.radionomy.com/vadapav',
            radioUuid: 'f4af4953-6985-4ec8-8cbe-e68324c5e61f',
            apiKey: 'b9bc802d-3af8-445b-bf51-40b4e690cc0d'
        }];

        return {
            all: all,
            get: get
        };

        function all() {
            return channels;
        }

        function get(channelId) {
            for (var i = 0; i < channels.length; i++) {
                if (channels[i].id === parseInt(channelId)) {
                    return channels[i];
                }
            }
            return null;
        }
    }
})();
