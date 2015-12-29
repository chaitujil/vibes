(function () {
    'use strict';

    angular.module('vibes')
        .service('ChannelsCtrl', channelsCtrl);

    function channelsCtrl($scope, ChannelsService) {
        $scope.channels = ChannelsService.all();
    }
})();