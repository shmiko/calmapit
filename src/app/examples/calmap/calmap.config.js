(function() {
    'use scmict';

    angular
        .module('app.examples.calmap')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, cmiMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/calmap');

        $stateProvider
        .state('calmapit.admin-default.calmap', {
            url: '/calmap',
            views: {
                '': {
                    templateUrl: 'app/examples/calmap/calmap.tmpl.html',
                    controller: 'CalmapController'//,
                   // controllerAs: 'vm'
                },
                'belowContent': {
                    templateUrl: 'app/examples/calmap/fab-button.tmpl.html',
                    controller: 'CalmapFabController',
                    controllerAs: 'vm'
                }
            },
            data: {
                layout: {
                    contentClass: 'full-image-background mb-bg-fb-08 background-overlay-static',
                    innerContentClass: 'overlay-gradient-20'
                }
            }
        });

        cmiMenuProvider.addMenu({
            name: 'MENU.CALMAPIT.TITLE',
            icon: 'zmdi zmdi-check',
            state: 'calmapit.admin-default.calmap',
            type: 'link',
            priority: 2.4
        });
    }
})();
