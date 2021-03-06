(function() {
    'use strict';

    angular
        .module('calmapit.components')
        .controller('DefaultToolbarController', DefaultToolbarController);

    /* @ngInject */
    function DefaultToolbarController($scope, $mdMedia, $translate, $state, $element, $filter, $mdUtil, $mdSidenav, $mdToast, $timeout, cmiBreadcrumbsService, cmiSettings, cmiLayout) {
        var vm = this;
        vm.breadcrumbs = cmiBreadcrumbsService.breadcrumbs;
        vm.emailNew = false;
        vm.languages = cmiSettings.languages;
        vm.openSideNav = openSideNav;
        vm.hideMenuButton = hideMenuButton;
        vm.switchLanguage = switchLanguage;
        vm.toggleNotificationsTab = toggleNotificationsTab;

        // initToolbar();

        ////////////////

        function openSideNav(navID) {
            $mdUtil.debounce(function(){
                $mdSidenav(navID).toggle();
            }, 300)();
        }

        function switchLanguage(languageCode) {
            $translate.use(languageCode)
            .then(function() {
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('MESSAGES.LANGUAGE_CHANGED'))
                    .position('bottom right')
                    .hideDelay(500)
                );
            });
        }

        function hideMenuButton() {
            return cmiLayout.layout.sideMenuSize !== 'hidden' && $mdMedia('gt-md');
        }

        function toggleNotificationsTab(tab) {
            $scope.$parent.$broadcast('cmiSwitchNotificationTab', tab);
            vm.openSideNav('notifications');
        }

        $scope.$on('newMailNotification', function(){
            vm.emailNew = true;
        });
    }
})();