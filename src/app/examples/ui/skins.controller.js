(function() {
    'use strict';

    angular
        .module('app.examples.ui')
        .controller('SkinsUIController', SkinsUIController);

    /* @ngInject */
    function SkinsUIController($cookies, $window, cmiSkins, cmiTheming) {
        var vm = this;
        vm.elementColors = {
            logo: '',
            sidebar: '',
            content: '',
            toolbar: ''
        };
        vm.skins = cmiSkins.getSkins();
        vm.selectedSkin = cmiSkins.getCurrent();
        vm.trySkin = trySkin;
        vm.updatePreview = updatePreview;

        //////////////////////

        function trySkin() {
            if(vm.selectedSkin !== cmiSkins.getCurrent()) {
                $cookies.put('calmapit-skin',angular.toJson({
                    skin: vm.selectedSkin.id
                }));
                $window.location.reload();
            }
        }


        function updatePreview() {
            for(var element in vm.elementColors) {
                var theme = cmiTheming.getTheme(vm.selectedSkin.elements[element]);
                var hue = angular.isUndefined(theme.colors.primary.hues.default) ? '500' : theme.colors.primary.hues.default;
                var color = cmiTheming.getPaletteColor(theme.colors.primary.name, hue);
                vm.elementColors[element] = cmiTheming.rgba(color.value);
            }
        }

        // init

        updatePreview();
    }
})();