(function () {
    'use strict';

    angular.module('vibes')
        .factory('ChannelsService', ChannelsService);

    function ChannelsService() {
        var channels = [{
            id: 0,
            name: 'station1',
            cname: 'Hits',
            type: 'songsChannel',
            face: 'img/hits.jpg',
            url: 'http://104.131.151.101:8000/station1',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 1,
            name: 'station2',
            cname: 'Latest',
            type: 'songsChannel',
            face: 'img/latest.jpg',
            url: 'http://104.131.151.101:8000/station2',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 2,
            name: 'station3',
            cname: 'Beats',
            type: 'songsChannel',
            face: 'img/beats.jpg',
            url: 'http://104.131.151.101:8000/station3',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 3,
            name: 'station4',
            cname: 'Melodies',
            type: 'songsChannel',
            face: 'img/melodies.jpg',
            url: 'http://104.131.151.101:8000/station4',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 4,
            name: 'station6',
            cname: 'Love',
            type: 'dialoguesChannel',
            face: 'img/party.jpg',
            url: 'http://104.131.151.101:8000/station6',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 5,
            name: 'station6',
            cname: 'Comedy',
            type: 'dialoguesChannel',
            face: 'img/beats.jpg',
            url: 'http://104.131.151.101:8000/station6',
            radioUuid: '',
            apiKey: ''
        }];

        return {
            allSongChannels: allSongChannels,
            allDialogueChannels: allDialogueChannels,
            get: get
        };

        function allSongChannels() {
            return getChannelsByType('songsChannel');
        }

        function allDialogueChannels() {
            return getChannelsByType('dialoguesChannel');
        }

        function getChannelsByType(channelType) {
            var channelsByType = [];
            for (var i = 0; i < channels.length; i++) {
                if (channels[i].type === channelType) {
                    channelsByType.push(channels[i]);
                }
            }

            return channelsByType;
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
