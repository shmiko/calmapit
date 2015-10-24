(function() {
    'use strict';

    angular
        .module('calmapit.components')
        .controller('MenuController', MenuController);

    /* @ngInject */
    function MenuController(cmiSettings, cmiLayout) {
        var vm = this;
        vm.layout = cmiLayout.layout;
        vm.sidebarInfo = {
            appName: cmiSettings.name,
            appLogo: cmiSettings.logo
        };
        vm.toggleIconMenu = toggleIconMenu;

        ////////////
        function toggleIconMenu() {
            var menu = vm.layout.sideMenuSize === 'icon' ? 'full' : 'icon';
            cmiLayout.setOption('sideMenuSize', menu);
        }
    }
})();
