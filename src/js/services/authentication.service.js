// const environment = require('../../../environment');

angular
    .module('app')
    .factory('authenticationService', ['$http', '$q', function ($http, $q) {
        return {
            //Code edited to create a function as when you require service it returns object by default so you can't return function directly. That's what understand...
            login: function (username, password, callback) {
                // let params = new $http.params;
                // params.set('username', username);
                // params.set('password', password);
                // params.set('grant_type', 'password');
                const authBase64 = btoa('client-web' + ':' + 123456);
                const req = {
                    method: 'POST',
                    url: '/blud-auth-server/oauth/token',
                    headers: {
                        'Authorization': `Basic ${authBase64}`,
                        "Accept": "application/json",
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    data: {},
                    params: {
                        'username': username,
                        'password': password,
                        'grant_type': 'password'
                    }
                };
                $http(req)
                    .then(
                        function (response) {
                            // login successful if there's a token in the response
                            console.log('service response api auth:');
                            console.log(response);
                            callback(response);
                        }, function (response) {
                            // login failed
                            console.log('service error response api auth:');
                            console.log(response);
                            callback(response);
                        });
            },

            logout: function () {
                delete localStorage.currentUser;
                $http.defaults.headers.common.Authorization = '';
            },
            getTahunAnggaran: function (param, callback) {
                const authBase64 = btoa('client-web' + ':' + 123456);
                const req = {
                    method: 'GET',
                    url: `/blud-resource-server/api/login/get-tahun-anggaran/${param}`,
                };
                $http(req)
                    .then(
                        function (response) {
                            // login successful if there's a token in the response
                            console.log('service response tahun anggaran:');
                            console.log(response);
                            callback(response);
                        }, function (response) {
                            callback(response);
                        });
            }
        }
    }]);


// angular
//     .module('app')
//     .factory('AuthenticationService', AuthenticationService);
//
// AuthenticationService.$inject = ['$http', '$location', '$localStorage'];
// function AuthenticationService($http, $location, $localStorage) {
//
//     const login = function (username, password, callback) {
//         $http.post('/api/authenticate', {username: username, password: password})
//             .then(function (response) {
//                 // login successful if there's a token in the response
//                 if (response.token) {
//                     // store username and token in local storage to keep user logged in between page refreshes
//                     $localStorage.currentUser = {username: username, token: response.token};
//
//                     // add jwt token to auth header for all requests made by the $http service
//                     $http.defaults.headers.common.Authorization = 'Bearer ' + response.token;
//
//                     // execute callback with true to indicate successful login
//                     callback(true);
//                 } else {
//                     // execute callback with false to indicate failed login
//                     callback(false);
//                 }
//             });
//     };
//
//     const logout = function () {
//         delete $localStorage.currentUser;
//         $http.defaults.headers.common.Authorization = '';
//     };
// }
