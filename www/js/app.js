// Ionic vibes App

var app = angular.module('vibes', ['ionic', 'vibes.controllers', 'vibes.services']);

app.run(function ($ionicPlatform) {
    $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
});

app.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider

        .state('login', {
            url: '/login',
            templateUrl: 'partials/login.html',
            controller: 'LoginCtrl'
        })

        // setup an abstract state for the tabs directive
        .state('tab', {
            url: '/tab',
            abstract: true,
            templateUrl: 'partials/tabs.html'
        })

        // Each tab has its own nav history stack:

        .state('tab.channels', {
            url: '/channels',
            views: {
                'tab-channels': {
                    templateUrl: 'partials/tab-channels.html',
                    controller: 'ChannelsCtrl'
                }
            }
        })

        .state('tab.channel-detail', {
            url: '/channels/:channelId',
            views: {
                'tab-channels': {
                    templateUrl: 'partials/tab-channel-detail.html',
                    controller: 'ChannelDetailCtrl'
                }
            }
        })

        .state('tab.profile', {
            url: '/profile',
            views: {
                'tab-profile': {
                    templateUrl: 'partials/tab-profile.html',
                    controller: 'ProfileCtrl'
                }
            }
        });

    $urlRouterProvider.otherwise('/login');

});

app.config(['$httpProvider', function($httpProvider) {
    //initialize get if not there
    $httpProvider.defaults.cache = false;
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
}]);
