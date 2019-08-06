angular
    .module('app', ['toaster', 'ngAnimate', 'datatables'])
    .controller('PendapatanController', PendapatanController)
    .controller('RincianPendapatanController', RincianPendapatanController)
    .controller('AkbPendapatanController', AkbPendapatanController);

// Function Untuk Kontroller Pendapatan List
function PendapatanController($scope, $location, toaster, globalService) {

    // ======== Awal Init Porject
    console.log('Init Controller Form Pendapatan');
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));

    /** Load Pendapatan */
    globalService.serviceGetData(`/blud-resource-server/api/pendapatan/load`, {
        tahunAnggaran: $scope.tahun,
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

    $scope.goToAkb = function (valueDpt) {
        console.log('Method Route To AKB');
        $location.search('idDpt', valueDpt.idTrx);
        $location.path('/pendapatan/akb');
    };
}

// Function Untuk Kontroller Rincian Pendapatan
function RincianPendapatanController($scope, $location, toaster, globalService) {
    $scope.noUrut = 0;
    $scope.submitted = false;
    const idDpt = $location.search().idDpt;
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
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
                console.log('Response Result Load Pendapatan Not Ok');
                console.log(result);
            } else {
                $location.path('/pendapatan');
            }
        });

        /** Load SKPD DAN DPT */
        globalService.serviceGetData(`/blud-resource-server/api/pendapatan/get`, {
            tahunAnggaran: $scope.tahun,
            skpdId: local.pengguna.skpdId,
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
        jumlahBarangTapd: 0,
        hargaBarangSatuanTapd: 0,
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
        if (!$scope.formRincian.jumlahBarangTapd) {
            $scope.formRincian.jumlahBarangTapd = 0;            
        }

        if (!$scope.formRincian.hargaBarangSatuanTapd) {
            $scope.formRincian.hargaBarangSatuanTapd = 0;
        }
        if ($scope.formRincian.hargaBarangSatuanTapd || $scope.formRincian.hargaBarangSatuanTapd < 0) {
            console.log('Harga Barang Is Null');
        }
        if ($scope.formRincian.jumlahBarangTapd || $scope.formRincian.jumlahBarangTapd < 0) {
            console.log('Jumlah Barang Is Null');
        }
        if ($scope.formRincian.jumlahBarangTapd >= 0 && $scope.formRincian.hargaBarangSatuanTapd >= 0) {
            $scope.formRincian.anggaranTapd = $scope.formRincian.jumlahBarangTapd * $scope.formRincian.hargaBarangSatuanTapd;
        }
    };

    // Only Number
    $scope.onlyNumberKey = function (event) {
        if (event.charCode > 31 && (event.charCode < 48 || event.charCode > 57)) {
            console.log('Not Number');
            toaster.pop({
                type: 'warning',
                title: 'Hanya Angka',
                body: 'Tidak Bisa Input Selain Angka',
                timeout: 3000
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
        
        globalService.serviceDeleteData(`/blud-resource-server/api/pendapatan/rincian/delete/${idDpt}/${data.id}` , null, function (result) {
            if (result.status === 200) {
                console.log("delete success");
                console.log(result);
            } else {
                console.log(result);
            }
        });
    };

    // Kembali Ke Page Pendapatan List
    $scope.goToPendapatan = function () {
        $location.url($location.path());
        $location.path('/pendapatan');
    };

    // Simpan Rincian Pendapatan
    $scope.simpanRincian = function (form) {
        console.log(form.$valid);
        if (!form.$valid) {
            console.log('Form Not Valid');
            $scope.submitted = true;
            return;
        }
        $scope.submitted = false;
        console.log('Form Valid');
        console.log('Form Rincian ==> ');
        console.log($scope.formRincian);
        $scope.formRincian.anggaranTapd = $scope.formRincian.jumlahBarangTapd * $scope.formRincian.hargaBarangSatuanTapd;
        if ($scope.formRincian.jumlahBarangTapd > 0 && $scope.formRincian.hargaBarangSatuanTapd > 0) {

            $scope.loadDataRincianPendapatan.push($scope.formRincian);
            $scope.formRincian = {
                anggaranNoUrut: null,
                rincianAnggaran: null,
                namaBarangSatuanTapd: null,
                jumlahBarangTapd: 0,
                hargaBarangSatuanTapd: 0,
                anggaranTapd: null
            };
            $scope.loadDataRincianPendapatan.map(data => data.anggaranNoUrut = (this.noUrut = this.noUrut + 1));
            this.noUrut = 0;
            globalService.servicePostData(`/blud-resource-server/api/pendapatan/rincian/save`, { idPendapatan: idDpt }, $scope.loadDataRincianPendapatan, function (result) {
                console.log('Result Data Save Rincian Pendapatan');
                console.log(result.data);
                if (result.status === 201) {
                    console.log('Response Save Rincian Pendapatan Succes');
                    console.log(result);
                    toaster.pop({
                        type: 'success',
                        title: 'Berhasil',
                        body: 'Berhasil menyimpan data',
                        timeout: 5000
                    });
                    // $location.url($location.path());
                    // $location.path('/pendapatan');
                } else {
                    console.log('Response Error Save Rincian Pendapatan');
                    console.log(result);
                }
            });
        } else if ($scope.formRincian.jumlahBarangTapd <= 0) {
            toaster.pop({
                type: 'error',
                title: 'Input Tidak Tepat',
                body: 'Volume tidak boleh kurang dari 1',
                timeout: 5000
            });
        } else if ($scope.formRincian.hargaBarangSatuanTapd <= 0) {
            toaster.pop({
                type: 'error',
                title: 'Input Tidak Tepat',
                body: 'Harga tidak boleh kurang dari 1',
                timeout: 5000
            });
        }
        console.log($scope.formRincian.anggaranTapd);
    };

    // Simpan Data Rincian Pendapatan
    $scope.simpanDataRincianAll = function () {
        console.log('Load Data Rincian Pendapatan ==> ');
        console.log($scope.loadDataRincianPendapatan);
        console.log('List Id Rincian Delete');
        console.log(listidRincianDelete);
        // globalService.servicePostData(`/blud-resource-server/api/pendapatan/rincian/save`, { idPendapatan: idDpt }, $scope.loadDataRincianPendapatan, function (result) {
        //     console.log('Result Data Save Rincian Pendapatan');
        //     console.log(result.data);
        //     if (result.status === 201) {
        //         console.log('Response Save Rincian Pendapatan Succes');
        //         console.log(result);
        //         toaster.pop({
        //             type: 'success',
        //             title: 'Berhasil',
        //             body: 'Berhasil menyimpan data',
        //             timeout: 5000
        //         });
                $location.url($location.path());
                $location.path('/pendapatan');
        //     } else {
        //         console.log('Response Error Save Rincian Pendapatan');
        //         console.log(result);
        //     }
        // })
    };

}

// Function Untuk Controller AKB Pendapatan
function AkbPendapatanController($scope, $location, toaster, globalService) {
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
    $scope.tahun = localStorage.getItem('tahunAnggaran');
    const local = JSON.parse(localStorage.getItem('currentUser'));
    const idDpt = $location.search().idDpt;
    if (idDpt) {
        console.log(`ID DPT ${idDpt}`);
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
            skpdId: local.pengguna.skpdId,
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
        $location.path('/pendapatan');
    }

    // Kembali Ke Page Pendapatan List
    $scope.goToPendapatan = function () {
        $location.url($location.path());
        $location.path('/pendapatan');
    };

    $scope.simpanAkb = function () {
        console.log('Save AKB');
        console.log($scope.formAkbPendapatan);
        if ($scope.sisaAnggaranMinus === true) {
            toaster.pop({
                type: 'error',
                title: 'Sisa Anggaran Tidak Mencukupi',
                body: 'Jumlah AKB 12 Bulan Dengan Anggaran Tidak Sesuai',
                timeout: 5000
            });
            return;
        }
        globalService.servicePostData(`/blud-resource-server/api/pendapatan/akb/save`, null, $scope.formAkbPendapatan, function (result) {
            console.log('Result Data Save AKB Pendapatan');
            console.log(result.data);
            if (result.status === 201) {
                console.log('Response Save AKB Pendapatan Succes');
                console.log(result);
                toaster.pop({
                    type: 'success',
                    title: 'Berhasil',
                    body: 'Berhasil menyimpan data',
                    timeout: 5000
                });
                $location.url($location.path());
                $location.path('/pendapatan');
            } else {
                console.log('Response Error Save AKB Pendapatan');
                console.log(result);
            }
        })
    };

    // Only Number
    $scope.onlyNumberKey = function (event) {
        if (event.charCode > 31 && (event.charCode < 48 || event.charCode > 57)) {
            toaster.pop({
                type: 'warning',
                title: 'Hanya Angka',
                body: 'Tidak Bisa Input Selain Angka',
                timeout: 3000
            });
            event.preventDefault();
        }
    };

    $scope.kalkulasiSisaAnggaran = function () {
        console.log('Total RPA BULAN');
        console.log(totalRpaBulanAdded());
        if (totalRpaBulanAdded()) {
            const sisa = $scope.formAkbPendapatan.anggaranTapd - totalRpaBulanAdded();
            if (sisa < 0) {
                toaster.pop({
                    type: 'error',
                    title: 'Anggaran',
                    body: 'Sisa Anggaran Tidak Mencukupi',
                    timeout: 5000
                });
                $scope.sisaAnggaranMinus = true;
            } else {
                $scope.sisaAnggaran = sisa;
                $scope.sisaAnggaranMinus = false;
            }
        }
    };

    // let formCadangan = {
    //     rpaBulan1: null,
    //     rpaBulan2: null,
    //     rpaBulan3: null,
    //     rpaBulan4: null,
    //     rpaBulan5: null,
    //     rpaBulan6: null,
    //     rpaBulan7: null,
    //     rpaBulan8: null,
    //     rpaBulan9: null,
    //     rpaBulan10: null,
    //     rpaBulan11: null,
    //     rpaBulan12: null,
    // };

    // Change Jenis
    $scope.changeJenis = function () {
        console.log('Change');
        console.log($scope.formAkbPendapatan.jenis);
        if ($scope.formAkbPendapatan.jenis === '1') {
            // formCadangan.rpaBulan1 = $scope.formAkbPendapatan.rpaBulan1;
            // formCadangan.rpaBulan2 = $scope.formAkbPendapatan.rpaBulan2;
            // formCadangan.rpaBulan3 = $scope.formAkbPendapatan.rpaBulan3;
            // formCadangan.rpaBulan4 = $scope.formAkbPendapatan.rpaBulan4;
            // formCadangan.rpaBulan5 = $scope.formAkbPendapatan.rpaBulan5;
            // formCadangan.rpaBulan6 = $scope.formAkbPendapatan.rpaBulan6;
            // formCadangan.rpaBulan7 = $scope.formAkbPendapatan.rpaBulan7;
            // formCadangan.rpaBulan8 = $scope.formAkbPendapatan.rpaBulan8;
            // formCadangan.rpaBulan9 = $scope.formAkbPendapatan.rpaBulan9;
            // formCadangan.rpaBulan10 = $scope.formAkbPendapatan.rpaBulan10;
            // formCadangan.rpaBulan11 = $scope.formAkbPendapatan.rpaBulan11;
            // formCadangan.rpaBulan12 = $scope.formAkbPendapatan.rpaBulan12;
            const bagiRata = Math.floor($scope.formAkbPendapatan.anggaranTapd / 12);
            console.log(bagiRata);
            $scope.formAkbPendapatan.rpaBulan1 = bagiRata;
            $scope.formAkbPendapatan.rpaBulan2 = bagiRata;
            $scope.formAkbPendapatan.rpaBulan3 = bagiRata;
            $scope.formAkbPendapatan.rpaBulan4 = bagiRata;
            $scope.formAkbPendapatan.rpaBulan5 = bagiRata;
            $scope.formAkbPendapatan.rpaBulan6 = bagiRata;
            $scope.formAkbPendapatan.rpaBulan7 = bagiRata;
            $scope.formAkbPendapatan.rpaBulan8 = bagiRata;
            $scope.formAkbPendapatan.rpaBulan9 = bagiRata;
            $scope.formAkbPendapatan.rpaBulan10 = bagiRata;
            $scope.formAkbPendapatan.rpaBulan11 = bagiRata;
            $scope.formAkbPendapatan.rpaBulan12 = bagiRata;
            const sisa = $scope.formAkbPendapatan.anggaranTapd - totalRpaBulanAdded();
            $scope.sisaAnggaran = sisa;
        } else {
            console.log('Jenis 0');
            $scope.formAkbPendapatan.rpaBulan1 = 0;
            $scope.formAkbPendapatan.rpaBulan2 = 0;
            $scope.formAkbPendapatan.rpaBulan3 = 0;
            $scope.formAkbPendapatan.rpaBulan4 = 0;
            $scope.formAkbPendapatan.rpaBulan5 = 0;
            $scope.formAkbPendapatan.rpaBulan6 = 0;
            $scope.formAkbPendapatan.rpaBulan7 = 0;
            $scope.formAkbPendapatan.rpaBulan8 = 0;
            $scope.formAkbPendapatan.rpaBulan9 = 0;
            $scope.formAkbPendapatan.rpaBulan10 = 0;
            $scope.formAkbPendapatan.rpaBulan11 = 0;
            $scope.formAkbPendapatan.rpaBulan12 = 0;
            $scope.sisaAnggaran = $scope.formAkbPendapatan.anggaranTapd - totalRpaBulanAdded();
        }
    };

    const totalRpaBulanAdded = function () {
        console.log($scope.formAkbPendapatan);
        const b1 = $scope.formAkbPendapatan.rpaBulan1 ? $scope.formAkbPendapatan.rpaBulan1 : 0;
        const b2 = $scope.formAkbPendapatan.rpaBulan2 ? $scope.formAkbPendapatan.rpaBulan2 : 0;
        const b3 = $scope.formAkbPendapatan.rpaBulan3 ? $scope.formAkbPendapatan.rpaBulan3 : 0;
        const b4 = $scope.formAkbPendapatan.rpaBulan4 ? $scope.formAkbPendapatan.rpaBulan4 : 0;
        const b5 = $scope.formAkbPendapatan.rpaBulan5 ? $scope.formAkbPendapatan.rpaBulan5 : 0;
        const b6 = $scope.formAkbPendapatan.rpaBulan6 ? $scope.formAkbPendapatan.rpaBulan6 : 0;
        const b7 = $scope.formAkbPendapatan.rpaBulan7 ? $scope.formAkbPendapatan.rpaBulan7 : 0;
        const b8 = $scope.formAkbPendapatan.rpaBulan8 ? $scope.formAkbPendapatan.rpaBulan8 : 0;
        const b9 = $scope.formAkbPendapatan.rpaBulan9 ? $scope.formAkbPendapatan.rpaBulan9 : 0;
        const b10 = $scope.formAkbPendapatan.rpaBulan10 ? $scope.formAkbPendapatan.rpaBulan10 : 0;
        const b11 = $scope.formAkbPendapatan.rpaBulan11 ? $scope.formAkbPendapatan.rpaBulan11 : 0;
        const b12 = $scope.formAkbPendapatan.rpaBulan12 ? $scope.formAkbPendapatan.rpaBulan12 : 0;
        const total = (b1 + b2 + b3 + b4 + b5 + b6 + b7 + b8 + b9 + b10 + b11 + b12);
        return total;
    }
}
