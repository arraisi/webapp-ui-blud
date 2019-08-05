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
                    }, function (response) {
                        // login failed
                        console.log('service error response');
                        console.log(response);
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
                    }, function (response) {
                        // login failed
                        console.log('service error response');
                        console.log(response);
                        callback(response);
                    })
            },

            serviceGetData: function (url, params, callback) {
                const local = JSON.parse(localStorage.getItem('currentUser'));
                const token = 'Bearer ' + local.access_token;
                const req = {
                    method: 'GET',
                    url: url,
                    headers: {
                        'Authorization': token,
                        "Accept": "application/json",
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    params: params
                };
                $http(req)
                    .then(function (response) {
                        // login successful if there's a token in the response
                        console.log(`service response api get ${url} :`);
                        console.log(response);
                        callback(response);
                    }, function (response) {
                        // login failed
                        console.log('service error response');
                        console.log(response);
                        callback(response);
                    });
            },

            servicePostData: function (url, params, body, callback) {
                const local = JSON.parse(localStorage.getItem('currentUser'));
                const token = 'Bearer ' + local.access_token;
                const req = {
                    method: 'POST',
                    url: url,
                    headers: {
                        'Authorization': token,
                        "Accept": "application/json",
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    params: params,
                    data: body
                };
                $http(req)
                    .then(function (response) {
                        // login successful if there's a token in the response
                        console.log(`service response api get ${url} :`);
                        console.log(response);
                        callback(response);
                    }, function (response) {
                        // login failed
                        console.log('service error response');
                        console.log(response);
                        callback(response);
                    });
            },

            serviceDeleteData: function (url, params, callback) {
                const local = JSON.parse(localStorage.getItem('currentUser'));
                const token = 'Bearer ' + local.access_token;
                const req = {
                    method: 'DELETE',
                    url: url,
                    headers: {
                        'Authorization': token,
                        "Accept": "application/json",
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    params: params
                };
                $http(req)
                    .then(function (response) {
                        // login successful if there's a token in the response
                        console.log(`service response api get ${url} :`);
                        console.log(response);
                        callback(response);
                    }, function (response) {
                        // login failed
                        console.log('service error response');
                        console.log(response);
                        callback(response);
                    });
            },
        }
    }]);
