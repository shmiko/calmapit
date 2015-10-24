(function() {
    'use strict';

    angular
        .module('calmapit.components')
        .directive('cmiMenu', cmiMenuDirective);

    /* @ngInject */
    function cmiMenuDirective($location, $mdTheming, cmiTheming) {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            rescmict: 'E',
            template: '<md-content><cmi-menu-item ng-repeat="item in cmiMenuController.menu | orderBy:\'priority\'" item="::item"></cmi-menu-item></md-content>',
            scope: {},
            controller: cmiMenuController,
            controllerAs: 'cmiMenuController',
            link: link
        };
        return directive;

        function link($scope, $element) {
            $mdTheming($element);
            var $mdTheme = $element.controller('mdTheme'); //eslint-disable-line

            var menuColor = cmiTheming.getThemeHue($mdTheme.$mdTheme, 'primary', 'default');
            var menuColorRGBA = cmiTheming.rgba(menuColor.value);
            $element.css({ 'background-color': menuColorRGBA });
            $element.children('md-content').css({ 'background-color': menuColorRGBA });
        }
    }

    /* @ngInject */
    function cmiMenuController(cmiMenu) {
        var cmiMenuController = this;
        // get the menu and order it
        cmiMenuController.menu = cmiMenu.menu;
    }
})();
