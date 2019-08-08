angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('TabRpaKomponenController', TabRpaKomponenController);

// Function Untuk Kontroller TabKomponenController
function TabRpaKomponenController($scope, $location, toaster, globalService) {

    // ======== Awal Init Porject
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));

    /** DT Options For Datatables */
    $scope.dtInstance = {};
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
        bulanSelesai: null,
        kodeLokasiKegiatan: null,
        namaSumberDana: null
    };

    /** --------- FOR RPA ARE ----------- */

    /** Form Edit RPA */
    $scope.formEditRpa = {
        kodeAkun: null,
        kodeKomponen: null,
        namaKomponen: null,
        nilai: null,
        sisa: null,
        jenis: null,
        rpaBulan1: null,
        rpaBulan2: null,
        rpaBulan3: null,
        rpaBulan4: null,
        rpaBulan5: null,
        rpaBulan6: null,
        rpaBulan7: null,
        rpaBulan8: null,
        rpaBulan9: null,
        rpaBulan10: null,
        rpaBulan11: null,
        rpaBulan12: null,
    };

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
    };

    // Only Number
    $scope.onlyNumberKey = function (event) {
        if (event.charCode > 31 && (event.charCode < 48 || event.charCode > 57)) {
            console.log('Not Number');
            toaster.pop({
                type: 'warning',
                title: 'Hanya Angka',
                body: 'Tidak Bisa Input Selain Angka',
                timeout: 3000
            });
            event.preventDefault();
        }
    };

    $scope.simpanRpa = function () {
        console.log('Simpan RPA :');
        console.log($scope.formEditRpa);
    }

}
