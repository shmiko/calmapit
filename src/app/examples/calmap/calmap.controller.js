(function() {
    'use strict';

    angular
        .module('app.examples.calmap')
        .controller('CalmapController', CalmapController);

    /* @ngInject */
    function CalmapController($scope, $state, $mdDialog) {
        var vm = this;
        vm.calmaps = [
            {description: 'Material Design', priority: 'high', selected: true},
            {description: 'Install espresso machine', priority: 'high', selected: false},
            {description: 'Deploy to Server', priority: 'medium', selected: true},
            {description: 'Cloud Sync', priority: 'medium', selected: false},
            {description: 'Test Configurations', priority: 'low', selected: false},
            {description: 'Validate markup', priority: 'low', selected: false},
            {description: 'Debug javascript', priority: 'low', selected: true},
            {description: 'Arrange meeting', priority: 'low', selected: true}
        ];
        vm.orderCalmaps = orderCalmaps;
        vm.removeCalmap = removeCalmap;

        //////////////////////////

        function orderCalmaps(task) {
            switch(task.priority){
                case 'high':
                    return 1;
                case 'medium':
                    return 2;
                case 'low':
                    return 3;
                default: // no priority set
                    return 4;
            }
        }

        function removeCalmap(calmap){
            for(var i = vm.calmaps.length - 1; i >= 0; i--) {
                if(vm.calmaps[i] === calmap) {
                    vm.calmaps.splice(i, 1);
                }
            }
        }

        // watches

        $scope.$on('addCalmap', function( ev ){
            $mdDialog.show({
                templateUrl: 'app/examples/calmap/add-calmap-dialog.tmpl.html',
                targetEvent: ev,
                controller: 'DialogController',
                controllerAs: 'vm'
            })
            .then(function(answer) {
                vm.calmaps.push(answer);
            });
        });
    }
})();
