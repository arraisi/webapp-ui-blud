angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('TabKegiatanController', TabKegiatanController);

// Function Untuk Kontroller TabKegiatanController
function TabKegiatanController($scope, $location, toaster, globalService) {

    // ======== Awal Init Porject
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    $scope.urusanList = [];
    $scope.idKegiatan = null;
    $scope.noUrutKinerja = 1;
    $scope.submitted = false;

    const kegiatanId = $location.search().idKegiatan;
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

        globalService.serviceGetData(`/blud-resource-server/api/kinerja/list/${$scope.tahun}/${kegiatanId}/${local.pengguna.skpdId}`, null, function (result) {
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
        $location.path('/kegiatan/tambah');
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

    /** Load List Lokasi Kegiatan */
    globalService.serviceGetData(`/blud-resource-server/api/kegiatan/lokasi/list`, null, function (result) {
        console.log('Result Data Lokasi Kegiatan');
        console.log(result.data);
        if (result.status === 200) {
            console.log('Response Result Lokasi Kegiatan');
            console.log(result);
            $scope.lokasiKegiatanList = result.data;
            console.log('Value Data Lokasi Kegiatan :');
            console.log($scope.lokasiKegiatanList);
        } else {
            console.log('Response Result Lokasi Kegiatan Error');
            console.log(result);
        }
    });

    /** Get List Urusan */
    globalService.serviceGetData(`/blud-resource-server/api/urusan/list`, {tahunAnggaran: $scope.tahun}, function (result) {
        console.log('Result Data Urusan');
        console.log(result.data);
        if (result.status === 200) {
            console.log('Response Result Urusan');
            console.log(result);
            $scope.urusanList = result.data;
            console.log('Value Data Urusan :');
        } else {
            console.log('Response Result Urusan Error');
            console.log(result);
        }
    });

    /** Get List Program */
    $scope.getProgram = function (idUrusan) {
        globalService.serviceGetData(`/blud-resource-server/api/program/list/by-id-urusan/${idUrusan}`, {
            tahunAnggaran: $scope.tahun,
            idSkpd: local.pengguna.skpdId
        }, function (result) {
            console.log('Result Data Program');
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result Program');
                console.log(result);
                $scope.programList = result.data;
                console.log('Value Data Program :');
                console.log($scope.programList);
            } else {
                console.log('Response Result Program Error');
                console.log(result);
            }
        });
    };

    /** Get No Kegiatan */
    $scope.getNoKegiatan = function (idProgram) {
        globalService.serviceGetData(`/blud-resource-server/api/kegiatan/load/no-kegiatan/${$scope.tahun}/${idProgram}/${local.pengguna.skpdId}`, null, function (result) {
            console.log('Result No Kegiatan');
            console.log(result);
            if (result.status === 200) {
                console.log('Response Result No Kegiatan');
                console.log(result);
                $scope.formTambahKegiatan.kodeKegiatan = result.data.noKegiatan;
            } else {
                console.log('Response Result No Kegiatan Error');
                console.log(result);
                $scope.formTambahKegiatan.kodeKegiatan = `${$scope.program.kodeProgram}.01`;
            }
        });
    };

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
                // toaster.pop({
                //     type: 'success',
                //     title: 'On Progress',
                //     body: '',
                //     timeout: 3000
                // });
                break;
            case 'rpa':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('/kegiatan/rpa');
                // toaster.pop({
                //     type: 'success',
                //     title: 'On Progress',
                //     body: '',
                //     timeout: 3000
                // });
                break;
        }
    };

    $scope.simpanTambahKegiatan = function (form) {
        console.log(form);
    };

    /** Change Option Urusan / Kegiatan */
    $scope.changeOption = function (jenis, val) {
        console.log('Option Change : ');
        console.log(jenis);
        console.log(val);
        if (jenis === 'urusan') {
            $scope.urusan = val;
            console.log($scope.urusan);
        }
        if (jenis === 'program') {
            $scope.program = val;
            console.log($scope.program);
        }
    };

    /** Open Urusan Modal */
    $scope.openUrusanModal = function () {
        $scope.urusanGetId = $scope.formTambahKegiatan.urusan.id;
        $scope.dtInstanceUrusan.rerender();
    };

    /** Open Program Modal */
    $scope.openProgramModal = function () {
        $scope.programGetId = $scope.formTambahKegiatan.program.id;
        console.log('Data Program List');
        console.log($scope.programList);
        if ($scope.formTambahKegiatan.urusan.id !== null) {
            $scope.getProgram($scope.formTambahKegiatan.urusan.id);
            $scope.dtInstanceProgram.rerender();
        }
    };

    /** Urusan Get Function */
    $scope.urusanGetFunction = function () {
        console.log('Get Urusan :');
        if ($scope.urusan.id !== $scope.formTambahKegiatan.urusan.id) {
            $scope.program = null;
            $scope.formTambahKegiatan.program.id = null;
            $scope.formTambahKegiatan.program.namaProgram = null;
        }
        console.log($scope.urusan);
        $scope.formTambahKegiatan.urusan = $scope.urusan;
        console.log($scope.formTambahKegiatan);
        console.log($scope.formTambahKegiatan.urusan);
        $scope.getProgram($scope.formTambahKegiatan.urusan.id);
        $scope.dtInstanceProgram.rerender();
    };

    /** Program Get Function */
    $scope.programGetFunction = function () {
        console.log('Get Program :');
        console.log($scope.program);
        $scope.formTambahKegiatan.program = $scope.program;
        $scope.formTambahKegiatan.idProgram = $scope.program.id;
        console.log($scope.formTambahKegiatan);
        console.log($scope.formTambahKegiatan.program);
        $scope.getNoKegiatan($scope.program.id);
    };


    /** Save Function */
    $scope.saveKegiatan = function () {
        console.log('JSON Save Kegiatan: ');
        console.log($scope.formTambahKegiatan);
        const form = $scope.formTambahKegiatan;
        if (!form.urusan || !form.program || !form.namaKegiatan || !form.sasaranKegiatan || !form.bulanMulai || !form.bulanSelesai || !form.lokasiKegiatanList || !form.namaSumberDana) {
            $scope.submitted = true;
            return;
        }
        globalService.servicePostData(`/blud-resource-server/api/kegiatan/save`, null, $scope.formTambahKegiatan, function (result) {
            console.log('Result Data Save Kegiatan');
            console.log(result.data);
            if (result.status === 201) {
                console.log('Response Save Kegiatan');
                console.log(result);
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil',
                    body: 'Berhasil Simpan Data Kegiatan',
                    timeout: 3000
                });
                $location.search('idKegiatan', result.data.id);
                $location.path('/kegiatan/tambah');
            } else {
                console.log('Response Error Save Kegiatan');
                console.log(result);
                toaster.pop({
                    type: 'warning',
                    title: 'Gagal',
                    body: 'Gagal Simpan Data Kegiatan',
                    timeout: 3000
                });
            }
        });
    };

    $scope.simpanTabKegiatan = function () {
        $location.path('/kegiatan/komponen');
    };

    $scope.kembaliKeListKegiatan = function () {
        $location.url($location.path());
        $location.path('/kegiatan');
    };


    /** For Kinerja*/

    $scope.submittedKinerja = false;
    $scope.submittedEditKinerja = false;

    /** Load List Kode Indikator / Ref */
    globalService.serviceGetData(`/blud-resource-server/api/kodefungsi/list`, null, function (result) {
        console.log('Result Data List Kode Indikator');
        console.log(result.data);
        if (result.status === 200) {
            console.log('Response Result List Kode Indikator');
            console.log(result);
            $scope.listKodeIndikator = result.data;
            console.log('Value Data Load List Kode Indikator :');
            console.log($scope.listKodeIndikator);
        } else {
            console.log('Response Result List Kode Indikator Error');
            console.log(result);
        }
    });

    $scope.kodeIndikatorRef = {
        kodeFungsi: null,
        keteranganKode: null
    };

    $scope.formTambahKinerja = {
        kodeIndikator: null,
        kodeRef: {
            kodeFungsi: null,
            keteranganKode: null
        },
        noUrut: null,
        keteranganTolakUkur: null,
        keteranganTargetKinerja: null
    };

    $scope.formEditKinerja = {
        kodeIndikator: null,
        kodeRef: {
            kodeFungsi: null,
            keteranganKode: null
        },
        noUrut: null,
        keteranganTolakUkur: null,
        keteranganTargetKinerja: null
    };

    $scope.editKinerja = function (data) {
        console.log('Edit Kinerja');
        console.log(data);
        $scope.formEditKinerja = data;
    };

    $scope.simpanKinerja = function () {
        const v = $scope.formTambahKinerja;
        if (v.kodeIndikator == null || (v.keteranganTolakUkur == null || v.keteranganTolakUkur == '') || (v.keteranganTargetKinerja == null || v.keteranganTargetKinerja == '')) {
            console.log('Form Not Valid');
            $scope.submittedKinerja = true;
            return;
        }
        $scope.submittedKinerja = false;
        console.log('Save Kinerja :');
        console.log($scope.formTambahKinerja);
        globalService.servicePostData(`/blud-resource-server/api/kinerja/save`, {
            tahunAnggaran: $scope.tahun,
            idKegiatan: kegiatanId,
            idSkpd: local.pengguna.skpdId
        }, $scope.formTambahKinerja, function (result) {
            console.log('Result Data Save Kinerja');
            console.log(result.data);
            if (result.status === 201) {
                console.log('Response Save Kinerja Succes');
                console.log(result);
                $scope.listKinerja = result.data;
                $scope.dtInstanceKinerja.rerender();
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil',
                    body: 'Berhasil menyimpan data',
                    timeout: 5000
                });
                $scope.noUrutKinerja = Math.max.apply(Math, $scope.listKinerja.map(function (v) {
                    return v.noUrut;
                })) + 1;
            } else {
                console.log('Response Error Save Kinerja');
                console.log(result);
                toaster.pop({
                    type: 'error',
                    title: 'Gagal',
                    body: 'Gagal menyimpan data',
                    timeout: 5000
                });
            }
        });
        $scope.formTambahKinerja = {
            id: null,
            idKegiatanKinerja: null,
            kodeIndikator: null,
            kodeRef: {
                kodeFungsi: null,
                keteranganKode: null
            },
            noUrut: null,
            keteranganTolakUkur: null,
            keteranganTargetKinerja: null
        };
        angular.element('#modalAddKinerja').trigger('click');
    };

    $scope.updateKinerja = function () {
        console.log('Update Kinerja');
        $scope.formEditKinerja.id = $scope.formEditKinerja.idKegiatanKinerja;
        const e = $scope.formEditKinerja;
        if (e.kodeIndikator == null || (e.keteranganTolakUkur == null || e.keteranganTolakUkur == '') || (e.keteranganTargetKinerja == null || e.keteranganTargetKinerja == '')) {
            console.log('Form Not Valid');
            $scope.submittedEditKinerja = true;
            return;
        }
        $scope.submittedEditKinerja = false;
        console.log('Update Kinerja :');
        console.log($scope.formEditKinerja);
        globalService.servicePostData(`/blud-resource-server/api/kinerja/update`, {
            tahunAnggaran: $scope.tahun,
            idKegiatan: kegiatanId,
            idSkpd: local.pengguna.skpdId
        }, $scope.formEditKinerja, function (result) {
            console.log('Result Data update Kinerja');
            console.log(result.data);
            if (result.status === 201) {
                console.log('Response update Kinerja Succes');
                console.log(result);
                $scope.listKinerja = result.data;
                $scope.dtInstanceKinerja.rerender();
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil',
                    body: 'Berhasil sunting data',
                    timeout: 5000
                });
                $scope.noUrutKinerja = Math.max.apply(Math, $scope.listKinerja.map(function (v) {
                    return v.noUrut;
                })) + 1;
            } else {
                console.log('Response Error update Kinerja');
                console.log(result);
                toaster.pop({
                    type: 'error',
                    title: 'Gagal',
                    body: 'Gagal sunting data',
                    timeout: 5000
                });
            }
        });
        angular.element('#modalEditKinerja').trigger('click');
    };

    let idKinerjaDelete = null;

    $scope.deleteNotif = function (data) {
        console.log('Delete Notif');
        console.log(data);
        idKinerjaDelete = data.idKegiatanKinerja;
    };

    $scope.deleteKinerja = function (data) {
        console.log('Delete Kinerja');
        console.log(data);
        globalService.serviceDeleteData(`/blud-resource-server/api/kinerja/delete`, {
            tahunAnggaran: $scope.tahun,
            idKegiatan: kegiatanId,
            idSkpd: local.pengguna.skpdId,
            idKinerja: idKinerjaDelete
        }, function (result) {
            if (result.status === 200) {
                console.log("delete success");
                console.log(result);
                $scope.listKinerja = result.data;
                $scope.dtInstanceKinerja.rerender();
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil',
                    body: 'Berhasil menghapus data',
                    timeout: 5000
                });
                $scope.noUrutKinerja = Math.max.apply(Math, $scope.listKinerja.map(function (v) {
                    return v.noUrut;
                })) + 1;
                idKinerjaDelete = null;
            } else {
                console.log(result);
                toaster.pop({
                    type: 'error',
                    title: 'Gagal',
                    body: 'Gagal menghapus data',
                    timeout: 5000
                });
                idKinerjaDelete = null;
            }
        });

    }

}
