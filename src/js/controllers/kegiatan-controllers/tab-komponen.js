angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('TabKomponenController', TabKomponenController);

// Function Untuk Kontroller TabKomponenController
function TabKomponenController($scope, $location, toaster, globalService) {


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
        namaKegiatan: null,
        anggaranDpa: null
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
                $scope.anggaranDpa = $scope.formInfoKegiatan.anggaranDpa;
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

    $scope.currentTabIndex;
    $scope.belanjaList = [];
    $scope.tambahKomponenList = [];
    $scope.idKomponenBelanjaPegawai = [];

    globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/pegawai`, { tahunAnggaran: $scope.tahun, idSkpd: local.pengguna.skpdId }, function (response) {
        console.log(response);
        $scope.tambahKomponenList = response.data;
    });
    globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/pegawai`, { idKegiatan: kegiatanId, tahunAngg: $scope.tahun }, function (response) {
        console.log(response);
        $scope.belanjaList = response.data;
        $scope.dtInstanceBelanja.rerender();
    });

    globalService.serviceGetData(`/blud-resource-server/api/belanja-langsung/anggaran/pegawai`, {
        idKegiatan: kegiatanId,
        tahunAnggaran: $scope.tahun,
        idSkpd: local.pengguna.skpdId
    }, function (response) {
        $scope.anggaranPegawai = response.data;
    });

    globalService.serviceGetData(`/blud-resource-server/api/belanja-langsung/anggaran/barang`, {
        idKegiatan: kegiatanId,
        tahunAnggaran: $scope.tahun,
        idSkpd: local.pengguna.skpdId
    }, function (response) {
        $scope.anggaranBarang = response.data;        
    });

    globalService.serviceGetData(`/blud-resource-server/api/belanja-langsung/anggaran/modal`, {
        idKegiatan: kegiatanId,
        tahunAnggaran: $scope.tahun,
        idSkpd: local.pengguna.skpdId
    }, function (response) {
        $scope.anggaranModal = response.data;        
    });
    
    $scope.switchTab = function(tabIndex) {
        $scope.currentTabIndex = tabIndex;
        if (tabIndex == 1) {
            // load data for datatables tambah komponen belanja pegawai
            globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/pegawai`, { tahunAnggaran: $scope.tahun, idSkpd: local.pengguna.skpdId }, function (response) {
                $scope.tambahKomponenList = response.data;
            });

            // load data for datatables daftar komponen belanja pegawai
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/pegawai`, { idKegiatan: kegiatanId, tahunAngg: $scope.tahun }, function (response) {
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });

            // get anggaran of pegawai
            globalService.serviceGetData(`/blud-resource-server/api/belanja-langsung/anggaran/pegawai`, {
                idKegiatan: kegiatanId,
                tahunAnggaran: $scope.tahun,
                idSkpd: local.pengguna.skpdId
            }, function (response) {
                $scope.anggaran = response.data;
            });
        } else if (tabIndex == 2) {
            // load data for datatables tambah komponen belanja barang dan jasa
            globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/barang`, { tahunAnggaran: $scope.tahun, idSkpd: local.pengguna.skpdId }, function (response) {
                console.log(response);
                $scope.tambahKomponenList = response.data;
            });

            // load data for datatables daftar komponen belanja barang dan jasa
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/barang`, { idKegiatan: kegiatanId, tahunAngg: $scope.tahun }, function (response) {
                console.log(response);
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });      

            // get anggaran barang dan jasa
            globalService.serviceGetData(`/blud-resource-server/api/belanja-langsung/anggaran/barang`, {
                idKegiatan: kegiatanId,
                tahunAnggaran: $scope.tahun,
                idSkpd: local.pengguna.skpdId
            }, function (response) {
                $scope.anggaran = response.data;        
            });
        } else if (tabIndex == 3) {
            // load data for datatables tambah komponen belanja modal
            globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/modal`, { tahunAnggaran: $scope.tahun, idSkpd: local.pengguna.skpdId }, function (response) {
                console.log(response);
                $scope.tambahKomponenList = response.data;        
            });

            // load data for datatables daftar komponen belanja modal
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/modal`, { idKegiatan: kegiatanId, tahunAngg: $scope.tahun }, function (response) {
                console.log(response);
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });

            // get anggaran modal
            globalService.serviceGetData(`/blud-resource-server/api/belanja-langsung/anggaran/modal`, {
                idKegiatan: kegiatanId,
                tahunAnggaran: $scope.tahun,
                idSkpd: local.pengguna.skpdId
            }, function (response) {
                $scope.anggaran = response.data;        
            });
        }
    }

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
            globalService.servicePostData(`/blud-resource-server/api/komponen-belanja/save/pegawai`, { idKegiatan: kegiatanId, 
                idSkpd: local.pengguna.skpdId, 
                tahunAnggaran: $scope.tahun, 
                anggaran: $scope.anggaran
            }, $scope.idKomponenBelanjaPegawai, function (result) {
                $scope.belanjaList = result.data;
                $scope.dtInstanceBelanja.rerender();
            });
        } else if ($scope.currentTabIndex == 2) {
            // SAVE BELANJA BARANG DAN JASA
            globalService.servicePostData(`/blud-resource-server/api/komponen-belanja/save/barang`, { idKegiatan: kegiatanId, 
                idSkpd: local.pengguna.skpdId, 
                tahunAnggaran: $scope.tahun, 
                anggaran: $scope.anggaran
            }, $scope.idKomponenBelanjaPegawai, function (result) {
                $scope.belanjaList = result.data;
                $scope.dtInstanceBelanja.rerender();
            });
        } else if ($scope.currentTabIndex == 3) {
            // SAVE BELANJA MODAL
            globalService.servicePostData(`/blud-resource-server/api/komponen-belanja/save/modal`, { idKegiatan: kegiatanId, 
                idSkpd: local.pengguna.skpdId, 
                tahunAnggaran: $scope.tahun, 
                anggaran: $scope.anggaran
            }, $scope.idKomponenBelanjaPegawai, function (result) {
                $scope.belanjaList = result.data;
                $scope.dtInstanceBelanja.rerender();
            });
        }
        
    }

    $scope.formSuntingKomponen = {
        id: null,
        namaAkun: null,
        kodeAkun: null,
        kodeKomponen: null,
        namaKomponen: null,
        spek: null,
        merk: null,
        satuan: null,
        harga: null,
        volume: 1,
        koefisien: null,
        volume1: 1,
        satuan1: null,
        volume2: 1,
        satuan2: null,
        volume3: 1,
        satuan3: null,
        volume4: 1,
        satuan4: null,
        keterangan: null,
        pajak: null,
        nilaiPajak: null,
        totalHarga: null
    }

    $scope.getById = function(val) {
        globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/get-by-id/${val.id}`, null, function (result) {
            const data = result.data;
            $scope.formSuntingKomponen.id = data.id;
            $scope.formSuntingKomponen.namaAkun = data.namaAkun;
            $scope.formSuntingKomponen.kodeAkun = data.kodeAkun;
            $scope.formSuntingKomponen.kodeKomponen = data.kodeKomponen;
            $scope.formSuntingKomponen.namaKomponen = data.namaKomponen;
            $scope.formSuntingKomponen.spek = data.spek;
            $scope.formSuntingKomponen.merk = data.merk;
            $scope.formSuntingKomponen.harga = data.komponenHarga;
            $scope.formSuntingKomponen.satuan = data.satuan;
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

        globalService.servicePostData(`/blud-resource-server/api/komponen-belanja/edit-volume`, null, $scope.formSuntingKomponen, function (result) {
            $scope.dtInstanceBelanja.rerender();
        });
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
        $scope.formSuntingKomponen.volume = $scope.formSuntingKomponen.volume1 * $scope.formSuntingKomponen.volume2 * $scope.formSuntingKomponen.volume3 * $scope.formSuntingKomponen.volume4;
        if ($scope.formSuntingKomponen.nilaiPajak) {
            $scope.formSuntingKomponen.totalHarga =  $scope.formSuntingKomponen.volume * $scope.formSuntingKomponen.harga * (1 + $scope.formSuntingKomponen.nilaiPajak/100) ;
            
        } else {
            $scope.formSuntingKomponen.totalHarga =  $scope.formSuntingKomponen.volume * $scope.formSuntingKomponen.harga;
        }
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
