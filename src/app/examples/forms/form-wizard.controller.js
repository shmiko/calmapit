(function() {
    'use scmict';

    angular
        .module('app.examples.forms')
        .controller('FormWizardController', FormWizardController);

    /* @ngInject */
    function FormWizardController() {
        var vm = this;
        vm.data = {};
    }
})();