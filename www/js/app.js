// Ionic vibes App
(function () {
    'use strict';

    angular.module('vibes', ['ionic', 'angularXml2json', 'ngCordova', 'ngSpecialOffer'])
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

            // for Rate this app feature
            // TODO set proper values below to make it work
            var appVersion = '1.0.0';
            var iosId = '12345';
            var androidPackageName = 'your.package.name';

            $specialOffer.init({
                id           : 'my-special-offer' + appVersion,
                showOnCount  : 5,
                title        : 'A Special Offer',
                text         : 'If you enjoy this app please take a moment to rate it',
                agreeLabel   : 'Rate App',
                remindLabel  : 'Remind Me Later',
                declineLabel : 'Not interested',
                onAgree      : function () {
                    // agree
                    if (window.device.platform === 'iOS') {
                        window.open($specialOffer.appStoreUrl(iosId));
                    } else if (window.device.platform === 'Android') {
                        window.open($specialOffer.googlePlayUrl(androidPackageName));
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

    function configStateProvider($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('tab', {
            // setup an abstract state for the tabs directive
                url: '/tab',
                abstract: true,
                templateUrl: 'js/vibes/other/tabs.html'
            })
            // Each tab has its own nav history stack:
            .state('tab.channels', {
                url: '/channels',
                views: {
                    'tab-channels': {
                        cache: false,
                        templateUrl: 'js/vibes/channels/tab-channels.html',
                        controller: 'ChannelsCtrl as channelsCtrl'
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
