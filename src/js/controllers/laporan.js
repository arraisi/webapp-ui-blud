angular
    .module('app', ['toaster', 'ngAnimate', 'datatables', 'pdf'])
    .controller('LaporanController', LaporanController);

function LaporanController($scope, $location, $sce, toaster, globalService, $http) {
    console.log('Init Controller Laporan');
    const tahunAnggaran = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));

    $scope.laporanJenis = {
        laporanViewName: null,  // get pdf source from a URL that points to a pdf
        jasperFileUrl: null // get pdf source from raw data of a pdf
    };

    globalService.serviceGetData(`/blud-report-server/api/laporan/jenis`, null, function (response) {
        console.log('Result Data Jenis Laporan');
        console.log(response);
        if (response.status === 200) {
            console.log('Data Jenis Laporan');
            console.log(response.data);
            $scope.listJenisLaporan = response.data;
            console.log('Data Show Jenis Laporan');
            console.log($scope.listJenisLaporan);

        } else {
            console.log('Response Error Laporan Rekapitulasi Anggaran Pendapatan SKPD');
            console.log(response);
            toaster.pop({
                type: 'warning',
                title: 'Gagal',
                body: 'Gagal Mendapatkan Data List Jenis Laporan',
                timeout: 3000
            });
        }
    });

    $scope.getLaporan = function () {
        console.log($scope.laporanJenis);
        globalService.serviceReport(`/blud-report-server/api/laporan/by-jenis`, {
            laporan: $scope.laporanJenis.jasperFileUrl,
            tahunAnggaran: tahunAnggaran,
            skpdId: local.pengguna.skpdId
        }, function (result) {
            console.log(`'Result Data Laporan ${$scope.laporanJenis.laporanViewName}`);
            console.log(result);
            if (result.status === 200) {
                console.log(`'Result Data Laporan ${$scope.laporanJenis.laporanViewName}`);
                console.log(result.data);
                console.log('URL Show Laporan');
                console.log(result);
                const file = new Blob([result.data], {type: 'application/pdf'});
                const fileURL = URL.createObjectURL(file);
                $scope.pdfLink = $sce.trustAsResourceUrl(fileURL);
                console.log('PDF VIEWER');
                console.log(fileURL);
                console.log($scope.pdfLink);
                // angular.element('#modalEditRpa').trigger('click');
                // toaster.pop({
                //     type: 'success',
                //     title: 'Berhasil',
                //     body: 'Berhasil Simpan Data RPA',
                //     timeout: 3000
                // });
            } else {
                console.log(`Response Error Laporan ${$scope.laporanJenis.laporanViewName}`);
                console.log(result);
                toaster.pop({
                    type: 'warning',
                    title: 'Gagal',
                    body: `Gagal Mengambil Data Laporan ${$scope.laporanJenis.laporanViewName}`,
                    timeout: 3000
                });
            }
        });
    };

    $scope.downloadPdf = function () {
        console.log('Download Function');
        globalService.serviceReport(`/blud-report-server/api/laporan/rekapitulasi-anggaran-pendapatan-skpd`, null, function (response) {
            console.log('Result Data Laporan Rekapitulasi Anggaran Pendapatan SKPD');
            console.log(response);
            const fileName = "Rekapitulasi_Anggaran_Pendapatan_SKPD.pdf";
            const a = document.createElement("a");
            if (response.status === 200) {
                const fileType = response.headers['content-type'] + ';charset=utf-8';
                const blob = new Blob([response.data], {type: fileType});
                const objectUrl = window.URL || window.webkitURL;
                const link = angular.element('<a/>');

                link.css({display: 'none'});
                link.attr({
                    href: objectUrl.createObjectURL(blob),
                    target: '_blank',
                    download: fileName
                });
                link[0].click();
                // clean up
                link.remove();
                objectUrl.revokeObjectURL(blob);
            } else {
                console.log('Response Error Laporan Rekapitulasi Anggaran Pendapatan SKPD');
                console.log(response);
            }
        });
    }

}
