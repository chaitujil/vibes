// Ionic vibes App

var app = angular.module('vibes', ['ionic', 'vibes.controllers', 'vibes.services']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
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

app.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'partials/tabs.html'
  })

  // Each tab has its own nav history stack:

  .state('tab.radio', {
    url: '/radio',
    views: {
      'tab-radio': {
        templateUrl: 'partials/tab-radio.html',
        controller: 'RadioCtrl'
      }
    }
  })

  .state('tab.channels', {
      url: '/channels',
      views: {
        'tab-channels': {
          templateUrl: 'partials/tab-channels.html',
          controller: 'ChannelsCtrl'
        }
      }
    })

  .state('tab.ratings', {
    url: '/ratings',
    views: {
      'tab-ratings': {
        templateUrl: 'partials/tab-ratings.html',
        controller: 'RatingsCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/radio');

});
