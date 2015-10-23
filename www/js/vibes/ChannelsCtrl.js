controllers.controller('ChannelsCtrl', function($scope, Channels) {
    $scope.channels = Channels.all();
});