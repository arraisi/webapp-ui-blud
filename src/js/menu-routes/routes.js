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
            .state('app.persetujuan', {
                url: '/persetujuan/list',
                templateUrl: 'views/pages/persetujuan-view/ListPersetujuan.html',
                ncyBreadcrumb: {
                    label: 'Persetujuan / List'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/persetujuan-controllers/ListPersetujuan.js']
                        });
                    }]
                }
            })
            .state('app.DetailRincianPersetujuan', {
                url: '/persetujuan/rencana-belanja/detail',
                templateUrl: 'views/pages/persetujuan-view/DetailRincian.html',
                ncyBreadcrumb: {
                    label: 'Persetujuan / Rencana Belanja / Detail'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/persetujuan-controllers/DetailRincian.js']
                        });
                    }]
                }
            })
            .state('app.DetailPendapatanPersetujuan', {
                url: '/persetujuan/pendapatan/detail',
                templateUrl: 'views/pages/persetujuan-view/pendapatan/detail-pendapatan-list.html',
                ncyBreadcrumb: {
                    label: 'Persetujuan / Pendapatan / Detail'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/persetujuan-controllers/detail-pendapatan.js']
                        });
                    }]
                }
            })
            .state('app.DetailRincianPendapatanPersetujuan', {
                url: '/persetujuan/pendapatan/rincian/detail',
                templateUrl: 'views/pages/persetujuan-view/pendapatan/detail-rincian-pendapatan.html',
                ncyBreadcrumb: {
                    label: 'Persetujuan / Pendapatan / Rincian / Detail'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/persetujuan-controllers/detail-pendapatan.js']
                        });
                    }]
                }
            })
            .state('app.DetailAkbPendapatanPersetujuan', {
                url: '/persetujuan/pendapatan/akb/detail',
                templateUrl: 'views/pages/persetujuan-view/pendapatan/detail-akb-pendapatan.html',
                ncyBreadcrumb: {
                    label: 'Persetujuan / Pendapatan / AKB / Detail'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/persetujuan-controllers/detail-pendapatan.js']
                        });
                    }]
                }
            })
            .state('app.DetailKegiatanPersetujuan', {
                url: '/persetujuan/kegiatan/detail',
                templateUrl: 'views/pages/persetujuan-view/kegiatan/detail-kegiatan-list.html',
                ncyBreadcrumb: {
                    label: 'Persetujuan / Kegiatan / Detail'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/persetujuan-controllers/kegiatan/detail-kegiatan.js']
                        });
                    }]
                }
            })
            .state('app.persetujuan-kegiatan-tab-kegiatan', {
                url: '/kegiatan/detail',
                templateUrl: 'views/pages/persetujuan-view/kegiatan/detail-tab-kegiatan.html',
                ncyBreadcrumb: {
                    label: 'Kegiatan / Detail'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/persetujuan-controllers/kegiatan/detail-kegiatan-tab-kegiatan.js']
                        });
                    }]
                }
            })
            .state('app.persetujuan-kegiatan-tab-komponen', {
                url: '/kegiatan/komponen/detail',
                templateUrl: 'views/pages/persetujuan-view/kegiatan/detail-tab-komponen.html',
                ncyBreadcrumb: {
                    label: 'Kegiatan / Komponen / Detail'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/persetujuan-controllers/kegiatan/detail-kegiatan-tab-komponen.js']
                        });
                    }]
                }
            })
            .state('app.persetujuan-kegiatan-tab-rpa', {
                url: '/kegiatan/komponen/rpa/detail',
                templateUrl: 'views/pages/persetujuan-view/kegiatan/detail-tab-rpa-komponen.html',
                ncyBreadcrumb: {
                    label: 'Kegiatan / Komponen/ RPA / Detail'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/persetujuan-controllers/kegiatan/detail-kegiatan-tab-rpa.js']
                        });
                    }]
                }
            })
            .state('app.DetailSkpd', {
                url: '/persetujuan/kegiatan/skp/detail',
                templateUrl: 'views/pages/persetujuan-view/DetailSkpd.html',
                ncyBreadcrumb: {
                    label: 'Persetujuan / Kegiatan / SKP / Detail'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/persetujuan-controllers/DetailSkpd.js']
                        });
                    }]
                }
            })
            .state('app.DetailKomponenPersetujuan', {
                url: '/persetujuan/kegiatan/komponen/detail',
                templateUrl: 'views/pages/persetujuan-view/DetailKomponenPersetujuan.html',
                ncyBreadcrumb: {
                    label: 'Persetujuan / Kegiatan / Komponen / Detail'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/persetujuan-controllers/DetailKomponenPersetujuan.js']
                        });
                    }]
                }
            })
            .state('app.DetailKasPersetujuan', {
                url: '/persetujuan/kas-blud/detail',
                templateUrl: 'views/pages/persetujuan-view/DetailKasPersetujuan.html',
                ncyBreadcrumb: {
                    label: 'Persetujuan / KAS BLUD / Detail '
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/persetujuan-controllers/DetailKasPersetujuan.js']
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
                templateUrl: 'views/pages/kegiatan/kegiatan.html',
                ncyBreadcrumb: {
                    label: 'Daftar Kegiatan'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/kegiatan-controllers/kegiatan.js']
                        });
                    }]
                }
            })
            .state('app.tambah-kegiatan', {
                url: '/kegiatan/tambah',
                templateUrl: 'views/pages/kegiatan/tab-kegiatan.html',
                ncyBreadcrumb: {
                    label: 'Tambah Kegiatan'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/kegiatan-controllers/tab-kegiatan.js']
                        });
                    }]
                }
            })
            .state('app.komponen-kegiatan', {
                url: '/kegiatan/komponen',
                templateUrl: 'views/pages/kegiatan/tab-komponen.html',
                ncyBreadcrumb: {
                    label: 'Komponen Kegiatan'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/kegiatan-controllers/tab-komponen.js']
                        });
                    }]
                }
            })
            .state('app.rpa-komponen-kegiatan', {
                url: '/kegiatan/rpa',
                templateUrl: 'views/pages/kegiatan/tab-rpa-komponen.html',
                ncyBreadcrumb: {
                    label: 'RPA Per Komponen'
                },
                resolve: {
                    loadMyCtrl: ['$ocLazyLoad', function ($ocLazyLoad) {
                        // you can lazy load files for an existing module
                        return $ocLazyLoad.load({
                            files: ['js/controllers/kegiatan-controllers/tab-rpa-komponen.js']
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
