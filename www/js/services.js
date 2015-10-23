var services = angular.module('vibes.services', []);

services.factory('Channels', function() {
        // Might use a resource here that returns a JSON array

        // Some fake testing data
        var channels = [{
            id: 0,
            name: 'AR Rehman',
            face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
        }, {
            id: 1,
            name: 'Melody',
            face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
        }, {
            id: 2,
            name: 'Romantic',
            face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
        }, {
            id: 3,
            name: 'Party',
            face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
        }, {
            id: 4,
            name: 'Devotion',
            face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
        }];

        return {
            all: function() {
                return channels;
            },
            get: function(channelId) {
                for (var i = 0; i < channels.length; i++) {
                    if (channels[i].id === parseInt(channelId)) {
                        return channels[i];
                    }
                }
                return null;
            }
        };
    });