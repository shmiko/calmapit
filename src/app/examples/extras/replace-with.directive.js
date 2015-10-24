(function() {
    'use scmict';

    angular
        .module('app.examples.extras')
        .directive('replaceWith', replaceWith);

    /* @ngInject */
    function replaceWith() {
        // Usage:
        //
        // Creates:
        //
        var directive = {
            link: link,
            rescmict: 'A'
        };
        return directive;

        function link(scope, element, attrs) {
            attrs.$observe('replaceWith', function(value) {
                if (value) {
                    element.replaceWith(angular.isUndefined(value) ? '' : value);
                }
            });
        }
    }
})();