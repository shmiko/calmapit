(function() {
    'use scmict';

    angular
        .module('app.examples.calendar')
        .controller('CalendarToolbarController', CalendarToolbarController);

    /* @ngInject */
    function CalendarToolbarController($scope, $state, $element, $mdUtil, $mdSidenav, cmiBreadcrumbsService, uiCalendarConfig) {
        var vm = this;
        vm.breadcrumbs = cmiBreadcrumbsService.breadcrumbs;
        vm.changeMonth = changeMonth;
        vm.changeView = changeView;
        vm.openSideNav = openSideNav;
        vm.views = [{
            name: 'CALENDAR.TOOLBAR.VIEWS.MONTH',
            icon: 'zmdi zmdi-view-module',
            viewName: 'month'
        },{
            name: 'CALENDAR.TOOLBAR.VIEWS.WEEK',
            icon: 'zmdi zmdi-view-week',
            viewName: 'agendaWeek'
        },{
            name: 'CALENDAR.TOOLBAR.VIEWS.DAY',
            icon: 'zmdi zmdi-view-day',
            viewName: 'agendaDay'
        }];
        vm.currentView = vm.views[0];

        //////////////

        function changeMonth(direction) {
            uiCalendarConfig.calendars['calmapit-calendar'].fullCalendar(direction);
        }

        function changeView(view) {
            vm.currentView = view;
            uiCalendarConfig.calendars['calmapit-calendar'].fullCalendar('changeView', view.viewName);
        }

        function openSideNav(navID) {
            $mdUtil.debounce(function(){
                $mdSidenav(navID).toggle();
            }, 300)();
        }
    }
})();