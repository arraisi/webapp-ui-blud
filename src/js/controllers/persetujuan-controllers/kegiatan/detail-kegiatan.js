angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('DetailKegiatanPersetujuanController', DetailKegiatanPersetujuanController);

function DetailKegiatanPersetujuanController($scope, $location, toaster, globalService) {
    $scope.accounting = accounting;

    $scope.kegiatanPilih = null;

    $scope.catatanPenolakan = null;
    $scope.showCatatan = null;

    $scope.penggunaLogin = {
        email: null,
        group: null,
        jabatan: null,
        nama: null,
        nip: null,
        noHp: null,
        noHpAktif: null,
        nrk: null,
        otor: null,
        skpdId: null
    };

    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    const skpdIdUrlParam = $location.search().skpd;
    console.log("URL PARAM", $scope.skpdIdUrlParam);
    $scope.otoritasPengguna = local.pengguna.otor;
    $scope.penggunaLogin = local.pengguna;

    console.log('PENGGUNA TEST');
    console.log($scope.penggunaLogin);

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
        idSkpd: skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId,
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

    const checkStatusAppvKepalaSkpdDinas = function () {
        globalService.serviceGetData('blud-resource-server/api/persetujuan/status/appv/kepala-dinas', {
            idSkpd: skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId,
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

    /** Load Kegiatan By Tahun Anggaran dan ID SKPD */
    globalService.serviceGetData(`/blud-resource-server/api/kegiatan/load/${$scope.tahun}/${skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId}`, null, function (result) {
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


    $scope.doKembali = function () {
        $location.url($location.path());
        $location.path('/persetujuan/kegiatan/detail');
    };

    $scope.pilihKegiatan = function (val) {
        $scope.kegiatanPilih = val;
    };

    $scope.detailKegiatan = function (val) {
        console.log('Detail Kegiatan');
        console.log(val);
        $location.search('kegiatan', val.idKegiatan);
        $location.path('/kegiatan/detail');
    };

    $scope.terimaKegiatan = function () {
        console.log('Setuju Kegiatan');
        console.log($scope.kegiatanPilih);
        const kegiatan = $scope.kegiatanPilih;
        globalService.servicePostData(`/blud-resource-server/api/persetujuan/bendahara/terima`, {
            tahunAnggaran: $scope.tahun,
            kegiatanId: kegiatan.idKegiatan
        }, null, function (result) {
            console.log('Result Data Terima Bendahara');
            console.log(result.data);
            if (result.status === 201) {
                console.log('Response Terima Bendahara');
                console.log(result);
                $scope.listKegiatan = result.data;
                $scope.dtInstance.rerender();
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil',
                    body: `Berhasil Terima Kegiatan ${kegiatan.kodeKegiatan}`,
                    timeout: 3000
                });
            } else {
                console.log('Response Error Terima Kegiatan');
                console.log(result);
                toaster.pop({
                    type: 'warning',
                    title: 'Gagal',
                    body: `Gagal Terima Kegiatan ${kegiatan.kodeKegiatan}`,
                    timeout: 3000
                });
            }
        });
    };

    $scope.tolakKegiatan = function () {
        console.log('Tolak Kegiatan');
        console.log($scope.kegiatanPilih);
        const kegiatan = $scope.kegiatanPilih;
        const catatan = $scope.catatanPenolakan;
        console.log(catatan);
        if (catatan) {
            globalService.servicePostData(`/blud-resource-server/api/persetujuan/bendahara/tolak`, {
                tahunAnggaran: $scope.tahun,
                kegiatanId: kegiatan.idKegiatan
            }, catatan, function (result) {
                console.log('Result Data Tolak Bendahara');
                console.log(result.data);
                if (result.status === 201) {
                    console.log('Response Tolak Bendahara');
                    console.log(result);
                    $scope.listKegiatan = result.data;
                    $scope.dtInstance.rerender();
                    toaster.pop({
                        type: 'success',
                        title: 'Berhasil',
                        body: `Berhasil Tolak Kegiatan ${kegiatan.kodeKegiatan}`,
                        timeout: 3000
                    });
                    angular.element('#modalTolakKegiatan').trigger('click');
                } else {
                    console.log('Response Error Tolak Kegiatan');
                    console.log(result);
                    toaster.pop({
                        type: 'warning',
                        title: 'Gagal',
                        body: `Gagal Tolak Kegiatan ${kegiatan.kodeKegiatan}`,
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

    $scope.statusClick = function (val) {
        console.log('Status Click');
        $scope.showCatatan = val.catatanPersetujuan;
    };

    $scope.kirimKegiatan = function () {
        console.log('Kirim Kegiatan');
        globalService.serviceGetData('blud-resource-server/api/kegiatan/verifikasi/anggaran', {
            idSkpd: skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId,
            tahunAnggaran: $scope.tahun
        }, function (result) {
            console.log('Result Data Verifikasi Pagu');
            console.log(result);
            if (result.status === 200) {
                console.log('Response Result Verifikasi Data Pagu');
                console.log(result.data);
                if (result.data.sisa >= 0) {
                    checkTotalKegiatanBelumDiTerima();
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

    function checkTotalKegiatanBelumDiTerima() {
        globalService.serviceGetData('blud-resource-server/api/persetujuan/kegiatan/status/tidak-terima', {
            tahunAnggaran: $scope.tahun
        }, function (result) {
            console.log('Result Data Kegiatan Belum Disetujui');
            console.log(result);
            if (result.status === 200) {
                console.log('Response Result Kegiatan Belum Disetujui');
                console.log(result.data);
                console.log('Bisa Approve');
                submitDataBendahara();
            } else if (result.status === 204) {
                toaster.pop({
                    type: 'warning',
                    title: 'Tidak Dapat Dikirim',
                    body: `Masih Terdapat ${result.data} Kegiatan Yang Belum Disetujui`,
                    timeout: 3000
                });
            } else {
                console.log('Response Result Kegiatan Belum Disetujui Error');
                console.log(result);
            }
        });
    }

    function submitDataBendahara() {
        console.log('Submit Data');
        globalService.servicePostData(`/blud-resource-server/api/persetujuan/bendahara/kirim`, {tahunAnggaran: $scope.tahun}, null, function (result) {
            console.log('Result Data Submit Bendahara');
            console.log(result.data);
            if (result.status === 201) {
                console.log('Response Submit Bendahara');
                console.log(result);
                $scope.listKegiatan = result.data;
                $scope.dtInstance.rerender();
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil',
                    body: 'Berhasil Kirim Data Kegiatan',
                    timeout: 3000
                });
                checkStatusAppvKepalaSkpdDinas();
            } else {
                console.log('Response Error Submit Bendahara');
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

    $scope.terimaKegiatanKepalaDinas = function () {
        console.log(`Terima Kegiatan ${$scope.penggunaLogin.otor}`);
        if ($scope.penggunaLogin.otor === '2') {
            globalService.servicePostData(`/blud-resource-server/api/persetujuan/kepala/terima`, {
                tahunAnggaran: $scope.tahun
            }, null, function (result) {
                console.log('Result Data Terima Kepala SKPD');
                console.log(result.data);
                if (result.status === 201) {
                    console.log('Response Terima Kepala SKPD');
                    console.log(result);
                    $scope.listKegiatan = result.data;
                    $scope.dtInstance.rerender();
                    toaster.pop({
                        type: 'success',
                        title: 'Berhasil',
                        body: `Berhasil Terima Kegiatan`,
                        timeout: 3000
                    });
                    checkStatusAppvKepalaSkpdDinas();
                } else {
                    console.log('Response Error Terima Kegiatan Kepala SKPD');
                    console.log(result);
                    toaster.pop({
                        type: 'warning',
                        title: 'Gagal',
                        body: `Gagal Terima Kegiatan`,
                        timeout: 3000
                    });
                    checkStatusAppvKepalaSkpdDinas();
                }
            });
        } else if ($scope.penggunaLogin.otor === '3') {
            globalService.servicePostData(`/blud-resource-server/api/persetujuan/dinas/terima`, {
                tahunAnggaran: $scope.tahun,
                idSkpd: skpdIdUrlParam
            }, null, function (result) {
                console.log('Result Data Terima Dinas Teknis');
                console.log(result.data);
                if (result.status === 201) {
                    console.log('Response Terima Dinas Teknis');
                    console.log(result);
                    $scope.listKegiatan = result.data;
                    $scope.dtInstance.rerender();
                    toaster.pop({
                        type: 'success',
                        title: 'Berhasil',
                        body: `Berhasil Terima Kegiatan`,
                        timeout: 3000
                    });
                    checkStatusAppvKepalaSkpdDinas();
                } else {
                    console.log('Response Error Terima Kegiatan Dinas Teknis');
                    console.log(result);
                    toaster.pop({
                        type: 'warning',
                        title: 'Gagal',
                        body: `Gagal Terima Kegiatan`,
                        timeout: 3000
                    });
                    checkStatusAppvKepalaSkpdDinas();
                }
            });
        } else {
            toaster.pop({
                type: 'error',
                title: 'Gagal',
                body: `Gagal Terima Kegiatan - Otoritas Belum Terdaftar`,
                timeout: 3000
            });
        }
    };

    $scope.tolakKegiatanKepalaDinas = function () {
        console.log(`Tolak Kegiatan ${$scope.penggunaLogin.otor}`);
        const catatan = $scope.catatanPenolakan;
        console.log(catatan);
        if (catatan) {
            if ($scope.penggunaLogin.otor === '2') {
                globalService.servicePostData(`/blud-resource-server/api/persetujuan/kepala/tolak`, {
                    tahunAnggaran: $scope.tahun
                }, catatan, function (result) {
                    console.log('Result Data Tolak Kepala SKPD');
                    console.log(result.data);
                    if (result.status === 201) {
                        console.log('Response Tolak Kepala SKPD');
                        console.log(result);
                        $scope.listKegiatan = result.data;
                        $scope.dtInstance.rerender();
                        toaster.pop({
                            type: 'success',
                            title: 'Berhasil',
                            body: `Berhasil Tolak Kegiatan`,
                            timeout: 3000
                        });
                        checkStatusAppvKepalaSkpdDinas();
                        angular.element('#modalTolakKegiatanKepalaDinas').trigger('click');
                    } else {
                        console.log('Response Error Tolak Kegiatan Kepala SKPD');
                        console.log(result);
                        toaster.pop({
                            type: 'warning',
                            title: 'Gagal',
                            body: `Gagal Tolak Kegiatan`,
                            timeout: 3000
                        });
                        checkStatusAppvKepalaSkpdDinas();
                        angular.element('#modalTolakKegiatanKepalaDinas').trigger('click');
                    }
                });
            } else if ($scope.penggunaLogin.otor === '3') {
                globalService.servicePostData(`/blud-resource-server/api/persetujuan/dinas/tolak`, {
                    tahunAnggaran: $scope.tahun,
                    idSkpd: skpdIdUrlParam
                }, catatan, function (result) {
                    console.log('Result Data Tolak Dinas Teknis');
                    console.log(result.data);
                    if (result.status === 201) {
                        console.log('Response Tolak Dinas Teknis');
                        console.log(result);
                        $scope.listKegiatan = result.data;
                        $scope.dtInstance.rerender();
                        toaster.pop({
                            type: 'success',
                            title: 'Berhasil',
                            body: `Berhasil Tolak Kegiatan`,
                            timeout: 3000
                        });
                        checkStatusAppvKepalaSkpdDinas();
                        angular.element('#modalTolakKegiatanKepalaDinas').trigger('click');
                    } else {
                        console.log('Response Error Tolak Kegiatan Dinas Teknis');
                        console.log(result);
                        toaster.pop({
                            type: 'warning',
                            title: 'Gagal',
                            body: `Gagal Tolak Kegiatan`,
                            timeout: 3000
                        });
                        checkStatusAppvKepalaSkpdDinas();
                        angular.element('#modalTolakKegiatanKepalaDinas').trigger('click');
                    }
                });
            } else {
                toaster.pop({
                    type: 'error',
                    title: 'Gagal',
                    body: `Gagal Tolak Kegiatan - Otoritas Belum Terdaftar`,
                    timeout: 3000
                });
            }
        } else {
            toaster.pop({
                type: 'warning',
                title: 'Catatan Kosong',
                body: `Silahkan Tinggalkan Catatan Penolakan`,
                timeout: 3000
            });
        }
    };

    $scope.catatanKepalaDinasShow = function (type) {
        if (type === 'kepala') {
            $scope.showCatatan = $scope.statusAppvKepalaDanDinas.catatanAppvKepala;
        }
        if (type === 'dinas') {
            $scope.showCatatan = $scope.statusAppvKepalaDanDinas.catatanAppvDinas;
        }
    };


    $scope.doGoTo = function (path) {
        console.log(path);
        switch (path) {
            case 'Kas':
                // $location.search('idDpt', valueDpt.idTrx);
                $location.path('/persetujuan/kas-blud/detail');
                break;
            case 'Pendapatan':
                // $scope.urlParam
                $location.path('/persetujuan/pendapatan/detail');
                break;
            case 'Rencana':
                // $scope.urlParam
                $location.path('/persetujuan/rencana-belanja/detail');
                break;
            case 'Kegiatan':
                // $scope.urlParam
                $location.path('/persetujuan/kegiatan/detail');
                break;
            case 'Komponen':
                // $location.search('idDpt', valueDpt.idTrx);
                // $scope.urlParam
                $location.path('persetujuan/kegiatan/komponen/detail');
                break;
        }

    };

}