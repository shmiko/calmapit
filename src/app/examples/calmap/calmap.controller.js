(function() {
    'use scmict';

    angular
        .module('app.examples.calmap')
        .controller('CalmapController', CalmapController);

    /* @ngInject */
    function CalmapController($scope, $compile, $timeout, uiCalendarConfig) {
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();

        $scope.changeTo = 'English';
        /* event source that pulls from google.com */
        $scope.eventSource = {
            googleCalendarApiKey: 'AIzaSyCDyuMEpvjNHZS8ACf1rJPhxMOODrfJyL4',
            url: "http://www.google.com/calendar/feeds/15dcnca6hga2rqna9f651qc5d0@group.calendar.google.com",
            className: 'gcal-event'//,           // an option!
            //currentTimezone: 'America/Chicago' // an option!
        };
        /* event source that contains custom events on the scope */
        $scope.events = [
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];
        /* event source that calls a function on every view switch */
        $scope.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
            callback(events);
        };

        $scope.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
                {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            ]
        };
        /* alert on eventClick */
        $scope.alertOnEventClick = function( date, jsEvent, view){
            $scope.alertMessage = (date.title + ' was clicked ');
        };
        /* alert on Drop */
        $scope.alertOnDrop = function(event, delta, revertFunc, jsEvent, ui, view){
            $scope.alertMessage = ('Event Dropped to make dayDelta ' + delta);
        };
        /* alert on Resize */
        $scope.alertOnResize = function(event, delta, revertFunc, jsEvent, ui, view ){
            $scope.alertMessage = ('Event Resized to make dayDelta ' + delta);
        };
        /* add and removes an event source of choice */
        $scope.addRemoveEventSource = function(sources,source) {
            var canAdd = 0;
            angular.forEach(sources,function(value, key){
                if(sources[key] === source){
                    sources.splice(key,1);
                    canAdd = 1;
                }
            });
            if(canAdd === 0){
                sources.push(source);
            }
        };
        /* add custom event*/
        $scope.addEvent = function() {
            $scope.events.push({
                title: 'Open Sesame',
                start: new Date(y, m, 28),
                end: new Date(y, m, 29),
                className: ['openSesame']
            });
        };
        /* remove event */
        $scope.remove = function(index) {
            $scope.events.splice(index,1);
        };
        /* Change View */
        $scope.changeView = function(view,calendar) {
            uiCalendarConfig.calendars[calendar].fullCalendar('changeView',view);
        };
        /* Change View */
        $scope.renderCalender = function(calendar) {
            $timeout(function() {
                if(uiCalendarConfig.calendars[calendar]){
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            });
        };
        /* Render Tooltip */
        $scope.eventRender = function( event, element, view ) {
            element.attr({'tooltip': event.title,
                'tooltip-append-to-body': true});
            $compile(element)($scope);
        };
        /* config object */
        $scope.uiConfig = {
            calendar:{
                height: 450,
                editable: true,
                header:{
                    left: 'title',
                    center: '',
                    right: 'today prev,next'
                },
                eventClick: $scope.alertOnEventClick,
                eventDrop: $scope.alertOnDrop,
                eventResize: $scope.alertOnResize,
                eventRender: $scope.eventRender
            }
        };

        $scope.changeLang = function() {
            if($scope.changeTo === 'Hungarian'){
                $scope.uiConfig.calendar.dayNames = ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"];
                $scope.uiConfig.calendar.dayNamesShort = ["Vas", "Hét", "Kedd", "Sze", "Csüt", "Pén", "Szo"];
                $scope.changeTo= 'English';
            } else {
                $scope.uiConfig.calendar.dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
                $scope.uiConfig.calendar.dayNamesShort = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
                $scope.changeTo = 'Hungarian';
            }
        };
        /* event sources array*/
        $scope.eventSources = [$scope.events, $scope.eventSource, $scope.eventsF];
        $scope.eventSources2 = [$scope.calEventsExt, $scope.eventsF, $scope.events];
        //var vm = this;
        //vm.calmaps = [
        //    {description: 'Material Design', priority: 'high', selected: true},
        //    {description: 'Install espresso machine', priority: 'high', selected: false},
        //    {description: 'Deploy to Server', priority: 'medium', selected: true},
        //    {description: 'Cloud Sync', priority: 'medium', selected: false},
        //    {description: 'Test Configurations', priority: 'low', selected: false},
        //    {description: 'Validate markup', priority: 'low', selected: false},
        //    {description: 'Debug javascript', priority: 'low', selected: true},
        //    {description: 'Arrange meeting', priority: 'low', selected: true}
        //];
        //vm.orderCalmaps = orderCalmaps;
        //vm.removeCalmap = removeCalmap;
        //
        ////////////////////////////
        //
        //function orderCalmaps(task) {
        //    switch(task.priority){
        //        case 'high':
        //            return 1;
        //        case 'medium':
        //            return 2;
        //        case 'low':
        //            return 3;
        //        default: // no priority set
        //            return 4;
        //    }
        //}
        //
        //function removeCalmap(calmap){
        //    for(var i = vm.calmaps.length - 1; i >= 0; i--) {
        //        if(vm.calmaps[i] === calmap) {
        //            vm.calmaps.splice(i, 1);
        //        }
        //    }
        //}
        //
        //// watches
        //
        //$scope.$on('addCalmap', function( ev ){
        //    $mdDialog.show({
        //        templateUrl: 'app/examples/calmap/add-calmap-dialog.tmpl.html',
        //        targetEvent: ev,
        //        controller: 'DialogController',
        //        controllerAs: 'vm'
        //    })
        //    .then(function(answer) {
        //        vm.calmaps.push(answer);
        //    });
        //});
    }
})();
