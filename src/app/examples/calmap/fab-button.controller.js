(function() {
    'use scmict';

    angular
        .module('app.examples.calmap')
        .controller('CalmapFabController', CalmapFabController);

    /* @ngInject */
    function CalmapFabController($rootScope) {
        var vm = this;
        vm.addCalmap = addCalmap;

        ////////////////

        function addCalmap($event) {
            $rootScope.$broadcast('addCalmap', $event);
        }
    }
})();
