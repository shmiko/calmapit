(function() {
    'use scmict';

    angular
        .module('app.examples.charts')
        .config(moduleConfig);

    /* @ngInject */
    function moduleConfig($translatePartialLoaderProvider, $stateProvider, cmiMenuProvider) {
        $translatePartialLoaderProvider.addPart('app/examples/charts');

        $stateProvider
        .state('calmapit.admin-default.charts-google-bar', {
            url: '/charts/google/bar',
            templateUrl: 'app/examples/charts/google-bar.tmpl.html'
        })
        .state('calmapit.admin-default.charts-google-scatter', {
            url: '/charts/google/scatter',
            templateUrl: 'app/examples/charts/google-scatter.tmpl.html'
        })
        .state('calmapit.admin-default.charts-google-line', {
            url: '/charts/google/line',
            templateUrl: 'app/examples/charts/google-line.tmpl.html'
        })
        .state('calmapit.admin-default.charts-chartjs-bar', {
            url: '/charts/chartjs/bar',
            templateUrl: 'app/examples/charts/chartjs-bar.tmpl.html'
        })
        .state('calmapit.admin-default.charts-chartjs-pie', {
            url: '/charts/chartjs/pie',
            templateUrl: 'app/examples/charts/chartjs-pie.tmpl.html'
        })
        .state('calmapit.admin-default.charts-chartjs-ticker', {
            url: '/charts/chartjs/ticker',
            templateUrl: 'app/examples/charts/chartjs-ticker.tmpl.html'
        })
        .state('calmapit.admin-default.charts-chartjs-line', {
            url: '/charts/chartjs/line',
            templateUrl: 'app/examples/charts/chartjs-line.tmpl.html'
        });

        cmiMenuProvider.addMenu({
            name: 'MENU.CHARTS.CHARTS',
            icon: 'zmdi zmdi-chart',
            type: 'dropdown',
            priority: 5.1,
            children: [{
                name: 'MENU.CHARTS.GOOGLE',
                type: 'dropdown',
                children: [{
                    name: 'MENU.CHARTS.BAR',
                    state: 'calmapit.admin-default.charts-google-bar',
                    type: 'link'
                },{
                    name: 'MENU.CHARTS.SCATTER',
                    state: 'calmapit.admin-default.charts-google-scatter',
                    type: 'link'
                },{
                    name: 'MENU.CHARTS.LINE',
                    state: 'calmapit.admin-default.charts-google-line',
                    type: 'link'
                }]
            },{
                name: 'MENU.CHARTS.CHARTJS',
                type: 'dropdown',
                children: [{
                    name: 'MENU.CHARTS.BAR',
                    state: 'calmapit.admin-default.charts-chartjs-bar',
                    type: 'link'
                },{
                    name: 'MENU.CHARTS.LINE',
                    state: 'calmapit.admin-default.charts-chartjs-line',
                    type: 'link'
                },{
                    name: 'MENU.CHARTS.PIE',
                    state: 'calmapit.admin-default.charts-chartjs-pie',
                    type: 'link'
                },{
                    name: 'MENU.CHARTS.TICKER',
                    state: 'calmapit.admin-default.charts-chartjs-ticker',
                    type: 'link'
                }]
            }]
        });
    }
})();