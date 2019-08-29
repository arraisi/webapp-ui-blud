angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('KegiatanController', KegiatanController);

// Function Untuk Kontroller Kegiatan List
function KegiatanController($scope, $location, toaster, globalService) {

    $scope.accounting = accounting;

    /** DT Options For Datatables */
    $scope.persons = [];
    $scope.dtInstance = {};
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

    /** Load Kegiatan By Tahun Anggaran dan ID SKPD */
    globalService.serviceGetData(`/blud-resource-server/api/kegiatan/load/${$scope.tahun}/${local.pengguna.skpdId}`, null, function (result) {
        console.log('Result Data Kegiatan');
        console.log(result.data);
        if (result.status === 200) {
            console.log('Response Result Kegiatan');
            console.log(result);
            $scope.listKegiatan = result.data;
            console.log('Value Data Load Kegiatan :');
            console.log($scope.listKegiatan);
        } else {
            console.log('Response Result Load Kegiatan');
            console.log(result);
        }
    });

    $scope.statusAppvKepalaDanDinas = {
        catatanAppvDinas: '-',
        catatanAppvKepala: '-',
        statusAppvDinas: null,
        statusAppvKepala: null,
        statusButtonAppvDinas: 'btn-secondary',
        statusButtonAppvKepala: 'btn-secondary',
        statusNameAppvDinas: '-',
        statusNameAppvKepala: '-'
    };

    /** Get Approval Kepala SKPD dan Dinas Teknis */
    globalService.serviceGetData('blud-resource-server/api/persetujuan/status/appv/kepala-dinas', {
        idSkpd: local.pengguna.skpdId,
        tahunAnggaran: $scope.tahun
    }, function (result) {
        console.log('Result Data Approval Kepala SKPD dan Dinas Teknik');
        console.log(result);
        if (result.status === 200) {
            console.log('Response Result Approval Kepala SKPD dan Dinas Teknik');
            console.log(result.data);
            $scope.statusAppvKepalaDanDinas = result.data;
            console.log('Data Result Approval Kepala SKPD dan Dinas Teknik');
            console.log($scope.statusAppvKepalaDanDinas);
        } else {
            console.log('Response Result Approval Kepala SKPD dan Dinas Teknik Error');
            console.log(result);
        }
    });

    $scope.goToTambahKegiatan = function () {
        console.log('Go To Tambah Kegiatan');
        $location.path('/kegiatan/tambah');
    };

    $scope.editButton = function (data) {
        $location.search('idKegiatan', data.idKegiatan);
        $location.path('/kegiatan/tambah');
    };

    $scope.kirimKegiatan = function () {
        console.log('Kirim Kegiatan');
        globalService.serviceGetData('blud-resource-server/api/kegiatan/verifikasi/anggaran', {
            idSkpd: local.pengguna.skpdId,
            tahunAnggaran: $scope.tahun
        }, function (result) {
            console.log('Result Data Verifikasi Pagu');
            console.log(result);
            if (result.status === 200) {
                console.log('Response Result Verifikasi Data Pagu');
                console.log(result.data);
                if (result.data.sisa >= 0) {
                    submitData();
                }
                if (result.data.sisa < 0) {
                    toaster.pop({
                        type: 'error',
                        title: 'Kegiatan Melebihi Dari Anggaran',
                        body: '',
                        timeout: 3000
                    });
                }
            } else {
                console.log('Response Result Verifikasi Pagu');
                console.log(result);
            }
        });
    };

    $scope.statusClick = function (val) {
        console.log('Status Click');
        $scope.showCatatan = val.catatanPersetujuan;
    };

    function submitData() {
        console.log('Submit Data');
        globalService.servicePostData(`/blud-resource-server/api/persetujuan/operator/kirim`, {tahunAnggaran: $scope.tahun}, null, function (result) {
            console.log('Result Data Submit Operator');
            console.log(result.data);
            if (result.status === 201) {
                console.log('Response Submit Operator');
                console.log(result);
                $scope.listKegiatan = result.data;
                $scope.dtInstance.rerender();
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil',
                    body: 'Berhasil Kirim Data Kegiatan',
                    timeout: 3000
                });
                $location.path('/kegiatan');
            } else {
                console.log('Response Error Submit Operator');
                console.log(result);
                toaster.pop({
                    type: 'warning',
                    title: 'Gagal',
                    body: 'Gagal Kirim Data Kegiatan',
                    timeout: 3000
                });
            }
        });
    }
}
