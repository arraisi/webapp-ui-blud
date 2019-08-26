angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('LaporanController', LaporanController);

function LaporanController($scope, $location, $sce, toaster, globalService) {
    console.log('Init Controller Laporan');

    globalService.serviceReportDownload(`/blud-report-server/api/laporan/rekapitulasi-anggaran-pendapatan-skpd`, null, function (result) {
        console.log('Result Data Laporan Rekapitulasi Anggaran Pendapatan SKPD');
        console.log(result);
        if (result.status === 200) {
            console.log('Data Laporan Rekapitulasi Anggaran Pendapatan SKPD');
            console.log(result.data);
            const file = new Blob([result.data], {type: 'application/pdf'});
            const fileURL = URL.createObjectURL(file);
            $scope.pdfViewer = $sce.trustAsResourceUrl(fileURL);
            // $scope.pdfViewer = URL.createObjectURL(file);
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
            console.log('Response Error Laporan Rekapitulasi Anggaran Pendapatan SKPD');
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
        globalService.serviceReportDownload(`/blud-report-server/api/laporan/rekapitulasi-anggaran-pendapatan-skpd`, null, function (response) {
            console.log('Result Data Laporan Rekapitulasi Anggaran Pendapatan SKPD');
            console.log(response);
            const fileName = "Rekapitulasi_Anggaran_Pendapatan_SKPD.pdf";
            const a = document.createElement("a");
            if (response.status === 200) {
                // console.log('Data Laporan Rekapitulasi Anggaran Pendapatan SKPD');
                // console.log(result.data);
                // const file = new Blob([result.data], {type: 'application/pdf'});
                // const fileURL = window.URL.createObjectURL(file);
                // a.href = fileURL;
                // a.download = fileName;
                // a.click();
                // const data = new Blob([result.data], { type: 'application/pdf' });
                // FileSaver.saveAs(data, 'Rekapitulasi_Anggaran_Pendapatan_SKPD.pdf');
                // var fileName = response.headers['content-disposition'].split("=")[1].replace(/\"/gi,'');
                var fileType = response.headers['content-type'] + ';charset=utf-8';
                var blob = new Blob([response.data], { type: fileType });
                var objectUrl = window.URL || window.webkitURL;
                var link = angular.element('<a/>');

                link.css({ display: 'none' });
                link.attr({
                    href : objectUrl.createObjectURL(blob),
                    target: '_blank',
                    download : fileName
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
