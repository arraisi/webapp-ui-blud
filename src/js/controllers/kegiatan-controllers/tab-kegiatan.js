angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('TabKegiatanController', TabKegiatanController);

// Function Untuk Kontroller TabKegiatanController
function TabKegiatanController($scope, $location, toaster, globalService) {

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

    $scope.formTambahKegiatan = {
        urusan: '',
        program: '',
        noKegiatan: '',
        namaKegiatan: '',
        sasaran: '',
        waktuPelaksanaan: '',
        lokasiKegiatan: '',
        sumberDana: ''
    };

    $scope.tabGoTo = function (jenisTab) {
        console.log(jenisTab);
        switch (jenisTab) {
            case 'kegiatan':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('/kegiatan/tambah');
                break;
            case 'komponen':
                // $location.search('idDpt', valueDpt.idTrx);
                // $location.path('/kegiatan/komponen');
                toaster.pop({
                    type: 'success',
                    title: 'On Progress',
                    body: '',
                    timeout: 3000
                });
                break;
            case 'rpa':
                // $location.search('idDpt', valueDpt.idTrx);
                // $location.path('/kegiatan/rpa');
                toaster.pop({
                    type: 'success',
                    title: 'On Progress',
                    body: '',
                    timeout: 3000
                });
                break;
        }
    };

    $scope.simpanTambahKegiatan = function (form) {
        console.log(form);
    };

}
