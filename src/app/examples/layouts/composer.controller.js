(function() {
    'use strict';

    angular
        .module('app.examples.layouts')
        .controller('LayoutsComposerController', LayoutsComposerController);

    /* @ngInject */
    function LayoutsComposerController($rootScope, $filter, $document, cmiTheming, cmiLayout) {
        var vm = this;
        vm.allPagesCode = '';
        vm.updateOption = updateOption;
        vm.layout = cmiLayout.layout;
        vm.onePageCode = '';
        vm.options = {
            toolbarSizes: {
                'default': 'EXAMPLES.LAYOUTS.OPTIONS.TOOLBAR-SIZES.DEFAULT',
                'md-medium-tall': 'EXAMPLES.LAYOUTS.OPTIONS.TOOLBAR-SIZES.MEDIUM',
                'md-tall': 'EXAMPLES.LAYOUTS.OPTIONS.TOOLBAR-SIZES.TALL'
            },
            toolbarBackgrounds: {
            },
            sideMenuSizes: {
                'hidden': 'EXAMPLES.LAYOUTS.OPTIONS.SIDEMENU-SIZES.HIDDEN',
                'icon': 'EXAMPLES.LAYOUTS.OPTIONS.SIDEMENU-SIZES.ICONS',
                'full': 'EXAMPLES.LAYOUTS.OPTIONS.SIDEMENU-SIZES.FULL'
            }
        };

        ////////////////

        function createCodeSnippets() {
            vm.allPagesCode =
                'cmiLayoutProvider.setDefaultOption(\'toolbarSize\', \'' + vm.layout.toolbarSize + '\');\n' +
                'cmiLayoutProvider.setDefaultOption(\'toolbarShrink\', ' + vm.layout.toolbarShrink + ');\n' +
                'cmiLayoutProvider.setDefaultOption(\'toolbarClass\', \'' + vm.layout.toolbarClass + '\');\n' +
                'cmiLayoutProvider.setDefaultOption(\'contentClass\', \'' + vm.layout.contentClass + '\');\n' +
                'cmiLayoutProvider.setDefaultOption(\'sideMenuSize\', \'' + vm.layout.sideMenuSize + '\');\n' +
                'cmiLayoutProvider.setDefaultOption(\'footer\', ' + vm.layout.footer + ');\n';

            vm.onePageCode =
                '.state(\'calmapit.admin-default.my-state\', {' + '\n' +
                '    // set the url of this page' + '\n' +
                '    url: \'/my-route\',' + '\n' +
                '    // set the html template to show on this page' + '\n' +
                '    templateUrl: \'app/examples/my-module/my-page.tmpl.html\',' + '\n' +
                '    // set the controller to load for this page' + '\n' +
                '    controller: \'MyController\',' + '\n' +
                '    controllerAs: \'vm\'' + '\n' +
                '    data: {' + '\n' +
                '        layout: {' + '\n' +
                '            toolbarSize: \'' + vm.layout.toolbarSize + '\',' + '\n' +
                '            toolbarShrink: ' + vm.layout.toolbarShrink + ',' + '\n' +
                '            toolbarClass: \'' + vm.layout.toolbarClass + '\',' + '\n' +
                '            contentClass: \'' + vm.layout.contentClass + '\',' + '\n' +
                '            sideMenuSize: \'' + vm.layout.sideMenuSize + '\',' + '\n' +
                '            footer: ' + vm.layout.footer + '\n' +
                '        }' + '\n' +
                '    }' + '\n' +
                '});';
        }

        function updateOption(optionName) {
            switch(optionName) {
                case 'footer':
                    var style = vm.layout.footer ? 'block' : 'none';
                    $document[0].getElementById('footer').style.display = style;
                    break;
                case 'toolbarShrink':
                    // update toolbar shrink
                    // needs some work
                    var mdContent = angular.element('#admin-panel md-content');
                    $rootScope.$broadcast('$mdContentLoaded', angular.element(mdContent[0]));
                    break;
            }
            // update the snippets
            createCodeSnippets();
        }

        function createBackgroundOptions() {
            vm.options.toolbarBackgrounds['none'] = 'No Background ';
            var x, paddedNumber;
            for(x = 1; x < 40 ; x++) {
                paddedNumber = $filter('padding')(x, 2);
                vm.options.toolbarBackgrounds['full-image-background mb-bg-' + paddedNumber] = 'Background ' + x;
            }
            for(x = 1; x < 30 ; x++) {
                paddedNumber = $filter('padding')(x, 2);
                vm.options.toolbarBackgrounds['full-image-background mb-bg-fb-' + paddedNumber] = 'Extra Background ' + x;
            }
        }

        // init
        createBackgroundOptions();
        createCodeSnippets();
    }
})();