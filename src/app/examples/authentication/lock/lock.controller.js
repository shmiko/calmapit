(function() {
    'use strict';

    angular
        .module('app.examples.authentication')
        .controller('LockController', LockController);

    /* @ngInject */
    function LockController($state, cmiSettings) {
        var vm = this;
        vm.loginClick = loginClick;
        vm.user = {
            name: 'Morris Onions',
            email: 'info@shmik.com',
            password: ''
        };
        vm.cmiSettings = cmiSettings;

        ////////////////

        // controller to handle login check
        function loginClick() {
            // user logged in ok so goto the dashboard
            $state.go('calmapit.admin-default.dashboard-general');
        }
    }
})();