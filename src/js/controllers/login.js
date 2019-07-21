// angular
//     .module('app')
//     .controller('LoginFormController', LoginFormController);
//
// LoginFormController.$inject = ['$scope', '$http', '$location', 'authenticationService', 'ngStorage'];
// function LoginFormController($scope, $http, $location, authenticationService, $localStorage) {
//     console.log('Init Controller Form Login');
//     $scope.loginForm = {
//         username: "",
//         password: ""
//     };
//
//     $scope.loginFunction = function () {
//         console.log('Login Function');
//         // $location.path('/components/forms');
//         authenticationService.login($scope.loginForm.username, $scope.loginForm.password, function (result) {
//             console.log('result login');
//             console.log(result);
//             if (result.status === 200) {
//                 console.log(result.data);
//                 // $localStorage.setItem('currentUser', result.data);
//                 // $localStorage.put('currentUser', result.data);
//                 // $localStorage.put('myKey', 'myValue');
//                 $localStorage.setItem('currentUser', JSON.stringify(response.data));
//                 $location.path('/components/forms');
//             }
//         });
//     };
// }

angular
    .module('app')
    .controller("LoginFormController", ['$scope', '$http', '$location', 'authenticationService', function ($scope, $http, $location, authenticationService) {

        console.log('Init Controller Form Login');
        $scope.loginForm = {
            username: "",
            password: ""
        };

        $scope.loginFunction = function () {
            console.log('Login Function');
            // $location.path('/components/forms');
            authenticationService.login($scope.loginForm.username, $scope.loginForm.password, function (result) {
                console.log('result login');
                console.log(result);
                if (result.status === 200) {
                    console.log(result.data);
                    // $localStorage.setItem('currentUser', result.data);
                    // $localStorage.put('currentUser', result.data);
                    // $localStorage.put('myKey', 'myValue');
                    // $localStorage.setItem('currentUser', JSON.stringify(response.data));
                    localStorage.setItem('currentUser', JSON.stringify(result.data));
                    $location.path('/components/forms');
                }
            });
        };
    }]);
