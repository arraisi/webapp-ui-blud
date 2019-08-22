angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('DetailKegiatanPersetujuanController', DetailKegiatanPersetujuanController);

function DetailKegiatanPersetujuanController($scope,$location,globalService) {
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    $scope.urlParam =  $location.search().idTmrbakasBlud
    console.log("URL PARAM",$scope.urlParam)
       /** Get Data Pengguna */
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
    
    /** Load Kas */
    
    globalService.serviceGetData(`/blud-resource-server/api/kasController/findAll`, {
        tahunAnggaran: $scope.tahun,
        skpdId: local.pengguna.skpdId
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
            $scope.amount = value
            var saldo = $scope.amount.vkasAudited

            total += (+saldo); //<-- convert to number
            $scope.price = total;
        });

        return total;
    }

    

    $scope.doKembali = function () {
        $location.url($location.path());
        $location.path('/ListPersetujuan');
    };

    $scope.goToDetail = function (data) {
        console.log(data)
        $location.search('idTmrbakasBlud', data.idTmrbakasBlud);
        $location.path('/persetujuan/DetailKegiatanPersetujuan/DetailSkpd');
    };

    

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