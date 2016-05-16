(function () {
    'use strict';

    angular.module('vibes')
        .factory('ChannelsService', ChannelsService);

    function ChannelsService() {
        var songsChannels = [{
            id: 0,
            name: 'station1',
            cname: 'Hits',
            face: 'img/hits.jpg',
            url: 'http://104.131.151.101:8000/station1',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 1,
            name: 'station2',
            cname: 'Latest',
            face: 'img/latest.jpg',
            url: 'http://104.131.151.101:8000/station2',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 2,
            name: 'station3',
            cname: 'Beats',
            face: 'img/beats.jpg',
            url: 'http://104.131.151.101:8000/station3',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 3,
            name: 'station4',
            cname: 'Melodies',
            face: 'img/melodies.jpg',
            url: 'http://104.131.151.101:8000/station4',
            radioUuid: '',
            apiKey: ''
        }];

        var dialoguesChannels = [{
            id: 0,
            name: 'station6',
            cname: 'Comedy 1',
            face: 'img/party.jpg',
            url: 'http://104.131.151.101:8000/station6',
            radioUuid: '',
            apiKey: ''
        }, {
            id: 1,
            name: 'station6',
            cname: 'Comedy 2',
            face: 'img/beats.jpg',
            url: 'http://104.131.151.101:8000/station6',
            radioUuid: '',
            apiKey: ''
        }];

        return {
            allSongChannels: allSongChannels,
            allDialogueChannels: allDialogueChannels,
            getSongsChannel: getSongsChannel,
            getDialoguesChannel: getDialoguesChannel
        };

        function allSongChannels() {
            return songsChannels;
        }

        function allDialogueChannels() {
            return dialoguesChannels;
        }

        function getSongsChannel(channelId) {
            for (var i = 0; i < songsChannels.length; i++) {
                if (songsChannels[i].id === parseInt(channelId)) {
                    return songsChannels[i];
                }
            }
            return null;
        }

        function getDialoguesChannel(channelId) {
            for (var i = 0; i < dialoguesChannels.length; i++) {
                if (dialoguesChannels[i].id === parseInt(channelId)) {
                    return dialoguesChannels[i];
                }
            }
            return null;
        }
    }
})();
