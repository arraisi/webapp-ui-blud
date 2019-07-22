angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('FormExampleController', FormExampleController)
    .controller('ListExampleController', ListExampleController);

function FormExampleController($scope, $location, toaster, formExampleService, globalService) {

    console.log('Init Controller Form Example');
    $scope.nameEmail = "";
    $scope.idDelete = null;
    $scope.formTesting = {
        id: null,
        jenisPelanggaran: null,
        kode: null
    };

    // Get Data From Query Param
    const id = $location.search().id;
    if (id) {
        globalService.serviceGetData(`/dkipp/api/master/jenis-pelanggaran/${id}/findById`, null, function (result) {
            console.log('Result Data Get Jenis Pelanggaran By ID');
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result Get Jenis Pelanggaran By ID');
                console.log(result);
                $scope.formTesting = result.data;
            } else {
                console.log('Response Result Get Jenis Pelanggaran By ID');
                console.log(result);
                // $scope.vm.error = 'Username or password is incorrect';
                // $scope.vm.loading = false;
            }
        });
    }

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

    $scope.saveData = function () {
        console.log('Delete Data Function');
        globalService.servicePostData(`/dkipp/api/master/jenis-pelanggaran/save`, null, $scope.formTesting, function (result) {
            console.log('Result Data Delete Master DKIPP');
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

    $scope.cancelTambahData = function () {
        $location.path('/components/list-example')
    };

    $scope.testToastr = function () {
        console.log('Testing Toastr');
        // toaster.pop('info', "title", "text");
        toaster.pop({
            type: 'success',
            title: 'Title text',
            body: 'Body text',
            timeout: 3000
        });
    };
}

function ListExampleController($scope, $location, toaster, formExampleService, globalService) {
    const vm = this;
    globalService.serviceGetData('/dkipp/api/master/jenis-pelanggaran/list', null, function (result) {
        console.log('Result Data Get Master DKIPP');
        console.log(result.data);
        if (result.status === 200) {
            console.log('Response Result Datatable Data');
            console.log(result);
            vm.master = result.data;
        } else {
            console.log('Response Result Datatable Data');
            console.log(result);
            // $scope.vm.error = 'Username or password is incorrect';
            // $scope.vm.loading = false;
        }
    });

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
    };

    $scope.deleteData = function () {
        console.log('Delete Data Function');
        globalService.servicePostData(`/dkipp/api/master/jenis-pelanggaran/${$scope.idDelete}`, null, function (result) {
            console.log('Result Data Delete Master DKIPP');
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

    $scope.editData = function (id) {
        $location.search('id', id);
        $location.path('/components/forms');
    };

    $scope.openModalDelete = function () {
        console.log('Open Modal');
        $scope.tp= -237;
        $scope.bg = "bg-modal";
        $scope.disp = "d-block";
    };

    $scope.closeModalDelete = function() {
        $scope.display = "d-none";
        $scope.bg = "";
    };
}
