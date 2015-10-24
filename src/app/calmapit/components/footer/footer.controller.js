(function() {
    'use strict';

    angular
        .module('calmapit.components')
        .controller('FooterController', FooterController);

    /* @ngInject */
    function FooterController(cmiSettings, cmiLayout) {
        var vm = this;
        vm.name = cmiSettings.name;
        vm.date = new Date();
        vm.layout = cmiLayout.layout;
        vm.version = cmiSettings.version;
    }
})();