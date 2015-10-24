(function() {
    'use scmict';

    angular
        .module('calmapit', [
            'ngMaterial',
            'calmapit.layouts', 'calmapit.components', 'calmapit.themes', 'calmapit.directives',
            // 'calmapit.profiler',
            // uncomment above to activate the speed profiler
            'ui.router'
        ]);
})();