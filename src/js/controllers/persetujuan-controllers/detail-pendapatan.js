angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('DetailPendapatanPersetujuanController', DetailPendapatanPersetujuanController)
    .controller('DetailRincianPendapatanPersetujuanController', DetailRincianPendapatanPersetujuanController)
    .controller('DetailAkbPendapatanPersetujuanController', DetailAkbPendapatanPersetujuanController);

function DetailPendapatanPersetujuanController($scope, $location, toaster, globalService) {

    $scope.accounting = accounting;
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

    /** Load Pendapatan */
    globalService.serviceGetData(`/blud-resource-server/api/pendapatan/load`, {
        tahunAnggaran: $scope.tahun,
        skpdId: skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId
    }, function (result) {
        console.log('Result Data Load Pendapatan Persetujuan');
        console.log(result.data);
        if (result.status === 200) {
            console.log('Response Result Load Pendapatan Persetujuan');
            console.log(result);
            $scope.loadDataPendapatan = result.data;
            let total = 0;
            $scope.loadDataPendapatan.forEach(value => total = total + value.anggaranTapd);
            $scope.totalTargetPendapatan = total;
            console.log('Value Data Load Pendatan Persetujuan:');
            console.log($scope.loadDataPendapatan);
            console.log('Total Target Pendapatan Persetujuan ==> ');
            console.log($scope.totalTargetPendapatan);
        } else {
            console.log('Response Result Load Pendapatan Persetujuan');
            console.log(result);
        }
    });

    $scope.doKembali = function () {
        $location.url($location.path());
        $location.path('/persetujuan/list');
    };

    $scope.doLanjut = function () {
        $location.path('/persetujuan/rencana-belanja/detail');
    };

    $scope.goToRincianPersetujuan = function (valueDpt) {
        $location.search('idDpt', valueDpt.idTrx);
        $location.path('/persetujuan/pendapatan/rincian/detail');
    };

    $scope.goToAkbPersetujuan = function (valueDpt) {
        $location.search('idDpt', valueDpt.idTrx);
        $location.path('/persetujuan/pendapatan/akb/detail');
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

function DetailRincianPendapatanPersetujuanController($scope, $location, toaster, globalService) {

    $scope.accounting = accounting;
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    const skpdIdUrlParam = $location.search().skpd;
    const idDpt = $location.search().idDpt;
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

    if (idDpt) {
        console.log(`ID DPT ${idDpt}`);
        /** Load Rincian By ID DPT */
        globalService.serviceGetData(`/blud-resource-server/api/pendapatan/rincian/load/${idDpt}`, null, function (result) {
            console.log('Result Data Load Rincian Pendapatan');
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result Load Rincian Pendapatan Ok');
                console.log(result);
                $scope.loadDataRincianPendapatan = result.data;
                // $scope.loadDataRincianPendapatan.map(data => data.anggaranNoUrut = (this.noUrut = this.noUrut + 1));
                // this.noUrut = 0;
                console.log('Value Data Load Rincian Pendatan :');
                console.log($scope.loadDataRincianPendapatan);
            } else if (result.status === 204) {
                $scope.loadDataRincianPendapatan = [];
                console.log('Response Result Load Pendapatan Not Ok');
                console.log(result);
            } else {
                $location.path('/pendapatan');
            }
        });

        /** Load SKPD DAN DPT */
        globalService.serviceGetData(`/blud-resource-server/api/pendapatan/get`, {
            tahunAnggaran: $scope.tahun,
            skpdId: skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId,
            dptId: idDpt
        }, function (result) {
            console.log('Result Data Detail SKPD DAN DPT');
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result Detail SKPD DAN DPT');
                console.log(result);
                $scope.skpdDetail = result.data;
                console.log('Value Data Load Detail SKPD DAN DPT :');
            } else {
                console.log('Response Result Load Detail SKPD DAN DPT');
                console.log(result);
            }
        });
    } else {
        $location.path('/persetujuan/pendapatan/detail');
    }

    $scope.doKembali = function () {
        $location.url($location.path());
        $location.path('/persetujuan/pendapatan/detail');
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

function DetailAkbPendapatanPersetujuanController($scope, $location, toaster, globalService) {

    $scope.accounting = accounting;
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    const skpdIdUrlParam = $location.search().skpd;
    const idDpt = $location.search().idDpt;
    console.log("URL PARAM", $scope.skpdIdUrlParam);
    $scope.otoritasPengguna = local.pengguna.otor;

    $scope.accounting = accounting;
    $scope.formAkbPendapatan = {
        anggaranDpa: null,
        anggaranTapd: null,
        id: null,
        idBas: null,
        idRekamPengguna: null,
        idSkpd: null,
        idUbahPengguna: null,
        jenis: null,
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
        tahunAnggaran: null,
        tanggalRekamPengguna: null,
        tanggalUbahPengguna: null
    };
    $scope.totalRpaBulan = 0;

    if (idDpt) {
        console.log(`ID DPT ${idDpt}`);
        /** Get Pendapatan BY ID DPT */
        globalService.serviceGetData(`/blud-resource-server/api/pendapatan/${idDpt}`, null, function (result) {
            console.log('Result Data Pendapatan');
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result Pendapatan Ok');
                console.log(result);
                $scope.formAkbPendapatan = result.data;
                console.log('Value Data Pendatan :');
                console.log($scope.formAkbPendapatan);
                if ($scope.formAkbPendapatan.jenis == null) {
                    $scope.formAkbPendapatan.jenis = 0
                }
                if ($scope.formAkbPendapatan.jenis === '1') {
                    $scope.changeJenis();
                    $scope.simpanAkb();
                }
                let totalRpa = (
                    $scope.formAkbPendapatan.rpaBulan1 +
                    $scope.formAkbPendapatan.rpaBulan2 +
                    $scope.formAkbPendapatan.rpaBulan3 +
                    $scope.formAkbPendapatan.rpaBulan4 +
                    $scope.formAkbPendapatan.rpaBulan5 +
                    $scope.formAkbPendapatan.rpaBulan6 +
                    $scope.formAkbPendapatan.rpaBulan7 +
                    $scope.formAkbPendapatan.rpaBulan8 +
                    $scope.formAkbPendapatan.rpaBulan9 +
                    $scope.formAkbPendapatan.rpaBulan10 +
                    $scope.formAkbPendapatan.rpaBulan11 +
                    $scope.formAkbPendapatan.rpaBulan12);
                $scope.totalRpaBulan = totalRpa;
                $scope.sisaAnggaran = $scope.formAkbPendapatan.anggaranTapd - $scope.totalRpaBulan;
            } else if (result.status === 204) {
                console.log('Response Result Pendatan Not Ok');
                console.log(result);
            } else {
                $location.path('/pendapatan');
            }
        });

        /** Load SKPD DAN DPT */
        globalService.serviceGetData(`/blud-resource-server/api/pendapatan/get`, {
            tahunAnggaran: $scope.tahun,
            skpdId: skpdIdUrlParam ? skpdIdUrlParam : local.pengguna.skpdId,
            dptId: idDpt
        }, function (result) {
            console.log('Result Data Detail SKPD DAN DPT');
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result Detail SKPD DAN DPT');
                console.log(result);
                $scope.skpdDetail = result.data;
                console.log('Value Data Load Detail SKPD DAN DPT :');
            } else {
                console.log('Response Result Load Detail SKPD DAN DPT');
                console.log(result);
            }
        });
    } else {
        $location.path('/persetujuan/pendapatan/detail');
    }

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

    $scope.doKembali = function () {
        $location.url($location.path());
        $location.path('/persetujuan/pendapatan/detail');
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