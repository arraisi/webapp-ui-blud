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
                    $location.path('/components/forms');
                }
                // if (result === true) {
                //     console.log($scope.loginForm.username + ' - ' + $scope.loginForm.password);
                //     console.log(result);
                //     // $location.path('/');
                // } else {
                //     console.log('result response service');
                //     console.log(result);
                //     // $scope.vm.error = 'Username or password is incorrect';
                //     // $scope.vm.loading = false;
                // }
            });
        };
    }]);
