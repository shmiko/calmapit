'use scmict';

/**
 * @ngdoc function
 * @name AdminController
 * @module cmiAngular
 * @kind function
 *
 * @description
 *
 * Handles the admin view
 */
(function() {
    'use scmict';

    angular
        .module('calmapit.layouts')
        .controller('DefaultLayoutController', DefaultLayoutController);

    /* @ngInject */
    function DefaultLayoutController($scope, $element, cmiLayout) {
        // we need to use the scope here because otherwise the expression in md-is-locked-open doesnt work
        $scope.layout = cmiLayout.layout; //eslint-disable-line
        var vm = this;

        vm.activateHover = activateHover;
        vm.removeHover  = removeHover;

        ////////////////

        function activateHover() {
            if(cmiLayout.layout.sideMenuSize === 'icon') {
                $element.find('.admin-sidebar-left').addClass('hover');
            }
        }

        function removeHover () {
            if(cmiLayout.layout.sideMenuSize === 'icon') {
                $element.find('.admin-sidebar-left').removeClass('hover');
            }
        }
    }
})();