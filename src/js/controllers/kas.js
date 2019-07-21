angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('KasController', function ($scope, toaster, globalService) {

        const vm = this;
        globalService.datatablesData(function (result) {
            if (result.status === 200) {
                console.log('Response Result Datatable Data');
                console.log(result);
                vm.persons = result.data;
            } else {
                console.log('Response Result Datatable Data');
                console.log(result);
                // $scope.vm.error = 'Username or password is incorrect';
                // $scope.vm.loading = false;
            }
        });

        $scope.pop = function () {
            toaster.pop('info', "title", "text");
        };

        $scope.testToastr = function () {
            console.log('Testing Toastr');
            // toaster.pop('info', "title", "text");
            toaster.pop({
                type: 'error',
                title: 'Title text',
                body: 'Body text',
                timeout: 3000
            });
        }
    });
