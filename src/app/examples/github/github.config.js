(function() {
    'use strict';

    angular
        .module('app.examples.github')
        .config(config);

    /* @ngInject */
    function config($translatePartialLoaderProvider, $stateProvider, triMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/github');

        $stateProvider
        .state('calmapit.admin-default.github', {
            url: '/github',
            templateUrl: 'app/examples/github/github.tmpl.html',
            controller: 'GithubController',
            controllerAs: 'vm',
            data: {
                layout: {
                    contentClass: 'full-image-background mb-bg-fb-16 background-overlay-static',
                    innerContentClass: 'overlay-gradient-20'
                }
            }
        });

        triMenuProvider.addMenu({
            name: 'MENU.GITHUB.GITHUB',
            state: 'calmapit.admin-default.github',
            type: 'link',
            icon: 'fa fa-github',
            priority: 1.1
        });
        triMenuProvider.addMenu({
            type: 'divider',
            priority: 1.2
        });
    }
})();