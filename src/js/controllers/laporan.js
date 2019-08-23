angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('LaporanController', LaporanController);

function LaporanController($scope, $location, $sce, toaster, globalService) {
    console.log('Init Controller Laporan');

    globalService.serviceReport(`/blud-report-server/api/laporan/rekening`, null, null, function (result) {
        console.log('Result Data Laporan Rekening');
        console.log(result);
        if (result.status === 200) {
            console.log('Data Laporan Rekening');
            console.log(result.data);
            const file = new Blob([result.data], {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            $scope.pdfViewer = $sce.trustAsResourceUrl(fileURL);
            // $scope.pdfViewer = URL.createObjectURL(file)
            console.log('PDF VIEWER');
            console.log($scope.pdfViewer);
            // angular.element('#modalEditRpa').trigger('click');
            // toaster.pop({
            //     type: 'success',
            //     title: 'Berhasil',
            //     body: 'Berhasil Simpan Data RPA',
            //     timeout: 3000
            // });
        } else {
            console.log('Response Error Laporan Rekening');
            console.log(result);
            // toaster.pop({
            //     type: 'warning',
            //     title: 'Gagal',
            //     body: 'Gagal Simpan Data RPA',
            //     timeout: 3000
            // });
        }
    });

    $scope.downloadPdf = function () {
        console.log('Download Function');
        globalService.serviceReport(`/blud-report-server/api/laporan/rekapitulasi-anggaran-pendapatan-skpd`, null, null, function (result) {
            console.log('Result Data Laporan Rekapitulasi Anggaran Pendapatan SKPD');
            console.log(result);
            const fileName = "Rekapitulasi_Anggaran_Pendapatan_SKPD.pdf";
            const a = document.createElement("a");
            if (result.status === 200) {
                console.log('Data Laporan Rekapitulasi Anggaran Pendapatan SKPD');
                console.log(result.data);
                const file = new Blob([result.data], {type: 'application/pdf'});
                const fileURL = window.URL.createObjectURL(file);
                a.href = fileURL;
                a.download = fileName;
                a.click();
            } else {
                console.log('Response Error Laporan Rekapitulasi Anggaran Pendapatan SKPD');
                console.log(result);
            }
        });
    }

}
