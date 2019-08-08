angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('KasController', KasController);

function KasController($scope, $location, toaster, globalService, kasService) {
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));

    $scope.readonlySaldo = false;

    $scope.formData;
    $scope.valData;
    $scope.amount;

    $scope.formatPrice;

    $scope.pop = function () {
        toaster.pop('info', "title", "text");
    };

    /** Load Kas */
    globalService.serviceGetData(`/blud-resource-server/api/kasController/findAll`, {
        tahunAnggaran: $scope.tahun,
        skpdId: local.pengguna.skpdId
    }, function (result) {
        $scope.valData = result.data
        if (result.status === 200) {
        } else {
            console.log('Response Result Load Kas');
            console.log(result);
        }
    });


    /** Load SKPD By ID SKPD */
    globalService.serviceGetData(`/blud-resource-server/api/skpd/${local.pengguna.skpdId}`, null, function (result) {
        if (result.status === 200) {
            $scope.skpdDetail = result.data;
        } else {
            console.log('Response Result Load Detail SKPD');
            console.log(result);
        }
    });

    $scope.getTotal = function () {
        var total = 0;
        var formatPrice = "";
        angular.forEach($scope.valData, function (value, key) {
            $scope.amount = value
            var saldo = $scope.amount.vkasAudited

            total += (+saldo); //<-- convert to number
            formatPrice =  accounting.formatMoney(total, "Rp ", 2, ".", ",");
        });

        return formatPrice;
    };


    $scope.saveData = function () {
        $scope.readonlySaldo = false;
        kasService.saveData($scope.valData, function (result) {
            console.log(result.data);

            if (result.status === 200) {
                console.log('Response Result Update Data');
                console.log(result);
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil Update Data',
                    body: 'Data Kas Berhasil DiUpdate',
                    timeout: 5000
                });
            } else {
                console.log('Response Result Delete Data');
                console.log(result);
            }
        });
    };

    $scope.suntingAnggaran = function () {
        $scope.readonlySaldo = true;

    };

    $scope.pop = function () {
        toaster.pop('info', "title", "text");
    };

    $scope.testToastr = function () {
        console.log('Testing Toastr');
        // toaster.pop('info', "title", "text");
        toaster.pop({
            type: 'error',
            title: 'Title text',
            body: 'Body text',
            timeout: 3000
        });
    }
}
