angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('TabKegiatanController', TabKegiatanController);

// Function Untuk Kontroller TabKegiatanController
function TabKegiatanController($scope, $location, toaster, globalService) {

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

    /** DT Options For Datatables */
    $scope.persons = [];
    $scope.dtInstanceUrusan = {};
    $scope.dtInstanceProgram = {};
    $scope.dtOptions = {
        paginationType: 'full_numbers',
        searching: true,
        responsive: false,
        language: {
            "sEmptyTable": "No data available in table",
            "sInfo": "Showing _START_ to _END_ of _TOTAL_ entries",
            "sInfoEmpty": "Showing 0 to 0 of 0 entries",
            "sInfoFiltered": "(filtered from _MAX_ total entries)",
            "sInfoPostFix": "",
            "sInfoThousands": ",",
            "sLengthMenu": "Show _MENU_ entries",
            "sLoadingRecords": "Loading...",
            "sProcessing": "Processing...",
            "sSearch": "Cari:",
            "sZeroRecords": "No matching records found",
            "oPaginate": {
                "sFirst": "First",
                "sLast": "Last",
                "sNext": "Next",
                "sPrevious": "Previous"
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
    $scope.urusanList = [];

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
        globalService.serviceGetData(`/blud-resource-server/api/program/list/by-id-urusan/${idUrusan}`, {tahunAnggaran: $scope.tahun}, function (result) {
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
        bulanAkhir: null,
        kodeLokasiKegiatan: null,
        namaSumberDana: null
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
    }

}
