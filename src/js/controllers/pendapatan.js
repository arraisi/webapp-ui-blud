angular
    .module('app')
    .controller('PendapatanController', ['$scope', '$location', 'formExampleService', function ($scope, $location, formExampleService) {

        console.log('Init Controller Form Pendapatan');
        $scope.nameEmail = "";
        $scope.formTesting = {
            name: "",
            email: "",
            phone: ""
        };

        $scope.getFormValue = function () {
            console.log($scope.formTesting);
            console.log('Name ' + $scope.formTesting.name);
            console.log('Email ' + $scope.formTesting.email);
            $scope.nameEmail = $scope.formTesting.name + " (" + $scope.formTesting.email + ")";
        };

        $scope.findData = function () {
            console.log('Find Data Function');
            formExampleService.findDataApi(function (result) {
                if (result.status === 200) {
                    console.log('Response Result True');
                    console.log(result);
                } else {
                    console.log('Response Result False');
                    console.log(result);
                    // $scope.vm.error = 'Username or password is incorrect';
                    // $scope.vm.loading = false;
                }
            });
        };

        $scope.routeToKas = function () {
            console.log('Method Route To Kas');
            $location.search('kasId', 'tesfsdgdfg-324sdsdf-i2394sdf');
            $location.path('/kas-blud');
        };

    }]);
