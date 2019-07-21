angular
    .module('app')
    .factory('globalService', ['$http', '$q', function ($http, $q) {
        return {
            //Code edited to create a function as when you require service it returns object by default so you can't return function directly. That's what understand...
            findDataApi: function (callback) {
                const req = {
                    method: 'GET',
                    url: 'https://api.myjson.com/bins/8aegp'
                };
                $http(req)
                    .then(function (response) {
                        console.log('Service Response Find Data');
                        console.log(response);
                        // login successful if there's a token in the response
                        callback(response);
                    })
            },

            datatablesData: function (callback) {
                const req = {
                    method: 'GET',
                    url: 'https://l-lin.github.io/angular-datatables/archives/data.json'
                };
                $http(req)
                    .then(function (response) {
                        console.log('Service Response Find Data');
                        console.log(response);
                        // login successful if there's a token in the response
                        callback(response);
                    })
            }
        }
    }]);
