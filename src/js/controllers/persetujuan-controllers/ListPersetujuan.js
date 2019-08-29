angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('ListPersetujuanController', ListPersetujuanController)

function ListPersetujuanController($scope, $location, globalService) {

    $scope.accounting = accounting;

    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    $scope.otoritasPengguna = local.pengguna.otor;
    $scope.penggunaLogin = local.pengguna;

    $scope.catatanPenolakan = null;

    $scope.pilihSkpd = function (val) {
        console.log(val);
        $scope.skpd = val;
    };


    /** DT Options For Datatables */
    $scope.persons = [];
    $scope.dtInstance = {};
    $scope.dtOptions = {
        paginationType: 'full_numbers',
        searching: true,
        responsive: false,
        dom: "Bft<'row'<'col-sm-12'ip><'col-sm-12'l>>",
        language: {
            "sEmptyTable": "Tidak Ada Data Yang Ditemukan",
            "sInfo": "Menunjukan _START_ sampai _END_ dari _TOTAL_ data",
            "sInfoEmpty": "Menunjukan 0 sampai 0 dari 0 data",
            "sInfoFiltered": "(filter dari _MAX_ total data)",
            "sInfoPostFix": "",
            "sInfoThousands": ",",
            "sLengthMenu": "Menunjukkan _MENU_ data",
            "sLoadingRecords": "Memuat...",
            "sProcessing": "Mengolah...",
            "sSearch": "Cari:",
            "sZeroRecords": "Tidak ada data yang sesuai",
            "oPaginate": {
                "sFirst": "Pertama",
                "sLast": "Terakhir",
                "sNext": "Selanjutnya",
                "sPrevious": "Sebelumnya"
            },
            "oAria": {
                "sSortAscending": ": activate to sort column ascending",
                "sSortDescending": ": activate to sort column descending"
            }
        }
    };

    if (local.pengguna.otor < 3) {
        $location.path('/persetujuan/kas-blud/detail');
    }

    $scope.formAlasanTolak = {
        alasanTolak: null
    };

    $scope.validationPenolakan = {
        alasanTolakIsValid: false,
        alasanTolakIsTouched: false,
    };

    $scope.validateTolak = function () {
        if (!$scope.formAlasanTolak.alasanTolak) {
            $scope.validationPenolakan.alasanTolakIsValid = false;
            $scope.validationPenolakan.alasanTolakIsTouched = true;
        } else {
            $scope.validationPenolakan.alasanTolakIsValid = true;
            $scope.validationPenolakan.alasanTolakIsTouched = false;
        }

    };

    /** Get Data Pengguna */
    globalService.serviceGetData(`/blud-resource-server/api/skpd/list`, {tahunAnggaran: $scope.tahun}, function (result) {
        console.log('Result Data Detail SKPD');
        console.log(result.data);
        if (result.status === 200) {
            console.log('Response Result List SKPD');
            console.log(result);
            $scope.listSkpd = result.data;
            console.log('Value Data Load List SKPD :');
            console.log($scope.listSkpd);
        } else {
            console.log('Response Result Load Detail SKPD');
            console.log(result);
        }
    });

    $scope.goToList = function (val) {
        $location.search('skpd', val.id);
        $location.path('/persetujuan/kas-blud/detail');
    };

    $scope.doCheck = function (valueDpt) {
        console.log("Setuju", valueDpt.idTmrbakasBlud)
    };

    $scope.tolakPersetujuan = function (valTolak) {

        if (!valTolak.$valid) {
            console.log('Form Not Valid');
            $scope.submitted = true;
            return;
        }
        $scope.submitted = false;

        /**
         * Form Persetujuan
         */

        console.log($scope.formAlasanTolak);


    };

    $scope.value = null;
    $scope.doOpenModal = function (valOpen) {
        console.log(valOpen.idTmrbakasBlud);
        $scope.value = valOpen.idTmrbakasBlud;
    }
}   