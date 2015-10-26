(function() {
    'use strict';

    angular
        .module('app.examples.calendar')
        .controller('CalendarController', CalendarController);

    /* @ngInject */
    function CalendarController($scope, $rootScope, $mdDialog, $mdToast, $filter, $element, cmiTheming, cmiLayout, uiCalendarConfig) {
        var vm = this;
        var date = new Date();
        var d = date.getDate();
        var m = date.getMonth();
        var y = date.getFullYear();
        vm.addEvent = addEvent;
        vm.calendarOptions = {
            contentHeight: 'auto',
            selectable: true,
            editable: true,
            header: false,
            // url: "http://www.google.com/calendar/feeds/15dcnca6hga2rqna9f651qc5d0@group.calendar.google.com",
            // className: 'gcal-event'//,           // an option!
            
            googleCalendarApiKey: 'AIzaSyCDyuMEpvjNHZS8ACf1rJPhxMOODrfJyL4',
            events: {
                googleCalendarId: 'http://www.google.com/calendar/feeds/15dcnca6hga2rqna9f651qc5d0@group.calendar.google.com'
            },
            viewRender: function(view) {
                // change day
                vm.currentDay = view.calendar.getDate();
                vm.currentView = view.name;
                // update toolbar with new day for month name
                $rootScope.$broadcast('calendar-changeday', vm.currentDay);
                // update background image for month
                cmiLayout.layout.contentClass = 'calendar-background-image background-overlay-static overlay-gradient-10 calendar-background-month-' + vm.currentDay.month();
            },
            dayClick: function(date, jsEvent, view) { //eslint-disable-line
                vm.currentDay = date;
            },
            eventClick: function(calEvent, jsEvent, view) { //eslint-disable-line
                $mdDialog.show({
                    controller: 'EventDialogController',
                    controllerAs: 'vm',
                    templateUrl: 'app/examples/calendar/event-dialog.tmpl.html',
                    targetEvent: jsEvent,
                    focusOnOpen: false,
                    locals: {
                        dialogData: {
                            title: 'CALENDAR.EDIT-EVENT',
                            confirmButtonText: 'CALENDAR.SAVE'
                        },
                        event: calEvent,
                        edit: true
                    }
                })
                .then(function(event) {
                    var toastMessage = 'CALENDAR.EVENT.EVENT-UPDATED';
                    if(angular.isDefined(event.deleteMe) && event.deleteMe === true) {
                        // remove the event from the calendar
                        uiCalendarConfig.calendars['calmapit-calendar'].fullCalendar('removeEvents', event._id);
                        // change toast message
                        toastMessage = 'CALENDAR.EVENT.EVENT-DELETED';
                    }
                    else {
                        // update event
                        uiCalendarConfig.calendars['calmapit-calendar'].fullCalendar('updateEvent', event);
                    }

                    // pop a toast
                    $mdToast.show(
                        $mdToast.simple()
                        .content($filter('translate')(toastMessage))
                        .position('bottom right')
                        .hideDelay(2000)
                    );
                });
            }
        };

        vm.viewFormats = {
            'month': 'MMMM YYYY',
            'agendaWeek': 'w',
            'agendaDay': 'Do MMMM YYYY'
        };

        vm.events = [];

        vm.events = {
            googleCalendarApiKey: 'AIzaSyCDyuMEpvjNHZS8ACf1rJPhxMOODrfJyL4',
            url: "http://www.google.com/calendar/feeds/15dcnca6hga2rqna9f651qc5d0@group.calendar.google.com",
            className: 'gcal-event'//,           // an option!
            //currentTimezone: 'America/Chicago' // an option!
        };

        /* event source that contains custom events on the scope */
        vm.events3 = [
            {title: 'All Day Event',start: new Date(y, m, 1)},
            {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
            {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
            {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
            {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
        ];

        vm.eventSources2 = [{
            events2: [{
                googleCalendarApiKey: 'AIzaSyCDyuMEpvjNHZS8ACf1rJPhxMOODrfJyL4',
                url: 'http://www.google.com/calendar/feeds/15dcnca6hga2rqna9f651qc5d0@group.calendar.google.com',
                className: 'gcal-event',           // an option!
                currentTimezone: 'America/Chicago' // an option!
            }]
        }];

        vm.eventsF = function (start, end, timezone, callback) {
            var s = new Date(start).getTime() / 1000;
            var e = new Date(end).getTime() / 1000;
            var m = new Date(start).getMonth();
            var events = [{title: 'Feed Me ' + m,start: s + (50000),end: s + (100000),allDay: false, className: ['customFeed']}];
            callback(events);
        };

        vm.calEventsExt = {
            color: '#f00',
            textColor: 'yellow',
            events: [
                {type:'party',title: 'Lunch',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Lunch 2',start: new Date(y, m, d, 12, 0),end: new Date(y, m, d, 14, 0),allDay: false},
                {type:'party',title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
            ]
        };

        vm.renderCalender = function(calendar) {
            $timeout(function() {
                if(uiCalendarConfig.calendars[calendar]){
                    uiCalendarConfig.calendars[calendar].fullCalendar('render');
                }
            });
        };

        vm.uiConfig = {
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

        function addEvent(event, $event) {
            var inAnHour = moment(vm.currentDay).add(1, 'h');
            $mdDialog.show({
                controller: 'EventDialogController',
                controllerAs: 'vm',
                templateUrl: 'app/examples/calendar/event-dialog.tmpl.html',
                targetEvent: $event,
                focusOnOpen: false,
                locals: {
                    dialogData: {
                        title: 'CALENDAR.ADD-EVENT',
                        confirmButtonText: 'CALENDAR.ADD'
                    },
                    event: {
                        title: $filter('translate')('CALENDAR.EVENT.NEW-EVENT'),
                        allDay: false,
                        start: vm.currentDay,
                        end: inAnHour,
                        palette: 'cyan',
                        stick: true
                    },
                    edit: false
                }
            })
            .then(function(event) {
                vm.eventSources[0].events.push(event);
                $mdToast.show(
                    $mdToast.simple()
                    .content($filter('translate')('CALENDAR.EVENT.EVENT-CREATED'))
                    .position('bottom right')
                    .hideDelay(2000)
                );
            });
        }

        //function createRandomEvents(number, startDate, endDate) {
        //    var eventNames = ['Pick up the kids', 'Remember the milk', 'Meeting with Morris', 'Car service',  'Go Surfing', 'Party at Christos house', 'Beer Oclock', 'Festival tickets', 'Laundry!', 'Haircut appointment', 'Walk the dog', 'Dentist :(', 'Board meeting', 'Go fishing'];
        //    var locationNames = ['London', 'New York', 'Paris', 'Burnley'];
        //    for(var x = 0; x < number; x++) {
        //        var randomMonthDate = randomDate(startDate, endDate);
        //        var inAnHour = moment(randomMonthDate).add(1, 'h');
        //        var randomEvent = Math.floor(Math.random() * (eventNames.length - 0));
        //        var randomLocation = Math.floor(Math.random() * (locationNames.length - 0));
        //        var randomPalette = pickRandomProperty(cmiTheming.palettes);
        //        //vm.eventSources{
        //        //    googleCalendarApiKey: 'AIzaSyCDyuMEpvjNHZS8ACf1rJPhxMOODrfJyL4',
        //        //    url: 'http://www.google.com/calendar/feeds/15dcnca6hga2rqna9f651qc5d0@group.calendar.google.com',
        //        //    className: 'gcal-event'};
        //        vm.eventSources[0].events.push({
        //            title: eventNames[randomEvent],
        //            allDay: false,
        //            start: randomMonthDate,
        //            end: inAnHour,
        //            description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis, fugiat! Libero ut in nam cum architecto error magnam, quidem beatae deleniti, facilis perspiciatis modi unde nostrum ea explicabo a adipisci!',
        //            location: locationNames[randomLocation],
        //            backgroundColor: cmiTheming.rgba(cmiTheming.palettes[randomPalette]['500'].value),
        //            borderColor: cmiTheming.rgba(cmiTheming.palettes[randomPalette]['500'].value),
        //            textColor: cmiTheming.rgba(cmiTheming.palettes[randomPalette]['500'].contrast),
        //            palette: randomPalette
        //        });
        //    }
        //}



        // listeners

        $scope.$on('addEvent', addEvent);

        // create 10 random events for the month
        //createRandomEvents(100, moment().startOf('year'), moment().endOf('year'));

        //function randomDate(start, end) {
        //    var startNumber = start.toDate().getTime();
        //    var endNumber = end.toDate().getTime();
        //    var randomTime = Math.random() * (endNumber - startNumber) + startNumber;
        //    return moment(randomTime);
        //}

        //function pickRandomProperty(obj) {
        //    var result;
        //    var count = 0;
        //    for (var prop in obj) {
        //        if (Math.random() < 1/++count) {
        //            result = prop;
        //        }
        //    }
        //    return result;
        //}

        //vm.eventSources = [vm.eventSources1, vm.eventSources2];
        vm.eventSources = [vm.events];
    }
})();
