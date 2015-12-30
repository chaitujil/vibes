// Ionic vibes App
(function() {
    'use strict';

    angular.module('vibes', ['ionic', 'angularXml2json'])
        .run(runIonic)
        .config(configStateProvider)
        .config(['$httpProvider', configHttpProvider]);

    function runIonic ($ionicPlatform) {
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
    }

    function configStateProvider ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('login', {
                url: '/login',
                templateUrl: 'partials/login.html',
                controller: 'LoginCtrl as loginCtrl'
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
                        controller: 'ChannelsCtrl as channelsCtrl'
                    }
                }
            })
            .state('tab.channel-detail', {
                url: '/channels/:channelId',
                views: {
                    'tab-channels': {
                        templateUrl: 'partials/tab-channel-detail.html',
                        controller: 'ChannelDetailCtrl as channelDetailCtrl'
                    }
                }
            })
            .state('tab.settings', {
                url: '/settings',
                views: {
                    'tab-settings': {
                        templateUrl: 'partials/tab-settings.html',
                        controller: 'SettingsCtrl as settingsCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/channels');
    }

    function configHttpProvider($httpProvider) {
        //initialize get if not there
        $httpProvider.defaults.cache = false;
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
    }
})();
