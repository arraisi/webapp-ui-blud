angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('ListPersetujuanController', ListPersetujuanController);

function ListPersetujuanController($scope, $location, toaster, globalService) {

    $scope.accounting = accounting;

    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    $scope.otoritasPengguna = local.pengguna.otor;
    $scope.penggunaLogin = local.pengguna;

    $scope.catatanPenolakan = null;

    $scope.pilihSkpd = function (val) {
        console.log(val);
        $scope.skpd = val;
    };


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

    if (local.pengguna.otor < 3) {
        $location.path('/persetujuan/kas-blud/detail');
    }

    /** Get Data Pengguna */
    function getSkpdList() {
        globalService.serviceGetData(`/blud-resource-server/api/skpd/list`, {tahunAnggaran: $scope.tahun}, function (result) {
            console.log('Result Data Detail SKPD');
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result List SKPD');
                console.log(result);
                $scope.listSkpd = result.data;
                console.log('Value Data Load List SKPD :');
                console.log($scope.listSkpd);
            } else {
                console.log('Response Result Load Detail SKPD');
                console.log(result);
            }
        });
    }

    getSkpdList();

    $scope.goToList = function (val) {
        $location.search('skpd', val.id);
        $location.path('/persetujuan/kas-blud/detail');
    };

    $scope.terimaKegiatan = function () {
        console.log('Setuju SKPD');
        globalService.servicePostData(`/blud-resource-server/api/persetujuan/dinas/terima`, {
            tahunAnggaran: $scope.tahun,
            idSkpd: $scope.skpd.id
        }, null, function (result) {
            console.log('Result Data Terima Dinas Teknis');
            console.log(result.data);
            if (result.status === 201) {
                console.log('Response Terima Dinas Teknis');
                console.log(result);
                getSkpdList();
                $scope.dtInstance.rerender();
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil',
                    body: `Berhasil Terima Kegiatan ${$scope.skpd.namaSkpd}`,
                    timeout: 3000
                });
            } else {
                console.log('Response Error Terima Dinas Teknis');
                console.log(result);
                toaster.pop({
                    type: 'warning',
                    title: 'Gagal',
                    body: `Gagal Terima Kegiatan ${$scope.skpd.namaSkpd}`,
                    timeout: 3000
                });
            }
        });
    };

    $scope.tolakKegiatan = function () {
        console.log('Tolak SKPD');
        const catatan = $scope.catatanPenolakan;
        console.log(catatan);
        if (catatan) {
            globalService.servicePostData(`/blud-resource-server/api/persetujuan/dinas/tolak`, {
                tahunAnggaran: $scope.tahun,
                idSkpd: $scope.skpd.id
            }, catatan, function (result) {
                console.log('Result Data Tolak Dinas Teknis');
                console.log(result.data);
                if (result.status === 201) {
                    console.log('Response Tolak Dinas Teknis');
                    console.log(result);
                    getSkpdList();
                    $scope.dtInstance.rerender();
                    toaster.pop({
                        type: 'success',
                        title: 'Berhasil',
                        body: `Berhasil Tolak Kegiatan SKPD ${$scope.skpd.namaSkpd}`,
                        timeout: 3000
                    });
                    angular.element('#modalTolakKegiatan').trigger('click');
                } else {
                    console.log('Response Error Tolak Kegiatan');
                    console.log(result);
                    toaster.pop({
                        type: 'warning',
                        title: 'Gagal',
                        body: `Gagal Tolak Kegiatan SKPD ${$scope.skpd.namaSkpd}`,
                        timeout: 3000
                    });
                    angular.element('#modalTolakKegiatan').trigger('click');
                }
            });
        } else {
            toaster.pop({
                type: 'warning',
                title: 'Catatan Kosong',
                body: `Silahkan Tinggalkan Catatan Penolakan`,
                timeout: 3000
            });
        }
    };
}   