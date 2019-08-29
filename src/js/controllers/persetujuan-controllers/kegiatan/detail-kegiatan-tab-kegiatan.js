angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('DetailKegiatanTabKegiatanController', DetailKegiatanTabKegiatanController);

function DetailKegiatanTabKegiatanController($scope, $location, globalService) {
    $scope.accounting = accounting;

    $scope.urusanList = [];
    $scope.idKegiatan = null;
    $scope.noUrutKinerja = 1;

    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    const skpdIdUrlParam = $location.search().skpd;
    console.log("URL PARAM", $scope.skpdIdUrlParam);
    $scope.otoritasPengguna = local.pengguna.otor;

    const kegiatanId = $location.search().kegiatan;
    if (kegiatanId) {
        console.log("ini id Kegiatan ada ");
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

        globalService.serviceGetData(`/blud-resource-server/api/kinerja/list/${$scope.tahun}/${kegiatanId}/${skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId}`, null, function (result) {
            console.log('Result Data Kinerja');
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result Kinerja');
                console.log(result);
                $scope.listKinerja = result.data;
                console.log('Value Data Load Kinerja :');
                console.log($scope.listKinerja);
                console.log('NO URUT NYA');
                $scope.noUrutKinerja = Math.max.apply(Math, $scope.listKinerja.map(function (v) {
                    return v.noUrut;
                })) + 1;
            } else {
                console.log('Response Result Load Kinerja');
                console.log(result);
            }
        });
    } else {
        $location.url($location.path());
        skpdIdUrlParam ? $location.search('skpd', skpdIdUrlParam) : console.log(skpdIdUrlParam);
        $location.path('/persetujuan/kegiatan/detail');
    }


    /** DT Options For Datatables */
    $scope.persons = [];
    $scope.dtInstanceKinerja = {};
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
    $scope.dtOptionsKinerja = {
        paginationType: 'full_numbers',
        searching: true,
        responsive: false,
        order: [[1, "asc"]],
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
        namaSumberDana: null,
        tahunAnggaran: $scope.tahun
    };

    /** For Get Urusan */
    $scope.urusanGetId = null;
    $scope.urusan = {
        id: null,
        namaUrusan: null
    };

    /** For Get Program */
    $scope.programGetId = null;
    $scope.program = {
        id: null,
        namaProgram: null,
        kodeProgram: null
    };

    $scope.kembaliKeListKegiatan = function () {
        $location.url($location.path());
        skpdIdUrlParam ? $location.search('skpd', skpdIdUrlParam) : console.log(skpdIdUrlParam);
        $location.path('/persetujuan/kegiatan/detail');
    };

    $scope.tabGoTo = function (jenisTab) {
        console.log(jenisTab);
        switch (jenisTab) {
            case 'kegiatan':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('/kegiatan/detail');
                break;
            case 'komponen':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('/kegiatan/komponen/detail');
                break;
            case 'rpa':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('/kegiatan/komponen/rpa/detail');
                break;
        }
    };

}