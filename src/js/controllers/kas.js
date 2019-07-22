angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('KasController', function ($scope, $location, toaster, globalService) {

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

        globalService.serviceGetData('/dkipp/api/chart/pelanggaran/jumlah/list', null, function (result) {
           console.log('Result Data Get Master DKIPP');
           console.log(result.data);
        });

        const queryUser = $location.search().kasId;
        console.log('kasId data : ');
        console.log('kasId data : '+ queryUser);

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
        };

        $scope.tambahData = function () {
            $location.path('/components/forms');
        }
    });
