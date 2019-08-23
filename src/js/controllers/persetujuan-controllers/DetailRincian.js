angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('DetailRincianController', DetailRincianController);

function DetailRincianController($scope, $location, toaster, globalService) {

    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));

    /** Load Rincian Belanja */
    globalService.serviceGetData(`/blud-resource-server/api/rincianCtrl/findAll`, {
        tahunAnggaran: $scope.tahun,
        skpdId: local.pengguna.skpdId
    }, function (result) {
        console.log('Result Data Load Kas');
        console.log(result.data);
        $scope.valData = result.data
        if (result.status === 200) {
        } else {
            console.log('Response Result Load Rincian Belanja');
            console.log(result);
        }
    });


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

    $scope.doGoTo = function (path) {
        console.log(path);
        switch (path) {
            case 'Kas':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('/persetujuan/DetailKasPersetujuan');
                break;
            case 'Pendapatan':
                $scope.urlParam   
                $location.path('/persetujuan/DetailPendapatanPersetujuan');
                break;
            case 'Rincian':
                $scope.urlParam   
                $location.path('/persetujuan/DetailRincian');
                break;
            case 'Kegiatan':
                $scope.urlParam   
                $location.path('/persetujuan/DetailKegiatanPersetujuan');
                break;
            case 'Komponen':
                // $location.search('idDpt', valueDpt.idTrx);
                $scope.urlParam
                $location.path('persetujuan/DetailKomponenPersetujuan');
                break;
        }
     
    };


}

