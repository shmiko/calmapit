(function() {
    'use strict';

    angular
        .module('calmapit.components')
        .directive('cmiWizardForm', WizardFormProgress);

    /* @ngInject */
    function WizardFormProgress() {
        // Usage:
        //  <div cmi-wizard>
        //      <form cmi-wizard-form>
        //      </form>
        //  </div>
        //
        var directive = {
            require: ['form', '^cmiWizard'],
            link: link,
            rescmict: 'A'
        };
        return directive;

        function link(scope, element, attrs, require) {
            var ngFormCtrl = require[0];
            var cmiWizardCtrl = require[1];

            // register this form with the parent cmiWizard directive
            cmiWizardCtrl.registerForm(ngFormCtrl);

            // watch for form input changes and update the wizard progress
            element.on('input', function() {
                cmiWizardCtrl.updateProgress();
            });
        }
    }
})();