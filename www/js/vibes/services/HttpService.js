services.service('HttpService', function ($http, $q) {

    this.getCurrentSongInfo = function (radioUuid, apiKey) {
        var getCurrentSongUrl = 'http://api.radionomy.com/currentsong.cfm' +
            '?radiouid=' + radioUuid +
            '&apikey=' + apiKey +
            '&callmeback=yes' +
            '&type=xml' +
            '&cover=yes';
        return httpGet(getCurrentSongUrl);
    };

    var httpGet = function (url, reqParam) {
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
});
