(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('ColorsController', ColorsController);

    /* @ngInject */
    function ColorsController($mdDialog, cmiTheming) {
        var vm = this;
        vm.colourRGBA = colourRGBA;
        vm.palettes = cmiTheming.palettes;
        vm.selectPalette = selectPalette;

        function colourRGBA(value) {
            var rgba = cmiTheming.rgba(value);
            return {
                'background-color': rgba
            };
        }

        function selectPalette($event, name, palette) {
            $mdDialog.show({
                controller: 'ColorDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/ui/color-dialog.tmpl.html',
                targetEvent: $event,
                locals: {
                    name: name,
                    palette: palette
                },
                clickOutsideToClose: true
            })
            .then(function(answer) {
                vm.alert = 'You said the information was "' + answer + '".';
            }, cancelDialog);

            function cancelDialog() {
                vm.alert = 'You cancelled the dialog.';
            }
        }
    }
})();