angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('KegiatanController', KegiatanController);

// Function Untuk Kontroller Kegiatan List
function KegiatanController($scope, $location, toaster, globalService) {

    // ======== Awal Init Porject
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));


    /** Load SKPD By ID SKPD */
    globalService.serviceGetData(`/blud-resource-server/api/skpd/${local.pengguna.skpdId}`, null, function (result) {
        console.log('Result Data Detail SKPD');
        console.log(result.data);
        if (result.status === 200) {
            console.log('Response Result Detail SKPD');
            console.log(result);
            $scope.skpdDetail = result.data;
            console.log('Value Data Load Detail SKPD :');
        } else {
            console.log('Response Result Load Detail SKPD');
            console.log(result);
        }
    });

    $scope.goToTambahKegiatan = function () {
        console.log('Go To Tambah Kegiatan');
        $location.path('/kegiatan/tambah');
    }
}
