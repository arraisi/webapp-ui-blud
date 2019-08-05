angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('TabKegiatanController', TabKegiatanController);

// Function Untuk Kontroller TabKegiatanController
function TabKegiatanController($scope, $location, toaster, globalService) {

    /** DT Options For Datatables */
    $scope.persons = [];
    $scope.dtInstance = {};
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

    /** Get List Urusan */
    globalService.serviceGetData(`/blud-resource-server/api/urusan/list`, null, function (result) {
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
    globalService.serviceGetData(`/blud-resource-server/api/program/list`, null, function (result) {
        console.log('Result Data Program');
        console.log(result.data);
        if (result.status === 200) {
            console.log('Response Result Program');
            console.log(result);
            $scope.programList = result.data;
            console.log('Value Data Program :');
        } else {
            console.log('Response Result Program Error');
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
        noKegiatan: null,
        namaKegiatan: null,
        sasaran: null,
        waktuPelaksanaan: null,
        lokasiKegiatan: null,
        sumberDana: null
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
        namaProgram: null
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
        $scope.dtInstance.rerender();
    };

    /** Open Program Modal */
    $scope.openProgramModal = function () {
        $scope.programGetId = $scope.formTambahKegiatan.program.id;
        $scope.dtInstance.rerender();
    };

    /** Urusan Get Function */
    $scope.urusanGetFunction = function () {
        console.log('Get Urusan :');
        console.log($scope.urusan);
        $scope.formTambahKegiatan.urusan = $scope.urusan;
        console.log($scope.formTambahKegiatan);
        console.log($scope.formTambahKegiatan.urusan);
    };

    /** Program Get Function */
    $scope.programGetFunction = function () {
        console.log('Get Program :');
        console.log($scope.program);
        $scope.formTambahKegiatan.program = $scope.program;
        console.log($scope.formTambahKegiatan);
        console.log($scope.formTambahKegiatan.program);
    }

}
