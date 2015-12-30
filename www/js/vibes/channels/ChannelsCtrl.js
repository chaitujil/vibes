(function () {
    'use strict';

    angular.module('vibes')
        .controller('ChannelsCtrl', channelsCtrl);

    channelsCtrl.$inject = ['ChannelsService'];

    function channelsCtrl(ChannelsService) {
        var vm = this;
        vm.channels = null;

        init();
        function init() {
            vm.channels = ChannelsService.all();
        }
    }
})();