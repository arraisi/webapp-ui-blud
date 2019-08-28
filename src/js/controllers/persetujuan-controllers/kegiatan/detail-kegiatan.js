angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('DetailKegiatanPersetujuanController', DetailKegiatanPersetujuanController);

function DetailKegiatanPersetujuanController($scope, $location, globalService) {
    $scope.accounting = accounting;

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


    /** DT Options For Datatables */
    $scope.persons = [];
    $scope.dtInstanceUrusan = {};
    $scope.dtInstanceProgram = {};
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

    /** Load SKPD By ID SKPD */
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

    /** Load Kegiatan By Tahun Anggaran dan ID SKPD */
    globalService.serviceGetData(`/blud-resource-server/api/kegiatan/load/${$scope.tahun}/${skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId}`, null, function (result) {
        console.log('Result Data Kegiatan');
        console.log(result.data);
        if (result.status === 200) {
            console.log('Response Result Kegiatan');
            console.log(result);
            $scope.listKegiatan = result.data;
            console.log('Value Data Load Kegiatan :');
            console.log($scope.listKegiatan);
        } else {
            console.log('Response Result Load Kegiatan');
            console.log(result);
        }
    });


    $scope.doKembali = function () {
        $location.url($location.path());
        $location.path('/persetujuan/kegiatan/detail');
    };

    $scope.detailKegiatan = function (val) {
        console.log('Detail Kegiatan');
        console.log(val);
        $location.search('kegiatan', val.idKegiatan);
        $location.path('/kegiatan/detail');
    };

    $scope.setujuKegiatan = function (val) {
        console.log('Setuju Kegiatan');
        console.log(val);
    };

    $scope.tolakKegiatan = function (val) {
        console.log('Tolak Kegiatan');
        console.log(val);
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