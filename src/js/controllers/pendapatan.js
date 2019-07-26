angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('PendapatanController', PendapatanController)
    .controller('RincianPendapatanController', RincianPendapatanController)
    .controller('AkbPendapatanController', AkbPendapatanController);

// Function Untuk Kontroller Pendapatan List
function PendapatanController($scope, $location, toaster, globalService) {

    // ======== Awal Init Porject
    console.log('Init Controller Form Pendapatan');
    // $scope.loadPendapatan('2020', '12835');
    const tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    globalService.serviceGetData(`/blud-resource-server/api/pendapatan/load`, {
        tahunAnggaran: tahun,
        skpdId: local.pengguna.skpdId
    }, function (result) {
        console.log('Result Data Load Pendapatan');
        console.log(result.data);
        if (result.status === 200) {
            console.log('Response Result Load Pendapatan');
            console.log(result);
            $scope.loadDataPendapatan = result.data;
            console.log('Value Data Load Pendatan :');
            console.log($scope.loadDataPendapatan);
        } else {
            console.log('Response Result Load Pendapatan');
            console.log(result);
        }
    });

    // ======== Akhir Init Project


    // ======== Awal Inisialisasi Variable
    $scope.nameEmail = "";
    $scope.formTesting = {
        name: "",
        email: "",
        phone: ""
    };
    $scope.loadDataPendapatan = [];
    // $scope.loadDataPendapatan = {
    //     idTrx: null,
    //     tahunAnggaran: null,
    //     idSkpd: null,
    //     skpd: null,
    //     namaSkpd: null,
    //     idBas: null,
    //     kodeAkun: null,
    //     namaAkun: null,
    //     anggaranDpa: null,
    //     anggaranTapd: null
    // };
    // ======== Awal Inisialisasi Variable


    // ======== Awal Function
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
