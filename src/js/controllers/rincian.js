angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('rincianController', rincianController);

function rincianController($scope, $location, toaster, globalService) {

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

}

