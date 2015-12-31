(function () {
    'use strict';

    angular.module('vibes')
        .factory('HttpService', httpService);

    httpService.$inject = ['$http', '$q'];

    function httpService($http, $q) {
        return {
            'getGowthamCurrentSongInfo': getGowthamCurrentSongInfo,
            'getRadionomyCurrentSongInfo': getRadionomyCurrentSongInfo
        };

        function getRadionomyCurrentSongInfo(radioUuid, apiKey) {
            var getCurrentSongUrl = 'http://api.radionomy.com/currentsong.cfm' +
                '?radiouid=' + radioUuid +
                '&apikey=' + apiKey +
                '&callmeback=yes' +
                '&type=xml' +
                '&cover=yes';
            return httpGet(getCurrentSongUrl);
        }

        function getGowthamCurrentSongInfo(stationName) {
            var getCurrentSongInfoUrl = 'http://104.131.151.101/' + stationName + '/songinfo.txt';
            return httpGet(getCurrentSongInfoUrl);
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
