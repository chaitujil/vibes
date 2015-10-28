services.service('HttpService', function ($http, $q) {

    var getCurrentSongUrl = 'http://api.radionomy.com/currentsong.cfm' +
        '?radiouid=f4af4953-6985-4ec8-8cbe-e68324c5e61f' +
        '&apikey=b9bc802d-3af8-445b-bf51-40b4e690cc0d' +
        '&callmeback=yes' +
        '&type=xml' +
        '&cover=yes';

    this.getCurrentSongInfo = function () {
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
