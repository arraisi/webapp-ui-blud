angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('PendapatanController', PendapatanController)
    .controller('RincianPendapatanController', RincianPendapatanController)
    .controller('AkbPendapatanController', AkbPendapatanController);

// Function Untuk Kontroller Pendapatan List
function PendapatanController($scope, $location, toaster, globalService) {

    // ======== Awal Init Porject
    console.log('Init Controller Form Pendapatan');
    // $scope.loadPendapatan('2020', '12835');
    const tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    globalService.serviceGetData(`/blud-resource-server/api/pendapatan/load`, {
        tahunAnggaran: tahun,
        skpdId: local.pengguna.skpdId
    }, function (result) {
        console.log('Result Data Load Pendapatan');
        console.log(result.data);
        if (result.status === 200) {
            console.log('Response Result Load Pendapatan');
            console.log(result);
            $scope.loadDataPendapatan = result.data;
            let total = 0;
            $scope.loadDataPendapatan.forEach(value => total = total + value.anggaranTapd);
            $scope.totalTargetPendapatan = total;
            console.log('Value Data Load Pendatan :');
            console.log($scope.loadDataPendapatan);
            console.log('Total Target Pendapatan ==> ');
            console.log($scope.totalTargetPendapatan);
        } else {
            console.log('Response Result Load Pendapatan');
            console.log(result);
        }
    });

    // ======== Akhir Init Project


    // ======== Awal Inisialisasi Variable
    $scope.nameEmail = "";
    $scope.formTesting = {
        name: "",
        email: "",
        phone: ""
    };
    $scope.loadDataPendapatan = [];
    $scope.totalTargetPendapatan = 0;
    // $scope.loadDataPendapatan = {
    //     idTrx: null,
    //     tahunAnggaran: null,
    //     idSkpd: null,
    //     skpd: null,
    //     namaSkpd: null,
    //     idBas: null,
    //     kodeAkun: null,
    //     namaAkun: null,
    //     anggaranDpa: null,
    //     anggaranTapd: null
    // };
    // ======== Awal Inisialisasi Variable


    // ======== Awal Function
    $scope.getFormValue = function () {
        console.log($scope.formTesting);
        console.log('Name ' + $scope.formTesting.name);
        console.log('Email ' + $scope.formTesting.email);
        $scope.nameEmail = $scope.formTesting.name + " (" + $scope.formTesting.email + ")";
    };

    $scope.findData = function () {
        console.log('Find Data Function');
        formExampleService.findDataApi(function (result) {
            if (result.status === 200) {
                console.log('Response Result True');
                console.log(result);
            } else {
                console.log('Response Result False');
                console.log(result);
                // $scope.vm.error = 'Username or password is incorrect';
                // $scope.vm.loading = false;
            }
        });
    };

    $scope.goToRincian = function (valueDpt) {
        console.log('Method Route To Rincian');
        console.log('Value DPT');
        console.log(valueDpt);
        if (valueDpt.idTrx === -1) {
            globalService.servicePostData(`/blud-resource-server/api/pendapatan/save`, null, valueDpt, function (result) {
                console.log('Result Data Save Pendapatan');
                console.log(result.data);
                if (result.status === 201) {
                    console.log('Response Save Pendapatan');
                    console.log(result);
                    $location.search('idDpt', valueDpt.idTrx);
                    $location.path('/pendapatan/rincian');
                } else {
                    console.log('Response Error Save Pendapatan');
                    console.log(result);
                }
            });
        } else {
            $location.search('idDpt', valueDpt.idTrx);
            $location.path('/pendapatan/rincian');
        }
    };

    $scope.goToAkb = function () {
        console.log('Method Route To AKB');
        $location.search('idDpt', '1');
        $location.path('/pendapatan/akb');
    };
}

// Function Untuk Kontroller Rincian Pendapatan
function RincianPendapatanController($scope, $location, toaster, globalService) {
    $scope.noUrut = 0;
    const idDpt = $location.search().idDpt;
    if (idDpt) {
        console.log(`ID DPT ${idDpt}`);
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
                console.log('Response Result Load Pendapatan Not Ok');
                console.log(result);
            } else {
                $location.path('/pendapatan');
            }
        });
    } else {
        $location.path('/pendapatan');
    }

    // Variable For Table Rincian Pendapatan
    $scope.loadDataRincianPendapatan = [];
    const listidRincianDelete = [0];

    // Form Field Data Rincian
    $scope.formRincian = {
        anggaranNoUrut: null,
        rincianAnggaran: null,
        namaBarangSatuanTapd: null,
        jumlahBarangTapd: null,
        hargaBarangSatuanTapd: null,
        anggaranTapd: null,
        anggaranDpa: null,
        hargaBarangSatuanDpa: null,
        id: null,
        idBas: null,
        idDpt: null,
        idRekamPengguna: null,
        idSkpd: null,
        idUbahPengguna: null,
        jumlahBarang1Dpa: null,
        jumlahBarang1Tapd: null,
        jumlahBarang2Dpa: null,
        jumlahBarang2Tapd: null,
        jumlahBarang3Dpa: null,
        jumlahBarang3Tapd: null,
        jumlahBarangDpa: null,
        namaBarangSatuan1Dpa: null,
        namaBarangSatuan1Tapd: null,
        namaBarangSatuan2Dpa: null,
        namaBarangSatuan2Tapd: null,
        namaBarangSatuan3Dpa: null,
        namaBarangSatuan3Tapd: null,
        namaBarangSatuanDpa: null,
        spesifikasiAnggaran: null,
        tahunAnggaran: null,
        tanggalRekamPengguna: null,
        tanggalUbahPengguna: null
    };

    // Total Harga
    $scope.getTotalHarga = function () {
        console.log($scope.formRincian.jumlahBarangTapd);
        console.log($scope.formRincian.hargaBarangSatuanTapd);
        if ($scope.formRincian.hargaBarangSatuanTapd || $scope.formRincian.hargaBarangSatuanTapd < 0) {
            console.log('Harga Barang Is Null')
        }
        if ($scope.formRincian.jumlahBarangTapd || $scope.formRincian.jumlahBarangTapd < 0) {
            console.log('Jumlah Barang Is Null')
        }
        if ($scope.formRincian.jumlahBarangTapd >= 0 && $scope.formRincian.hargaBarangSatuanTapd >= 0) {
            $scope.formRincian.anggaranTapd = $scope.formRincian.jumlahBarangTapd * $scope.formRincian.hargaBarangSatuanTapd;
        }
    };

    // Only Number
    $scope.onlyNumberKey = function (event) {
        console.log('Only Number ' + event);
        console.log(event);
        if (event.charCode > 31 && (event.charCode < 48 || event.charCode > 57)) {
            console.log('Not Number');
            toaster.pop({
                type: 'success',
                title: 'Hanya Angka',
                body: 'Tidak Bisa Input Selain Angka',
                timeout: 5000
            });
            event.preventDefault();
        }
    };


    // Edit Rincian
    $scope.editRincian = function (data) {
        console.log('Data Rincian Edit');
        console.log(data);
        $scope.formRincian = data;
        const index = $scope.loadDataRincianPendapatan.findIndex(t => t.anggaranNoUrut === $scope.formRincian.anggaranNoUrut);
        $scope.loadDataRincianPendapatan.splice(index, 1);
    };

    // Hapus Rincian
    $scope.hapusRincian = function (data) {
        console.log('Data Rincian Hapus');
        console.log(data);
        const index = $scope.loadDataRincianPendapatan.findIndex(t => t.anggaranNoUrut === data.anggaranNoUrut);
        $scope.loadDataRincianPendapatan.splice(index, 1);
        $scope.loadDataRincianPendapatan.map(data => data.anggaranNoUrut = (this.noUrut = this.noUrut + 1));
        this.noUrut = 0;
    };

    // Kembali Ke Page Pendapatan List
    $scope.goToPendapatan = function () {
        $location.url($location.path());
        $location.path('/pendapatan');
    };

    // Simpan Rincian Pendapatan
    $scope.simpanRincian = function () {
        console.log('Form Rincian ==> ');
        console.log($scope.formRincian);
        $scope.formRincian.anggaranTapd = $scope.formRincian.jumlahBarangTapd * $scope.formRincian.hargaBarangSatuanTapd;
        $scope.loadDataRincianPendapatan.push($scope.formRincian);
        $scope.formRincian = {
            anggaranNoUrut: null,
            rincianAnggaran: null,
            namaBarangSatuanTapd: null,
            jumlahBarangTapd: null,
            hargaBarangSatuanTapd: null,
            anggaranTapd: null
        };
        $scope.loadDataRincianPendapatan.map(data => data.anggaranNoUrut = (this.noUrut = this.noUrut + 1));
        this.noUrut = 0;
        console.log($scope.formRincian.anggaranTapd);
    };

    // Simpan Data Rincian Pendapatan
    $scope.simpanDataRincianAll = function () {
        // $location.path('/pendapatan');
        console.log('Load Data Rincian Pendapatan ==> ');
        console.log($scope.loadDataRincianPendapatan);
        console.log('List Id Rincian Delete');
        console.log(listidRincianDelete);
        globalService.servicePostData(`/blud-resource-server/api/pendapatan/rincian/save`, {idPendapatan: idDpt}, $scope.loadDataRincianPendapatan, function (result) {
            console.log('Result Data Save Rincian Pendapatan');
            console.log(result.data);
            if (result.status === 201) {
                console.log('Response Save Rincian Pendapatan Succes');
                console.log(result);
                // $location.path('/pendapatan');
            } else {
                console.log('Response Error Save Rincian Pendapatan');
                console.log(result);
            }
        })
    };

}

// Function Untuk Controller AKB Pendapatan
function AkbPendapatanController($scope, $location, toaster, globalService) {
    const idDpt = $location.search().idDpt;
    if (idDpt) {
        console.log(`ID DPT ${idDpt}`);
    } else {
        $location.path('/pendapatan');
    }
}
