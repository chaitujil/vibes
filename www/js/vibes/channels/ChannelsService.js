(function () {
    'use strict';

    angular.module('vibes')
        .factory('ChannelsService', channelsService);

    function channelsService() {
        var channels = [{
            id: 0,
            name: 'station1',
            cname: 'Hits',
            sprovider: 'vibes',
            face: 'img/hits.jpg',
            url: 'http://104.131.151.101:8000/station1',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 1,
            name: 'station2',
            cname: 'Latest',
            sprovider: 'vibes',
            face: 'img/latest.jpg',
            url: 'http://104.131.151.101:8000/station2',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 2,
            name: 'station3',
            cname: 'Beats',
            sprovider: 'vibes',
            face: 'img/beats.jpg',
            url: 'http://104.131.151.101:8000/station3',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 3,
            name: 'station4',
            cname: 'Melodies',
            sprovider: 'vibes',
            face: 'img/melodies.jpg',
            url: 'http://104.131.151.101:8000/station4',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 4,
            name: 'station5',
            cname: 'Love',
            sprovider: 'vibes',
            face: 'img/party.jpg',
            url: 'http://104.131.151.101:8000/station4',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 5,
            name: 'station6',
            cname: 'Comedy',
            sprovider: 'vibes',
            face: 'img/beats.jpg',
            url: 'http://104.131.151.101:8000/station6',
            radioUuid: '',
            apiKey: ''
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
