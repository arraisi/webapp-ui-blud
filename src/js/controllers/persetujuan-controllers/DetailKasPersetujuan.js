angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('DetailKasPersetujuanController', DetailKasPersetujuanController);

function DetailKasPersetujuanController($scope, $location, globalService) {
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    const skpdIdUrlParam = $location.search().skpd;
    console.log("URL PARAM", $scope.skpdIdUrlParam);
    $scope.otoritasPengguna = local.pengguna.otor;


    /** Get Data Pengguna */
    globalService.serviceGetData(`/blud-resource-server/api/skpd/${skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId}`, null, function (result) {
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
    /** Load Kas */
    globalService.serviceGetData(`/blud-resource-server/api/kasController/findAll`, {
        tahunAnggaran: $scope.tahun,
        skpdId: skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId
    }, function (result) {
        console.log('Result Data Load Kas');
        console.log(result.data);
        $scope.valData = result.data
        if (result.status === 200) {
        } else {
            console.log('Response Result Load Kas');

        }
    });

    $scope.getTotal = function () {
        var total = 0;
        angular.forEach($scope.valData, function (value, key) {
            $scope.amount = value;
            var saldo = $scope.amount.vkasAudited;

            total += (+saldo); //<-- convert to number
            $scope.price = total;
        });

        return total;
    };


    $scope.doKembali = function () {
        $location.url($location.path());
        $location.path('/persetujuan/list');
    };

    $scope.doLanjut = function () {
        $location.path('/persetujuan/pendapatan/detail');
    };

    $scope.doGoTo = function (path) {
        console.log(path);
        switch (path) {
            case 'Kas':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('/persetujuan/kas-blud/detail');
                break;
            case 'Pendapatan':
                // $scope.urlParam
                $location.path('/persetujuan/pendapatan/detail');
                break;
            case 'Rencana':
                // $scope.urlParam
                $location.path('/persetujuan/rencana-belanja/detail');
                break;
            case 'Kegiatan':
                // $scope.urlParam
                $location.path('/persetujuan/kegiatan/detail');
                break;
            case 'Komponen':
                // $location.search('idDpt', valueDpt.idTrx);
                // $scope.urlParam
                $location.path('persetujuan/kegiatan/komponen/detail');
                break;
        }

    };

}