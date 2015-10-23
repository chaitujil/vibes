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

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/tab/channels');

});
