controllers.controller('ChannelsCtrl', function($scope, ChannelsService) {
    $scope.channels = ChannelsService.all();
});