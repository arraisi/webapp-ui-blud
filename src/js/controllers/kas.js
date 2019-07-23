angular
    .module('app', ['toaster', 'ngAnimate', 'datatables','angularMoment'])
    .controller('KasController',KasController);

    function KasController(DTOptionsBuilder, DTColumnBuilder,$scope,moment) {
        $scope.tahun = new Date();
        $scope.exampleDate =moment($scope.tahun).format('YYYY');
        console.log($scope.exampleDate)
        var vm = this;
        var local = JSON.parse(localStorage.getItem('currentUser'));
        var authorization = 'Bearer ' + local.access_token;
        console.log(authorization)
        vm.dtOptions = DTOptionsBuilder.newOptions()
            .withOption('ajax', {
             // Either you specify the AjaxDataProp here
             // dataSrc: 'data',
             headers: { 'Authorization': authorization,'Content-Type': 'application/json; charset=UTF-8' },
             url: '/blud-auth-server/api/oauth/token/current/datatables',
             type: 'POST',
             data: function(data){
                return JSON.stringify(data);
             }

         })
         // or here
         .withDataProp('data')
            .withOption('processing', true)
            .withOption('searching', false)
            .withOption('serverSide', true)
            .withPaginationType('full_numbers');
        vm.dtColumns = [
            DTColumnBuilder.newColumn('username').withTitle('Kode Akun'),
            DTColumnBuilder.newColumn('clientId').withTitle('Perkiraan Saldo Kas Per 31 Desember ' + $scope.exampleDate),
            DTColumnBuilder.newColumn('clientId').withTitle('Perkiraan Saldo Kas Per 31 Desember ')
        ];
    }