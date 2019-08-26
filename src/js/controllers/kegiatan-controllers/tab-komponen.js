angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('TabKomponenController', TabKomponenController);

// Function Untuk Kontroller TabKomponenController
function TabKomponenController($scope, $location, toaster, globalService) {

    $scope.accounting = accounting;

    // ======== Awal Init Porject
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    $scope.idKomponen = null;

    /** Form Tambah Kegiatan */
    $scope.formInfoKegiatan = {
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
        namaKegiatan: null
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
        $location.path('/kegiatan/tambah');
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

    // get belanja pegawai for lookup
    $scope.lookUpPegawai = function () {
        globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/pegawai`, { tahunAnggaran: $scope.tahun, idSkpd: local.pengguna.skpdId }, function (response) {
            $scope.tambahKomponenList = response.data;
        });
    }

    // get belanja barang for lookup
    $scope.lookUpBarang = function () {
        globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/barang`, { tahunAnggaran: $scope.tahun, idSkpd: local.pengguna.skpdId }, function (response) {
            $scope.tambahKomponenList = response.data;
        });
    }

    // get belanja modal for lookup
    $scope.lookUpModal = function () {
        globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/modal`, { tahunAnggaran: $scope.tahun, idSkpd: local.pengguna.skpdId }, function (response) {
            $scope.tambahKomponenList = response.data;
        });
    }

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
    }

    // initiate lookup data
    $scope.lookUpPegawai();

    // initiate datatables data
    globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/pegawai`, { idKegiatan: kegiatanId, tahunAngg: $scope.tahun }, function (response) {
        $scope.belanjaList = response.data;
        $scope.dtInstanceBelanja.rerender();
    });

    // get data anggaran
    $scope.getAnggaran(kegiatanId, $scope.tahun, local.pengguna.skpdId);

    $scope.switchTab = function (tabIndex) {
        $scope.currentTabIndex = tabIndex;
        if (tabIndex == 1) {
            // load data for datatables tambah komponen belanja pegawai
            $scope.lookUpPegawai();

            // load data for datatables daftar komponen belanja pegawai
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/pegawai`, { idKegiatan: kegiatanId, tahunAngg: $scope.tahun }, function (response) {
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });


        } else if (tabIndex == 2) {
            // load data for datatables tambah komponen belanja barang dan jasa
            $scope.lookUpBarang();

            // load data for datatables daftar komponen belanja barang dan jasa
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/barang`, { idKegiatan: kegiatanId, tahunAngg: $scope.tahun }, function (response) {
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });

        } else if (tabIndex == 3) {
            // load data for datatables tambah komponen belanja modal
            $scope.lookUpModal();

            // load data for datatables daftar komponen belanja modal
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/modal`, { idKegiatan: kegiatanId, tahunAngg: $scope.tahun }, function (response) {
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });

        }
    };

    /** Open Tambah Komponen Modal */
    $scope.showTambahModal = function () {
        // $scope.urusanGetId = $scope.formInfoKegiatan.urusan.id;
        $scope.dtInstanceTambahKomponen.rerender();
    };


    $scope.save = function () {
        $scope.idKomponenBelanjaPegawai = [];
        angular.forEach($scope.tambahKomponenList, function (komponen) {
            if (komponen.selected) {
                $scope.idKomponenBelanjaPegawai.push(komponen);
            }
        });

        console.log($scope.idKomponenBelanjaPegawai);
        if ($scope.currentTabIndex == 1) {
            // SAVE BELANJA PEGAWAI
            globalService.servicePostData(`/blud-resource-server/api/komponen-belanja/save/pegawai`, {
                idKegiatan: kegiatanId,
                idSkpd: local.pengguna.skpdId,
                tahunAnggaran: $scope.tahun
            }, $scope.idKomponenBelanjaPegawai, function (result) {
                $scope.belanjaList = result.data;
                $scope.dtInstanceBelanja.rerender();
                $scope.getAnggaran(kegiatanId, $scope.tahun, local.pengguna.skpdId);
                $scope.lookUpPegawai();
            });
        } else if ($scope.currentTabIndex == 2) {
            // SAVE BELANJA BARANG DAN JASA
            globalService.servicePostData(`/blud-resource-server/api/komponen-belanja/save/barang`, {
                idKegiatan: kegiatanId,
                idSkpd: local.pengguna.skpdId,
                tahunAnggaran: $scope.tahun
            }, $scope.idKomponenBelanjaPegawai, function (result) {
                $scope.belanjaList = result.data;
                $scope.dtInstanceBelanja.rerender();
                $scope.getAnggaran(kegiatanId, $scope.tahun, local.pengguna.skpdId);
                $scope.lookUpBarang();
            });
        } else if ($scope.currentTabIndex == 3) {
            // SAVE BELANJA MODAL
            globalService.servicePostData(`/blud-resource-server/api/komponen-belanja/save/modal`, {
                idKegiatan: kegiatanId,
                idSkpd: local.pengguna.skpdId,
                tahunAnggaran: $scope.tahun
            }, $scope.idKomponenBelanjaPegawai, function (result) {
                $scope.belanjaList = result.data;
                $scope.dtInstanceBelanja.rerender();
                $scope.getAnggaran(kegiatanId, $scope.tahun, local.pengguna.skpdId);
                $scope.lookUpModal();
            });
        }

    };

    $scope.formSuntingKomponen = {
        id: null,
        namaAkun: null,
        kodeAkun: null,
        idKomponen: null,
        kodeKomponen: null,
        namaKomponen: null,
        spek: null,
        merk: null,
        satuan: null,
        harga: null,
        volume: null,
        koefisien: null,
        volume1: null,
        satuan1: null,
        volume2: null,
        satuan2: null,
        volume3: null,
        satuan3: null,
        volume4: null,
        satuan4: null,
        keterangan: null,
        pajak: null,
        nonPajak: null,
        totalHarga: null
    };

    $scope.getById = function (val) {
        globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/get-by-id/${val.id}`, null, function (result) {
            const data = result.data;
            $scope.formSuntingKomponen.id = data.id;
            $scope.formSuntingKomponen.namaAkun = data.namaAkun;
            $scope.formSuntingKomponen.kodeAkun = data.kodeAkun;
            $scope.formSuntingKomponen.idKomponen = data.idKomponen;
            $scope.formSuntingKomponen.kodeKomponen = data.kodeKomponen;
            $scope.formSuntingKomponen.namaKomponen = data.namaKomponen;
            $scope.formSuntingKomponen.spek = data.spek;
            $scope.formSuntingKomponen.merk = data.merk;
            $scope.formSuntingKomponen.harga = data.komponenHarga;
            $scope.formSuntingKomponen.satuan = data.satuan;
            $scope.formSuntingKomponen.totalHarga = data.totalHarga;
            $scope.formSuntingKomponen.keterangan = data.keterangan;
            $scope.formSuntingKomponen.volume = data.volume;
            $scope.formSuntingKomponen.koefisien = data.koefisien;
            $scope.formSuntingKomponen.nonPajak = data.nonPajak;
            $scope.formSuntingKomponen.pajak = data.pajak;
            $scope.formSuntingKomponen.volume1 = data.volume1;
            $scope.formSuntingKomponen.satuan1 = data.satuan1;
            $scope.formSuntingKomponen.volume2 = data.volume2;
            $scope.formSuntingKomponen.satuan2 = data.satuan2;
            $scope.formSuntingKomponen.volume3 = data.volume3;
            $scope.formSuntingKomponen.satuan3 = data.satuan3;
            $scope.formSuntingKomponen.volume4 = data.volume4;
            $scope.formSuntingKomponen.satuan4 = data.satuan4;


        });
    }

    $scope.editVolume = function () {

        if ($scope.currentTabIndex == 1) {
            globalService.servicePostData(`/blud-resource-server/api/komponen-belanja/edit-volume/pegawai`, null, $scope.formSuntingKomponen, function (result) {
                $scope.dtInstanceBelanja.rerender();
                $scope.getAnggaran(kegiatanId, $scope.tahun, local.pengguna.skpdId);
            });
        } else if ($scope.currentTabIndex == 2) {
            globalService.servicePostData(`/blud-resource-server/api/komponen-belanja/edit-volume/barang`, null, $scope.formSuntingKomponen, function (result) {
                $scope.dtInstanceBelanja.rerender();
                $scope.getAnggaran(kegiatanId, $scope.tahun, local.pengguna.skpdId);
            })
        } else if ($scope.currentTabIndex == 3) {
            globalService.servicePostData(`/blud-resource-server/api/komponen-belanja/edit-volume/modal`, null, $scope.formSuntingKomponen, function (result) {
                $scope.dtInstanceBelanja.rerender();
                $scope.getAnggaran(kegiatanId, $scope.tahun, local.pengguna.skpdId);
            });
        }
    }

    $scope.setKoefisien = function () {
        $scope.formSuntingKomponen.koefisien = '';
        let vol1 = '';
        let sat1 = '';
        let vol2 = '';
        let sat2 = '';
        let vol3 = '';
        let sat3 = '';
        let vol4 = '';
        let sat4 = '';
        let volValue1 = 0;
        let volValue2 = 0;
        let volValue3 = 0;
        let volValue4 = 0;
        if ($scope.formSuntingKomponen.volume1) {
            vol1 = $scope.formSuntingKomponen.koefisien + $scope.formSuntingKomponen.volume1;
        }

        if ($scope.formSuntingKomponen.satuan1) {
            sat1 = $scope.formSuntingKomponen.koefisien + ' ' + $scope.formSuntingKomponen.satuan1;
        }

        if ($scope.formSuntingKomponen.volume2) {
            vol2 = ' x ' + $scope.formSuntingKomponen.koefisien + $scope.formSuntingKomponen.volume2;
        }

        if ($scope.formSuntingKomponen.satuan2) {
            sat2 = $scope.formSuntingKomponen.koefisien + ' ' + $scope.formSuntingKomponen.satuan2;
        }

        if ($scope.formSuntingKomponen.volume3) {
            vol3 = ' x ' + $scope.formSuntingKomponen.koefisien + $scope.formSuntingKomponen.volume3;
        }

        if ($scope.formSuntingKomponen.satuan3) {
            sat3 = $scope.formSuntingKomponen.koefisien + ' ' + $scope.formSuntingKomponen.satuan3;
        }

        if ($scope.formSuntingKomponen.volume4) {
            vol4 = ' x ' + $scope.formSuntingKomponen.koefisien + $scope.formSuntingKomponen.volume4;
        }

        if ($scope.formSuntingKomponen.satuan4) {
            sat4 = $scope.formSuntingKomponen.koefisien + ' ' + $scope.formSuntingKomponen.satuan4;
        }

        $scope.formSuntingKomponen.koefisien = vol1 + sat1 + vol2 + sat2 + vol3 + sat3 + vol4 + sat4;

        volValue1 = ($scope.formSuntingKomponen.volume1) ? $scope.formSuntingKomponen.volume1 : 1;
        volValue2 = ($scope.formSuntingKomponen.volume2) ? $scope.formSuntingKomponen.volume2 : 1;
        volValue3 = ($scope.formSuntingKomponen.volume3) ? $scope.formSuntingKomponen.volume3 : 1;
        volValue4 = ($scope.formSuntingKomponen.volume4) ? $scope.formSuntingKomponen.volume4 : 1;

        $scope.formSuntingKomponen.volume = volValue1 * volValue2 * volValue3 * volValue4;
        if ($scope.formSuntingKomponen.pajak) {
            $scope.formSuntingKomponen.totalHarga = $scope.formSuntingKomponen.volume * $scope.formSuntingKomponen.harga * (1 + $scope.formSuntingKomponen.pajak / 100);

        } else {
            $scope.formSuntingKomponen.totalHarga = $scope.formSuntingKomponen.volume * $scope.formSuntingKomponen.harga;
        }
    }

    $scope.deleteKomponen = function () {

        if ($scope.currentTabIndex == 1) {

            globalService.serviceDeleteData(`/blud-resource-server/api/komponen-belanja/delete/pegawai/${$scope.formSuntingKomponen.idKomponen}`, {
                idKegiatan: kegiatanId,
                tahunAnggaran: $scope.tahun,
                idSkpd: local.pengguna.skpdId
            }, function (response) {
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
                $scope.getAnggaran(kegiatanId, $scope.tahun, local.pengguna.skpdId);
                $scope.lookUpPegawai();
            });
        } else if ($scope.currentTabIndex == 2) {
            globalService.serviceDeleteData(`/blud-resource-server/api/komponen-belanja/delete/barang/${$scope.formSuntingKomponen.idKomponen}`, {
                idKegiatan: kegiatanId,
                tahunAnggaran: $scope.tahun,
                idSkpd: local.pengguna.skpdId
            }, function (response) {
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
                $scope.getAnggaran(kegiatanId, $scope.tahun, local.pengguna.skpdId);
                $scope.lookUpBarang();
            });
        } else if ($scope.currentTabIndex == 3) {
            globalService.serviceDeleteData(`/blud-resource-server/api/komponen-belanja/delete/modal/${$scope.formSuntingKomponen.idKomponen}`, {
                idKegiatan: kegiatanId,
                tahunAnggaran: $scope.tahun,
                idSkpd: local.pengguna.skpdId
            }, function (response) {
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
                $scope.getAnggaran(kegiatanId, $scope.tahun, local.pengguna.skpdId);
                $scope.lookUpModal();
            });
        }
    }

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
