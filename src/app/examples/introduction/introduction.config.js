(function() {
    'use strict';

    angular
        .module('app.examples.introduction')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, cmiMenuProvider) {
        // setup translations path
        $translatePartialLoaderProvider.addPart('app/examples/introduction');

        // add routes
        $stateProvider
        .state('calmapit.admin-default.introduction', {
            url: '/introduction',
            templateUrl: 'app/examples/introduction/introduction.tmpl.html',
            controller: 'IntroductionController',
            controllerAs: 'vm'
        })
        .state('hexback', {
            url: '/hexback',
            templateUrl: 'app/examples/introduction/hexback.html'
            // controller: 'IntroductionController',
            // controllerAs: 'vm'
        });

        // add menu to calmapit
        cmiMenuProvider.addMenu({
            name: 'MENU.INTRODUCTION.INTRODUCTION',
            state: 'calmapit.admin-default.introduction',
            type: 'link',
            icon: 'zmdi zmdi-info-outline',
            priority: 0.1
        });
        cmiMenuProvider.addMenu({
            type: 'divider',
            priority: 0.2
        });
    }
})();