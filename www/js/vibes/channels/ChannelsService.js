(function () {
  'use strict';

  angular.module('vibes')
    .service('ChannelsService', channelsService);

  function channelsService() {
    var channels = [{
      id: 0,
      name: 'AR Rehman',
      face: 'http://www.arrahman.com/images/background-images/arrahman_bodybg.jpg',
      url: 'http://listen.radionomy.com/vadapav',
      radioUuid: 'f4af4953-6985-4ec8-8cbe-e68324c5e61f',
      apiKey: 'b9bc802d-3af8-445b-bf51-40b4e690cc0d'
    }, {
      id: 1,
      name: 'Melody',
      face: 'http://coolpcwallpapers.com/wp-content/uploads/2015/07/Music-Melody-Of-Butterfly-Wing-Wallpapers-1920x1080-Wallpaper-1920x1080.jpg',
      url: 'http://listen.radionomy.com/idlichutney',
      radioUuid: '0035c069-41a0-48cb-bca8-bcb0ada884e8',
      apiKey: 'b9bc802d-3af8-445b-bf51-40b4e690cc0d'
    }, {
      id: 2,
      name: 'Romantic',
      face: 'http://www.ultrahighdefinitionwallpapers.com/wp-content/uploads/2015/07/romantic-white-and-red-hearts-uhd-wallpapers.jpg',
      url: 'http://listen.radionomy.com/vadapav',
      radioUuid: 'f4af4953-6985-4ec8-8cbe-e68324c5e61f',
      apiKey: 'b9bc802d-3af8-445b-bf51-40b4e690cc0d'
    }, {
      id: 3,
      name: 'Party',
      face: 'http://studentmediahub.com/wp-content/uploads/2015/09/6908980-party-time.jpg',
      url: 'http://listen.radionomy.com/vadapav',
      radioUuid: 'f4af4953-6985-4ec8-8cbe-e68324c5e61f',
      apiKey: 'b9bc802d-3af8-445b-bf51-40b4e690cc0d'
    }, {
      id: 4,
      name: 'Devotion',
      face: 'http://touramazingindia.weebly.com/uploads/1/7/1/0/1710523/4727132.jpg?396x416',
      url: 'http://listen.radionomy.com/vadapav',
      radioUuid: 'f4af4953-6985-4ec8-8cbe-e68324c5e61f',
      apiKey: 'b9bc802d-3af8-445b-bf51-40b4e690cc0d'
    }];

    return {
      all: all,
      get: get
    };

    function all () {
      return channels;
    }

    function get (channelId) {
      for (var i = 0; i < channels.length; i++) {
        if (channels[i].id === parseInt(channelId)) {
          return channels[i];
        }
      }
      return null;
    }
  }
})();