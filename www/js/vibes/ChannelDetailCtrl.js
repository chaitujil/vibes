controllers.controller('ChannelDetailCtrl', function($scope, $stateParams, Channels) {
    $scope.channel = Channels.get($stateParams.channelId);
});