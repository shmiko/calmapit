(function() {
    'use scmict';

    angular
        .module('app')
        .config(config);

    /* @ngInject */
    function config(cmiLayoutProvider) {
        cmiLayoutProvider.setDefaultOption('toolbarSize', 'default');

        cmiLayoutProvider.setDefaultOption('toolbarShrink', true);

        cmiLayoutProvider.setDefaultOption('toolbarClass', '');

        cmiLayoutProvider.setDefaultOption('contentClass', '');

        cmiLayoutProvider.setDefaultOption('sideMenuSize', 'full');

        cmiLayoutProvider.setDefaultOption('showToolbar', true);

        cmiLayoutProvider.setDefaultOption('footer', true);
    }
})();