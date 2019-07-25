angular
    .module('app')
    .factory('kasService', ['$http', '$q', function ($http, $q) {
        return {
            //Code edited to create a function as when you require service it returns object by default so you can't return function directly. That's what understand...
            
            findDataApi: function (callback) {
                const local = JSON.parse(localStorage.getItem('currentUser'));
                const token = 'Bearer ' + local.access_token;
                const req = {
                    method: 'GET',
                    url: 'blud-resource-server/api/kasController/findAll',
                    headers: {
                        'Authorization': token,
                        "Accept": "application/json",
                        "Content-Type": "application/json;charset=utf-8"
                    }
                };
                $http(req)
                    .then(function (response) {
                        console.log('Service Response Find Data');
                        console.log(response);
                        // login successful if there's a token in the response
                        callback(response);
                    })
            },
            saveData: function (body, callback) {
                console.log(body)
             
                const local = JSON.parse(localStorage.getItem('currentUser'));
                const token = 'Bearer ' + local.access_token;
                const req = {
                    method: 'POST',
                    url: 'blud-resource-server/api/kasController/save',
                    headers: {
                        'Authorization': token,
                        "Accept": "application/json",
                        "Content-Type": "application/json;charset=utf-8"
                    },
                    data: body
                };
                $http(req)
                    .then(function (response) {
                        // login successful if there's a token in the response
                        // console.log(`service response api get ${url} :`);
                        console.log(response);
                        callback(response);
                    });
            },
        }
    }]);
