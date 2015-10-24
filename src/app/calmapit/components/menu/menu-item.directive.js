(function() {
    'use strict';

    angular
        .module('calmapit.components')
        .directive('cmiMenuItem', cmiMenuItemDirective);

    /* @ngInject */
    function cmiMenuItemDirective() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            rescmict: 'E',
            require: '^cmiMenu',
            scope: {
                item: '='
            },
            // replace: true,
            template: '<div ng-include="::cmiMenuItem.item.template"></div>',
            controller: cmiMenuItemController,
            controllerAs: 'cmiMenuItem',
            bindToController: true
        };
        return directive;
    }

    /* @ngInject */
    function cmiMenuItemController($scope, $mdSidenav, $state, $filter, cmiBreadcrumbsService) {
        var cmiMenuItem = this;
        // load a template for this directive based on the type ( link | dropdown )
        cmiMenuItem.item.template = 'app/calmapit/components/menu/menu-item-' + cmiMenuItem.item.type + '.tmpl.html';

        switch(cmiMenuItem.item.type) {
            case 'dropdown':
                // if we have kids reorder them by priority
                cmiMenuItem.item.children = $filter('orderBy')(cmiMenuItem.item.children, 'priority');
                cmiMenuItem.toggleDropdownMenu = toggleDropdownMenu;
                // add a check for open event
                $scope.$on('toggleDropdownMenu', function(event, item, open) {
                    // if this is the item we are looking for
                    if(cmiMenuItem.item === item) {
                        cmiMenuItem.item.open = open;
                    }
                    else {
                        cmiMenuItem.item.open = false;
                    }
                });
                // this event is emitted up the tree to open parent menus
                $scope.$on('openParents', function() {
                    // openParents event so open the parent item
                    cmiMenuItem.item.open = true;
                    // also add this to the breadcrumbs
                    cmiBreadcrumbsService.addCrumb(cmiMenuItem.item);
                });
                break;
            case 'link':
                cmiMenuItem.openLink = openLink;

                // on init check if this is current menu
                checkItemActive($state.current.name, $state.params);

                $scope.$on('$stateChangeSuccess', function(event, toState, toParams) {
                    checkItemActive(toState.name, toParams);
                });
                break;
        }

        function checkItemActive() {
            // first check if the state is the same
            cmiMenuItem.item.active = $state.includes(cmiMenuItem.item.state, cmiMenuItem.item.params);
            // if we are now the active item reset the breadcrumbs and open all parent dropdown items
            if(cmiMenuItem.item.active) {
                cmiBreadcrumbsService.reset();
                cmiBreadcrumbsService.addCrumb(cmiMenuItem.item);
                $scope.$emit('openParents');
            }
        }

        function toggleDropdownMenu() {
            $scope.$parent.$parent.$broadcast('toggleDropdownMenu', cmiMenuItem.item, !cmiMenuItem.item.open);
        }

        function openLink() {
            var params = angular.isUndefined(cmiMenuItem.item.params) ? {} : cmiMenuItem.item.params;
            $state.go(cmiMenuItem.item.state, params);
            cmiMenuItem.item.active = true;
            $mdSidenav('left').close();
        }
    }
})();