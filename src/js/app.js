// Default colors
var brandPrimary = '#034ea2';
var brandSuccess = '#4dbd74';
var brandInfo = '#63c2de';
var brandWarning = '#f8cb00';
var brandDanger = '#f86c6b';

var grayDark = '#2a2c36';
var gray = '#55595c';
var grayLight = '#818a91';
var grayLighter = '#d1d4d7';
var grayLightest = '#f8f9fa';

angular
    .module('app', [
        'ui.router',
        'oc.lazyLoad',
        'ncy-angular-breadcrumb',
        'angular-loading-bar'
    ])
    .config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
        cfpLoadingBarProvider.latencyThreshold = 1;
    }])
    .run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
        $rootScope.$on('$stateChangeSuccess', function () {
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        });
        $rootScope.$state = $state;
        return $rootScope.$stateParams = $stateParams;
    }])
    .controller('NavBarController', ['$scope', '$location', 'globalService', function ($scope, $location, globalService) {
        const local = JSON.parse(localStorage.getItem('currentUser'));
        $scope.namaLogin = local.pengguna.nama ? local.pengguna.nama : 'nama';
        $scope.logout = function () {
            console.log('Log Out');
            $location.url($location.path());
            $location.path('/login');
        };

        console.log("APP MAIN JS");

        globalService.serviceGetData(`/blud-resource-server/api/menu/list`, null, function (result) {
            console.log('Result Data Menu');
            console.log(result.data);
            if (result.status === 200) {
                console.log('Response Result List Menu');
                console.log(result);
                $scope.listMenu = result.data;
                console.log('Value Data Load List Menu :');
                console.log($scope.listMenu);
            } else {
                console.log('Response Result Load List Menu');
                console.log(result);
            }
        });
    }]);
