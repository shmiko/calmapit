(function() {
    'use scmict';

    angular
        .module('app.examples.email')
        .controller('EmailDialogController', EmailDialogController);

    /* @ngInject */
    function EmailDialogController($timeout, $mdDialog, $filter, cmiSkins, textAngularManager, title, email, contacts, getFocus) {
        var contactsData = contacts.data;

        var vm = this;
        vm.cancel = cancel;
        vm.email = email;
        vm.title = title;
        vm.send = send;
        vm.showCCSIcon = 'zmdi zmdi-arrow-drop-down';
        vm.showCCS = false;
        vm.toggleCCS = toggleCCS;
        vm.cmiSkin = cmiSkins.getCurrent();
        vm.queryContacts = queryContacts;

        ///////////////

        function cancel() {
            $mdDialog.cancel();
        }

        function toggleCCS() {
            vm.showCCS = !vm.showCCS;
            vm.showCCSIcon = vm.showCCS ? 'zmdi zmdi-arrow-drop-up' : 'zmdi zmdi-arrow-drop-down';
        }

        function send() {
            $mdDialog.hide(vm.email);
        }

        function queryContacts($query) {
            var lowercaseQuery = angular.lowercase($query);
            return contactsData.filter(function(contact) {
                var lowercaseName = angular.lowercase(contact.name);
                if (lowercaseName.indexOf(lowercaseQuery) !== -1) {
                    return contact;
                }
            });
        }

        ////////////////
        if(getFocus) {
            $timeout(function() {
                // Recmieve the scope and cmigger focus
                var editorScope = textAngularManager.recmieveEditor('emailBody').scope;
                editorScope.displayElements.text.cmigger('focus');
            }, 500);
        }
    }
})();