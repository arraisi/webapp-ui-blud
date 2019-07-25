angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('PendapatanController', PendapatanController)
    .controller('RincianPendapatanController', RincianPendapatanController)
    .controller('AkbPendapatanController', AkbPendapatanController);

// Function Untuk Kontroller Pendapatan List
function PendapatanController($scope, $location, toaster, globalService) {
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

    $scope.goToRincian = function () {
        console.log('Method Route To Rincian');
        $location.search('idDpt', '1');
        $location.path('/pendapatan/rincian');
    };

    $scope.goToAkb = function () {
        console.log('Method Route To AKB');
        $location.search('idDpt', '1');
        $location.path('/pendapatan/akb');
    };
}

// Function Untuk Kontroller Rincian Pendapatan
function RincianPendapatanController($scope, $location, toaster, globalService) {
    const idDpt = $location.search().idDpt;
    if (idDpt) {
        console.log(`ID DPT ${idDpt}`);
    } else {
        $location.path('/pendapatan');
    }

    // Kembali Ke Page Pendapatan List
    $scope.goToPendapatan = function () {
        $location.path('/pendapatan');
    };

    // Simpan Data Rincian Pendapatan
    $scope.simpanDataRinci = function () {
        $location.path('/pendapatan');
    }
}

// Function Untuk Controller AKB Pendapatan
function AkbPendapatanController($scope, $location, toaster, globalService) {
    const idDpt = $location.search().idDpt;
    if (idDpt) {
        console.log(`ID DPT ${idDpt}`);
    } else {
        $location.path('/pendapatan');
    }
}
