angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('ListPersetujuanController', ListPersetujuanController)

function ListPersetujuanController($scope,$location,globalService) {
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    const token = 'Bearer ' + local.access_token;
    
       /** Get Data Pengguna */
    globalService.serviceGetData(`/blud-resource-server/api/skpd/${local.pengguna.skpdId}`, null, function (result) {
        console.log('Result Data Detail SKPD');
        console.log(result.data);
        if (result.status === 200) {
            // console.log('Response Result Detail SKPD');
            // console.log(result);
            $scope.skpdDetail = result.data;
            // console.log('Value Data Load Detail SKPD :');
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
            console.log(result);
        }
    });


    $scope.goToList = function (valueDpt) {
        console.log("Detail",valueDpt.idTmrbakasBlud)
        $location.search('idTmrbakasBlud', valueDpt.idTmrbakasBlud);
        $location.path('/persetujuan/DetailKasPersetujuan');
    }

    $scope.doCheck = function (valueDpt) {
        console.log("Setuju",valueDpt.idTmrbakasBlud)
    }

    $scope.doReject = function (valueDpt) {
        console.log("doReject",valueDpt.idTmrbakasBlud)      
    }

    $scope.value = null;
    $scope.doOpenModal = function (valOpen) {
        console.log(valOpen.idTmrbakasBlud);
        $scope.value = valOpen.idTmrbakasBlud;
    }
}   