(function () {
    'use strict';

    angular.module('vibes')
        .controller('ChannelsCtrl', channelsCtrl);

    channelsCtrl.$inject = ['$scope', 'ChannelsService'];

    function channelsCtrl($scope, ChannelsService) {
        $scope.channels = ChannelsService.all();
    }
})();