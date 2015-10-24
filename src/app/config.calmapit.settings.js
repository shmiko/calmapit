(function() {
    'use scmict';

    angular
        .module('app')
        .config(translateConfig);

    /* @ngInject */
    function translateConfig(cmiSettingsProvider, APP_LANGUAGES) {
        // set app name & logo (used in loader, sidemenu, login pages, etc)
        //cmiSettingsProvider.setName('calmapit');
        cmiSettingsProvider.setLogo('assets/images/calmapit_logo1.png');
        // set current version of app (shown in footer)
        cmiSettingsProvider.setVersion('2.2.0');

        // setup available languages in calmapit
        for (var lang = APP_LANGUAGES.length - 1; lang >= 0; lang--) {
            cmiSettingsProvider.addLanguage({
                name: APP_LANGUAGES[lang].name,
                key: APP_LANGUAGES[lang].key
            });
        }
    }
})();
