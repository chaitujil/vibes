// Ionic vibes App
(function () {
    'use strict';

    angular.module('vibes', ['ionic', 'ngCordova', 'ngSpecialOffer', 'ngStorage'])
        .run(runIonic)
        .config(configStateProvider)
        .config(['$httpProvider', configHttpProvider]);
            
    function runIonic($ionicPlatform, $specialOffer) {
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

            var appVersion = '1.0.21';
            var iosId = '1120991525';
            var androidPackageName = 'com.ionicframework.example146317';

            $specialOffer.init({
                id           : 'com.ionicframework.example146317' + appVersion,
                showOnCount  : 10,
                title        : 'Bindas',
                text         : 'If you enjoy this app please take a moment to rate it',
                agreeLabel   : 'Rate App',
                remindLabel  : 'Remind Me Later',
                declineLabel : 'Not interested',
                onAgree      : function () {
                    if (window.device.platform === 'Android') {
                        window.open($specialOffer.googlePlayUrl(androidPackageName));
                    } else if (window.device.platform === 'iOS') {
                        window.open($specialOffer.appStoreUrl(iosId));
                    }
                },
                onDecline   : function () {
                    // declined
                },
                onRemindMeLater : function () {
                    // will be reminded in 5 more uses
                }
            });

         });
    }

    function configStateProvider($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
        $ionicConfigProvider.tabs.position('bottom');
        $ionicConfigProvider.tabs.style('standard');
        $ionicConfigProvider.backButton.previousTitleText(false);
        $ionicConfigProvider.backButton.text("");
        $stateProvider
            .state('tab', {
            // setup an abstract state for the tabs directive
                url: '/tab',
                abstract: true,
                templateUrl: 'js/vibes/other/tabs.html'
            })
            // Each tab has its own nav history stack:
            .state('tab.songs', {
                url: '/songs',
                views: {
                    'tab-songs': {
                        cache: false,
                        templateUrl: 'js/vibes/songs/tab-songs.html',
                        controller: 'SongsCtrl as songsCtrl'
                    }
                }
            })
            .state('tab.dialogues', {
                url: '/dialogues',
                views: {
                    'tab-dialogues': {
                        cache: false,
                        templateUrl: 'js/vibes/dialogues/tab-dialogues.html',
                        controller: 'DialoguesCtrl as dialoguesCtrl'
                    }
                }
            })
            .state('tab.settings', {
                url: '/settings',
                views: {
                    'tab-settings': {
                        templateUrl: 'js/vibes/settings/tab-settings.html',
                        controller: 'SettingsCtrl as settingsCtrl'
                    }
                }
            })
            .state('tab.contactus', {
                url: '/settings/contactus',
                views: {
                    'tab-settings': {
                        templateUrl: 'js/vibes/settings/tab-contact-us.html',
                        controller: 'ContactUsCtrl as contactUsCtrl'
                    }
                }
            })
            .state('tab.sharethisapp', {
                url: '/settings/shareapp',
                views: {
                    'tab-settings': {
                        templateUrl: 'js/vibes/settings/tab-share-app.html',
                        controller: 'ShareThisAppCtrl as shareThisAppCtrl'
                    }
                }
            }).state('tab.rateapp', {
                url: '/settings/rateapp',
                views: {
                    'tab-settings': {
                        templateUrl: 'js/vibes/settings/tab-rate-app.html',
                        controller: 'RateAppCtrl as rateAppCtrl'
                    }
                }
            }).state('tab.sendsuggestion', {
                url: '/settings/sendsuggestion',
                views: {
                    'tab-settings': {
                        templateUrl: 'js/vibes/settings/tab-send-suggestion.html',
                        controller: 'SendSuggestionCtrl as sendSuggestionCtrl'
                    }
                }
            });

        $urlRouterProvider.otherwise('/tab/songs');
    }

    function configHttpProvider($httpProvider) {
        //initialize get if not there
        $httpProvider.defaults.cache = false;
        if (!$httpProvider.defaults.headers.get) {
            $httpProvider.defaults.headers.get = {};
        }
    }
})();
