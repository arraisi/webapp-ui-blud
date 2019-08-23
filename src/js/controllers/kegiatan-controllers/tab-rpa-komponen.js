angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('TabRpaKomponenController', TabRpaKomponenController);

// Function Untuk Kontroller TabKomponenController
function TabRpaKomponenController($scope, $location, toaster, globalService) {

    $scope.accounting = accounting;

    // ======== Awal Init Porject
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));

    /** DT Options For Datatables */
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

    $scope.belanjaList = [];

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

    globalService.serviceGetData(`/blud-resource-server/api/belanja-langsung/anggaran/all`, {
        idKegiatan: kegiatanId,
        tahunAnggaran: $scope.tahun,
        idSkpd: local.pengguna.skpdId
    }, function (response) {
        $scope.anggaranPegawai = response.data.anggaranDpaBp;
        $scope.anggaranBarang = response.data.anggaranDpaBbj;
        $scope.anggaranModal = response.data.anggaranDpaBm;
        $scope.paguKegiatan = $scope.anggaranPegawai + $scope.anggaranBarang + $scope.anggaranModal;
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
        anggaranDpa: null,
        anggaranTapd: null,
        entryAnggaranRinci: null,
        entryAnggaranSpesifikasi: null,
        id: null,
        idAnggaranNoUrut: null,
        idBas: null,
        idBasKomponen: null,
        idKegiatan: null,
        idPenggunaRekam: null,
        idPenggunaUbah: null,
        idSkpd: null,
        kodeAkun: null,
        kodeKegiatan: null,
        kodeKomponen: null,
        koefisien: null,
        komponenHarga: null,
        merk: null,
        namaKomponen: null,
        pajak: null,
        rmks: null,
        rmksSubrincian: null,
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
        satuan1: null,
        satuan2: null,
        satuan3: null,
        satuan4: null,
        spek: null,
        swakelola: null,
        tahunAnggaran: null,
        tglPenggunaRekam: null,
        tglPenggunaUbah: null,
        volume: null,
        volume1: null,
        volume2: null,
        volume3: null,
        volume4: null
    };

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
        globalService.servicePostData(`/blud-resource-server/api/komponen-belanja/rpa/update`, null, $scope.formEditRpa, function (result) {
            console.log('Result Data Save RPA');
            console.log(result.data);
            if (result.status === 201) {
                console.log('Response Save RPA');
                console.log(result);
                angular.element('#modalEditRpa').trigger('click');
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil',
                    body: 'Berhasil Simpan Data RPA',
                    timeout: 3000
                });
                rerenderRpaTable();
            } else {
                console.log('Response Error Save RPA');
                console.log(result);
                toaster.pop({
                    type: 'warning',
                    title: 'Gagal',
                    body: 'Gagal Simpan Data RPA',
                    timeout: 3000
                });
            }
        });
    };

    $scope.getById = function (val) {
        console.log("val edit RPA");
        console.log(val);
        globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/${val.id}`, null, function (result) {
            console.log(result.data);
            const data = result.data;
            $scope.formEditRpa = data;
            $scope.sisaAnggaran = $scope.formEditRpa.anggaranDpa - totalRpaBulanAdded();

        });
    };

    $scope.switchTab = function (tabIndex) {
        $scope.currentTabIndex = tabIndex;
        if (tabIndex == 1) {
            // load data for datatables tambah komponen belanja pegawai
            globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/pegawai`, {
                tahunAnggaran: $scope.tahun,
                idSkpd: local.pengguna.skpdId
            }, function (response) {
                console.log(response);
                $scope.tambahKomponenList = response.data;
            });

            // load data for datatables daftar komponen belanja pegawai
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/pegawai`, {
                idKegiatan: kegiatanId,
                tahunAngg: $scope.tahun
            }, function (response) {
                console.log(response);
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });
        } else if (tabIndex == 2) {
            // load data for datatables tambah komponen belanja barang dan jasa
            globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/barang`, {
                tahunAnggaran: $scope.tahun,
                idSkpd: local.pengguna.skpdId
            }, function (response) {
                console.log(response);
                $scope.tambahKomponenList = response.data;
            });

            // load data for datatables daftar komponen belanja barang dan jasa
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/barang`, {
                idKegiatan: kegiatanId,
                tahunAngg: $scope.tahun
            }, function (response) {
                console.log(response);
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });
        } else if (tabIndex == 3) {
            // load data for datatables tambah komponen belanja modal
            globalService.serviceGetData(`/blud-resource-server/api/komponen/load/belanja/modal`, {
                tahunAnggaran: $scope.tahun,
                idSkpd: local.pengguna.skpdId
            }, function (response) {
                console.log(response);
                $scope.tambahKomponenList = response.data;
            });

            // load data for datatables daftar komponen belanja modal
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/modal`, {
                idKegiatan: kegiatanId,
                tahunAngg: $scope.tahun
            }, function (response) {
                console.log(response);
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });
        }
    };

    $scope.kalkulasiSisaAnggaran = function () {
        console.log('Total RPA BULAN');
        console.log(totalRpaBulanAdded());
        if (totalRpaBulanAdded()) {
            const sisa = $scope.formEditRpa.anggaranDpa - totalRpaBulanAdded();
            if (sisa < 0) {
                toaster.pop({
                    type: 'error',
                    title: 'Anggaran',
                    body: 'Sisa Anggaran Tidak Mencukupi',
                    timeout: 5000
                });
                $scope.sisaAnggaranMinus = true;
            } else {
                $scope.sisaAnggaran = sisa;
                $scope.sisaAnggaranMinus = false;
            }
        }
    };

    const totalRpaBulanAdded = function () {
        console.log($scope.formEditRpa);
        const b1 = $scope.formEditRpa.rpaBulan1 ? $scope.formEditRpa.rpaBulan1 : 0;
        const b2 = $scope.formEditRpa.rpaBulan2 ? $scope.formEditRpa.rpaBulan2 : 0;
        const b3 = $scope.formEditRpa.rpaBulan3 ? $scope.formEditRpa.rpaBulan3 : 0;
        const b4 = $scope.formEditRpa.rpaBulan4 ? $scope.formEditRpa.rpaBulan4 : 0;
        const b5 = $scope.formEditRpa.rpaBulan5 ? $scope.formEditRpa.rpaBulan5 : 0;
        const b6 = $scope.formEditRpa.rpaBulan6 ? $scope.formEditRpa.rpaBulan6 : 0;
        const b7 = $scope.formEditRpa.rpaBulan7 ? $scope.formEditRpa.rpaBulan7 : 0;
        const b8 = $scope.formEditRpa.rpaBulan8 ? $scope.formEditRpa.rpaBulan8 : 0;
        const b9 = $scope.formEditRpa.rpaBulan9 ? $scope.formEditRpa.rpaBulan9 : 0;
        const b10 = $scope.formEditRpa.rpaBulan10 ? $scope.formEditRpa.rpaBulan10 : 0;
        const b11 = $scope.formEditRpa.rpaBulan11 ? $scope.formEditRpa.rpaBulan11 : 0;
        const b12 = $scope.formEditRpa.rpaBulan12 ? $scope.formEditRpa.rpaBulan12 : 0;
        const total = (b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11 + b12);
        return total;
    };

    const rerenderRpaTable = function () {
        const tabIndex = $scope.currentTabIndex;
        if (tabIndex == 1) {
            // load data for datatables daftar komponen belanja pegawai
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/pegawai`, {
                idKegiatan: kegiatanId,
                tahunAngg: $scope.tahun
            }, function (response) {
                console.log(response);
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });
        } else if (tabIndex == 2) {
            // load data for datatables daftar komponen belanja barang dan jasa
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/barang`, {
                idKegiatan: kegiatanId,
                tahunAngg: $scope.tahun
            }, function (response) {
                console.log(response);
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });
        } else if (tabIndex == 3) {
            // load data for datatables daftar komponen belanja modal
            globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/load/modal`, {
                idKegiatan: kegiatanId,
                tahunAngg: $scope.tahun
            }, function (response) {
                console.log(response);
                $scope.belanjaList = response.data;
                $scope.dtInstanceBelanja.rerender();
            });
        }
    }

    $scope.kirim = function () {
        globalService.serviceGetData(`/blud-resource-server/api/komponen-belanja/update-anggaran-kegiatan/${kegiatanId}`, { anggaran: $scope.paguKegiatan }, function (response) {
            if (response.status == 200) {
                $location.path('/kegiatan');
            }
        });
    }

}
