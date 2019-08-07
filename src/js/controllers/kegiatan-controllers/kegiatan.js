angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('KegiatanController', KegiatanController);

// Function Untuk Kontroller Kegiatan List
function KegiatanController($scope, $location, toaster, globalService) {

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

    /** Load Kegiatan By Tahun Anggaran dan ID SKPD */
    globalService.serviceGetData(`/blud-resource-server/api/kegiatan/load/${$scope.tahun}/${local.pengguna.skpdId}`, null, function (result) {
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

    $scope.goToTambahKegiatan = function () {
        console.log('Go To Tambah Kegiatan');
        $location.path('/kegiatan/tambah');
    };

    $scope.editButton = function (data) {
        $location.search('idKegiatan', data.idKegiatan);
        $location.path('/kegiatan/tambah');
    }
}
