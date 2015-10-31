
services.factory('ChannelsService', function() {
    // Might use a resource here that returns a JSON array

    // Some fake testing data
    var channels = [{
        id: 0,
        name: 'AR Rehman',
        face: 'http://www.arrahman.com/images/background-images/arrahman_bodybg.jpg'
    }, {
        id: 1,
        name: 'Melody',
        face: 'http://coolpcwallpapers.com/wp-content/uploads/2015/07/Music-Melody-Of-Butterfly-Wing-Wallpapers-1920x1080-Wallpaper-1920x1080.jpg'
    }, {
        id: 2,
        name: 'Romantic',
        face: 'http://www.ultrahighdefinitionwallpapers.com/wp-content/uploads/2015/07/romantic-white-and-red-hearts-uhd-wallpapers.jpg'
    }, {
        id: 3,
        name: 'Party',
        face: 'http://studentmediahub.com/wp-content/uploads/2015/09/6908980-party-time.jpg'
    }, {
        id: 4,
        name: 'Devotion',
        face: 'http://ingenetravels.com/travels/wp-content/uploads/2015/09/taj-mahal-india.jpg'
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