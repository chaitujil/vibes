controllers.controller('ChannelDetailCtrl', function ($scope, $stateParams, ChannelsService, HttpService) {
    $scope.channel = ChannelsService.get($stateParams.channelId);

    HttpService.getCurrentSongInfo().then(function (response) {
        $scope.currentSongInfo = response;
    })
});