angular
    .module('app')
    .config(['$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', '$breadcrumbProvider', function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider, $breadcrumbProvider) {
        $stateProvider
            .state('app.icons.fontawesome', {
                url: '/font-awesome',
                templateUrl: 'views/icons/font-awesome.html',
                ncyBreadcrumb: {
                    label: 'Font Awesome'
                }
            })
            .state('app.components', {
                url: "/components",
                abstract: true,
                template: '<ui-view></ui-view>',
                ncyBreadcrumb: {
                    label: 'Components'
                }
            })
            .state('app.components.list-forms', {
                url: '/list-example',
                templateUrl: 'views/pages/form-example/list-example.html',
                ncyBreadcrumb: {
                    label: 'Forms'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/form-example.js']
                        });
                    }]
                }
            })
            .state('app.components.forms', {
                url: '/forms',
                templateUrl: 'views/pages/form-example/form-example.html',
                ncyBreadcrumb: {
                    label: 'Forms'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/form-example.js']
                        });
                    }]
                }
            })
            .state('app.kas', {
                url: '/kas-blud',
                templateUrl: 'views/pages/kas.html',
                ncyBreadcrumb: {
                    label: 'Kas BLUD'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/kas.js']
                        });
                    }]
                }
            })
            .state('app.pendapatan', {
                url: '/pendapatan',
                templateUrl: 'views/pages/pendapatan/pendapatan.html',
                ncyBreadcrumb: {
                    label: 'Pendapatan'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/pendapatan.js']
                        });
                    }]
                }
            })
            .state('app.rincian-pendapatan', {
                url: '/pendapatan/rincian',
                templateUrl: 'views/pages/pendapatan/rincian-pendapatan.html',
                ncyBreadcrumb: {
                    label: 'Pendapatan / Rincian'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/pendapatan.js']
                        });
                    }]
                }
            })
            .state('app.akb-pendapatan', {
                url: '/pendapatan/akb',
                templateUrl: 'views/pages/pendapatan/akb-pendapatan.html',
                ncyBreadcrumb: {
                    label: 'Pendapatan / AKB Bulan'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/pendapatan.js']
                        });
                    }]
                }
            })
            .state('app.rincian', {
                url: '/rincian-biaya',
                templateUrl: 'views/pages/rincian.html',
                ncyBreadcrumb: {
                    label: 'Rincian Biaya'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/rincian.js']
                        });
                    }]
                }
            })
            .state('app.kegiatan', {
                url: '/kegiatan',
                templateUrl: 'views/pages/kegiatan.html',
                ncyBreadcrumb: {
                    label: 'Kegiatan'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/kegiatan.js']
                        });
                    }]
                }
            })
            .state('app.laporan', {
                url: '/laporan',
                templateUrl: 'views/pages/laporan.html',
                ncyBreadcrumb: {
                    label: 'Laporan'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/laporan.js']
                        });
                    }]
                }
            })
            .state('app.widgets', {
                url: '/widgets',
                templateUrl: 'views/widgets.html',
                ncyBreadcrumb: {
                    label: 'Widgets'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load controllers
                        return $ocLazyLoad.load({
                            files: ['js/controllers/widgets.js']
                        });
                    }]
                }
            })
            .state('app.charts', {
                url: '/charts',
                templateUrl: 'views/charts.html',
                ncyBreadcrumb: {
                    label: 'Charts'
                },
                resolve: {
                    // Plugins loaded before
                    // loadPlugin: ['$ocLazyLoad', function ($ocLazyLoad) {
                    //     return $ocLazyLoad.load([
                    //         {
                    //             serial: true,
                    //             files: ['js/libs/Chart.min.js', 'js/libs/angular-chart.min.js']
                    //         }
                    //     ]);
                    // }],
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/charts.js']
                        });
                    }]
                }
            })
    }]);
