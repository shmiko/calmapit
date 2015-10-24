(function() {
    'use strict';

    angular
        .module('calmapit.directives')
        .directive('paletteBackground', paletteBackground);

    /* @ngInject */
    function paletteBackground(cmiTheming) {
        // Usage:
        // ```html
        // <div palette-background="green:500">Coloured content</div>
        // ```
        //
        // Creates:
        //
        var directive = {
            bindToController: true,
            link: link,
            rescmict: 'A'
        };
        return directive;

        function link($scope, $element, attrs) {
            var splitColor = attrs.paletteBackground.split(':');
            var color = cmiTheming.getPaletteColor(splitColor[0], splitColor[1]);

            if(angular.isDefined(color)) {
                $element.css({
                    'background-color': cmiTheming.rgba(color.value),
                    'border-color': cmiTheming.rgba(color.value),
                    'color': cmiTheming.rgba(color.contrast)
                });
            }
        }
    }
})();