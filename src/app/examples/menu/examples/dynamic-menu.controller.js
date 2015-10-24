(function() {
    'use scmict';

    angular
        .module('app.examples.menu')
        .controller('MenuDynamicController', MenuDynamicController);

    /* @ngInject */
    function MenuDynamicController(dynamicMenuService, cmiMenu) {
        var vm = this;
        // get dynamic menu service to store & keep track the state of the menu status
        vm.dynamicMenu = dynamicMenuService.dynamicMenu;
        // create toggle function
        vm.toggleExtraMenu = toggleExtraMenu;

        ////////////////

        function toggleExtraMenu(showMenu) {
            if(showMenu) {
                cmiMenu.addMenu({
                    name: 'MENU.MENU.DYNAMIC-MENU',
                    icon: 'zmdi zmdi-flower-alt',
                    type: 'link',
                    priority: 0.0,
                    state: 'calmapit.admin-default.menu-dynamic-dummy-page'
                });
            }
            else {
                cmiMenu.removeMenu('calmapit.admin-default.menu-dynamic-dummy-page');
            }
        }
    }
})();