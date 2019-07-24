angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('KasController', function ($scope, toaster,kasService) {
        
        const vm = this;
        $scope.readonlySaldo = false;

        //formBuild
        $scope.formData;
        $scope.valData;
        
        kasService.findDataApi(function (result) {
            if (result.status === 200) {
                console.log('Response Result Datatable Data');
                console.log(result.data);
                $scope.valData = result.data;
                console.log()
            } else {
                console.log('Response Result Datatable Data');
                console.log(result);
                // $scope.vm.error = 'Username or password is incorrect';
                // $scope.vm.loading = false;
            }
        });

        // $scope.saveData = function() {
        //     console.log('you can save all the valData as a document: ');
        //     console.log($scope.valData);
        //     console.log('or save row by row:');
        //     var index = 0;
        //     $scope.valData.forEach(function (row) {
        //         console.log('row #' + (index++) + ': ' + JSON.stringify(row));
        //     });
        // }

        
    $scope.saveData = function () {
        $scope.valData.forEach(function (row) {
                    console.log('row #'+ ': ' + JSON.stringify(row));
                });
        kasService.saveData(null,$scope.valData, function (result) {
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result Delete Data');
                console.log(result);
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil Hapus Data',
                    body: 'Data Jenis Pelanggaran Berhasil Dihapus',
                    timeout: 5000
                });
                $location.path('/components/list-example');
            } else {
                console.log('Response Result Delete Data');
                console.log(result);
            }
        });
    };

     

        $scope.suntingAnggaran = function(){
          $scope.readonlySaldo = true;
          
         }

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
