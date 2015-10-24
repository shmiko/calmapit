(function() {
    'use scmict';

    angular
        .module('calmapit.components')
        .service('cmiLoaderService', LoaderService);

    /* @ngInject */
    function LoaderService() {
        var vm = this;

        vm.status = {
            active: true
        };
        vm.setLoaderActive = setLoaderActive;

        ////////////////

        function setLoaderActive(active) {
            vm.status.active = active;
        }
    }
})();