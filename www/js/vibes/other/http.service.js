(function () {
    'use strict';

    angular.module('vibes')
        .factory('HttpService', HttpService);

    HttpService.$inject = ['$http', '$q'];

    function HttpService($http, $q) {
        return {
            'getCurrentChannelMetadata': getCurrentChannelMetadata
        };

        function getCurrentChannelMetadata(stationName) {
            var getCurrentChannelMetadataUrl = 'http://104.131.151.101/' + stationName + '/songinfo.txt';
            return httpGet(getCurrentChannelMetadataUrl);
        }

        function httpGet(url, reqParam) {
            var d = $q.defer();

            if (reqParam == null) {
                $http.get(url).success(function (response) {
                    d.resolve(response);
                }).error(function () {
                    d.reject();
                });
            } else {
                $http.get(url, reqParam).success(function (response) {
                    d.resolve(response);
                }).error(function () {
                    d.reject();
                });
            }

            return d.promise;
        }
    }
})();
