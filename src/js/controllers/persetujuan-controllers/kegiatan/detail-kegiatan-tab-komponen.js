angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('DetailKegiatanTabKomponenController', DetailKegiatanTabKomponenController);

function DetailKegiatanTabKomponenController($scope, $location, globalService) {
    $scope.accounting = accounting;

    $scope.idKomponen = null;

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

    const kegiatanId = $location.search().kegiatan;
    if (kegiatanId) {
        $scope.idKegiatan = kegiatanId;
        globalService.serviceGetData(`/blud-resource-server/api/kegiatan/${kegiatanId}`, null, function (result) {
            console.log('Result Data Kegiatan');
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result Kegiatan');
                console.log(result);
                $scope.formInfoKegiatan = result.data;
                console.log('Value Data Load Kegiatan :');
                console.log($scope.formInfoKegiatan);
                $scope.urusanGetId = $scope.formInfoKegiatan.urusan.id;
                $scope.urusan = $scope.formInfoKegiatan.urusan;
                $scope.programGetId = $scope.formInfoKegiatan.program.id;
                $scope.program = $scope.formInfoKegiatan.program;
            } else {
                console.log('Response Result Load Kegiatan');
                console.log(result);
            }
        });
    } else {
        $location.url($location.path());
        $location.path('/persetujuan/kegiatan/detail');
    }

    // DT Options
    $scope.dtInstanceTambahKomponen = {};
    $scope.dtInstanceBelanja = {};
    $scope.dtOptions = {
        paginationType: 'full_numbers',
        searching: true,
        responsive: false,
        language: {
            "sEmptyTable": "Tidak ada data yang ditemukan",
            "sInfo": "Menunjukan _START_ sampai _END_ dari _TOTAL_ data",
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

    $scope.currentTabIndex = 1;
    $scope.belanjaList = [];
    $scope.tambahKomponenList = [];
    $scope.idKomponenBelanjaPegawai = [];

    $scope.switchTab = function (tabIndex) {
        $scope.currentTabIndex = tabIndex;
        if (tabIndex == 1) {
            // load data for datatables tambah komponen belanja pegawai
            $scope.lookUpPegawai();

            // load data for datatables daftar komponen belanja pegawai
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/pegawai`, {
                idKegiatan: kegiatanId,
                tahunAngg: $scope.tahun
            }, function (response) {
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });


        } else if (tabIndex == 2) {
            // load data for datatables tambah komponen belanja barang dan jasa
            $scope.lookUpBarang();

            // load data for datatables daftar komponen belanja barang dan jasa
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/barang`, {
                idKegiatan: kegiatanId,
                tahunAngg: $scope.tahun
            }, function (response) {
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });

        } else if (tabIndex == 3) {
            // load data for datatables tambah komponen belanja modal
            $scope.lookUpModal();

            // load data for datatables daftar komponen belanja modal
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/modal`, {
                idKegiatan: kegiatanId,
                tahunAngg: $scope.tahun
            }, function (response) {
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });

        }
    };

    // get all anggaran
    $scope.getAnggaran = function (idKegiatan, tahunAnggaran, idSkpd) {
        globalService.serviceGetData(`/blud-resource-server/api/belanja-langsung/anggaran/all`, {
            idKegiatan: idKegiatan,
            tahunAnggaran: tahunAnggaran,
            idSkpd: idSkpd
        }, function (response) {
            $scope.anggaranPegawai = response.data.anggaranDpaBp;
            $scope.anggaranBarang = response.data.anggaranDpaBbj;
            $scope.anggaranModal = response.data.anggaranDpaBm;
            $scope.paguKegiatan = $scope.anggaranPegawai + $scope.anggaranBarang + $scope.anggaranModal;
        });
    };

    // get belanja pegawai for lookup
    $scope.lookUpPegawai = function () {
        globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/pegawai`, {
            tahunAnggaran: $scope.tahun,
            idSkpd: skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId
        }, function (response) {
            $scope.tambahKomponenList = response.data;
        });
    };

    // get belanja barang for lookup
    $scope.lookUpBarang = function () {
        globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/barang`, {
            tahunAnggaran: $scope.tahun,
            idSkpd: skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId
        }, function (response) {
            $scope.tambahKomponenList = response.data;
        });
    };

    // get belanja modal for lookup
    $scope.lookUpModal = function () {
        globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/modal`, {
            tahunAnggaran: $scope.tahun,
            idSkpd: skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId
        }, function (response) {
            $scope.tambahKomponenList = response.data;
        });
    };


    // initiate lookup data
    $scope.lookUpPegawai();
    $scope.getAnggaran(kegiatanId, $scope.tahun, skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId);

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