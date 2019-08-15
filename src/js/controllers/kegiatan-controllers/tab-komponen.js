angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('TabKomponenController', TabKomponenController);

// Function Untuk Kontroller TabKomponenController
function TabKomponenController($scope, $location, toaster, globalService) {


    // ======== Awal Init Porject
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    $scope.idKomponen = null;

    const kegiatanId = $location.search().idKegiatan;
    if (kegiatanId) {
        $scope.idKegiatan = kegiatanId;
        globalService.serviceGetData(`/blud-resource-server/api/kegiatan/${kegiatanId}`, null, function (result) {
            console.log('Result Data Kegiatan');
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result Kegiatan');
                console.log(result);
                $scope.formTambahKegiatan = result.data;
                console.log('Value Data Load Kegiatan :');
                console.log($scope.formTambahKegiatan);
                $scope.urusanGetId = $scope.formTambahKegiatan.urusan.id;
                $scope.urusan = $scope.formTambahKegiatan.urusan;
                $scope.programGetId = $scope.formTambahKegiatan.program.id;
                $scope.program = $scope.formTambahKegiatan.program;
            } else {
                console.log('Response Result Load Kegiatan');
                console.log(result);
            }
        });
    } else {
        $location.url($location.path());
        $location.path('/kegiatan/tambah');
    }

    // DT Options
    $scope.dtInstanceTambahKomponen = {};
    $scope.dtInstanceBelanjaPegawai = {};
    $scope.dtOptions = {
        paginationType: 'full_numbers',
        searching: true,
        responsive: false,
        language: {
            "sEmptyTable": "Tidak ada data yang ditemukan",
            "sInfo": "Menunjukan _START_ sampai _END_ of _TOTAL_ data",
            "sInfoEmpty": "Menunjukan 0 sampai 0 dari 0 data",
            "sInfoFiltered": "(filtered from _MAX_ total entries)",
            "sInfoPostFix": "",
            "sInfoThousands": ",",
            "sLengthMenu": "Menunjukan _MENU_ data",
            "sLoadingRecords": "Memuat...",
            "sProcessing": "Memproses...",
            "sSearch": "Cari:",
            "sZeroRecords": "Tidak ada data yang cocok",
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

    $scope.belanjaPegawaiList = [];
    $scope.tambahKomponenList = [];
    $scope.idKomponenBelanjaPegawai = [];
    console.log(local.pengguna);
    globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/pegawai`, { tahunAnggaran: $scope.tahun, idSkpd: local.pengguna.skpdId }, function (response) {
        console.log(response);
        $scope.tambahKomponenList = response.data;

    });

    /** Open Tambah Komponen Modal */
    $scope.showTambahModal = function () {
        // $scope.urusanGetId = $scope.formTambahKegiatan.urusan.id;
        $scope.dtInstanceTambahKomponen.rerender();
    };

    $scope.getKomponenId = function () {
        $scope.idKomponenBelanjaPegawai = [];
        angular.forEach($scope.tambahKomponenList, function (komponen) {
            if (komponen.selected) {
                $scope.idKomponenBelanjaPegawai.push(komponen);
            }
        });

        console.log($scope.idKomponenBelanjaPegawai);

        globalService.servicePostData(`/blud-resource-server/api/komponen/belanja-pegawai/save`, { idKegiatan: kegiatanId, 
            idSkpd: local.pengguna.skpdId, 
            tahunAnggaran: $scope.tahun, 
            kodeKegiatan: $scope.formTambahKegiatan.kodeKegiatan
        }, $scope.idKomponenBelanjaPegawai, function (result) {
            console.log(result);
        });
    }



    /** Form Tambah Kegiatan */
    $scope.formTambahKegiatan = {
        urusan: {
            id: null,
            namaUrusan: null
        },
        program: {
            id: null,
            namaProgram: null
        },
        idProgram: null,
        kodeKegiatan: null,
        namaKegiatan: null,
        sasaranKegiatan: null,
        bulanMulai: null,
        bulanAkhir: null,
        kodeLokasiKegiatan: null,
        namaSumberDana: null
    };


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



    $scope.tabGoTo = function (jenisTab) {
        console.log(jenisTab);
        switch (jenisTab) {
            case 'kegiatan':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('/kegiatan/tambah');
                break;
            case 'komponen':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('/kegiatan/komponen');
                break;
            case 'rpa':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('/kegiatan/rpa');
                break;
        }
    }

}
