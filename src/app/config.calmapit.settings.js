(function() {
    'use strict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(triSettingsProvider, APP_LANGUAGES) {
        // set app name & logo (used in loader, sidemenu, login pages, etc)
        //triSettingsProvider.setName('calmapit');
        triSettingsProvider.setLogo('assets/images/calmapit_logo1.png');
        // set current version of app (shown in footer)
        triSettingsProvider.setVersion('2.2.0');

        // setup available languages in calmapit
        for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
            triSettingsProvider.addLanguage({
                name: APP_LANGUAGES[lang].name,
                key: APP_LANGUAGES[lang].key
            });
        }
    }
})();
