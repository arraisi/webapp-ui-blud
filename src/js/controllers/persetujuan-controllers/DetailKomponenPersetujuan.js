angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('DetailKomponenPersetujuanController', DetailKomponenPersetujuanController);

function DetailKomponenPersetujuanController($scope,$location,globalService) {
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));

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

    /** DT Options For Datatables */
    $scope.persons = [];
    $scope.dtInstanceUrusan = {};
    $scope.dtInstanceProgram = {};
    $scope.dtOptions = {
        paginationType: 'full_numbers',
        searching: false,
        responsive: false,
        dom: "Bft<'row'<'col-sm-12'ip><'col-sm-12'l>>",
        language: {
            "sEmptyTable": "Tidak Ada Data Pada Table",
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

    $scope.doKembali = function () {
        $location.url($location.path());
        $location.path('/ListPersetujuan');
    };

    $scope.tabGoTo = function (path) {
        console.log(path)
        // $location.url($location.path());
        // $location.path('/ListPersetujuan');
    };

    $scope.doGoTo = function (path) {
        console.log(path);
        switch (path) {
            case 'Kas':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('/persetujuan/DetailKasPersetujuan');
                break;
            case 'Komponen':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('persetujuan/DetailKomponenPersetujuan');
                break;
        }
     
    };
}