module App {
    var app = angular.module("app", ['angular-momentjs', 'daterangepicker', 'ui.bootstrap', 'ui.router','angular-loading-bar']);
    app.config(["$locationProvider", ($locationProvider) => {
        $locationProvider.html5Mode(true)
    }]);
    app.run(["$rootScope",function ($rootScope) {

        $rootScope
            .$on('$stateChangeStart',
            function (event, toState, toParams, fromState, fromParams) {
                $(".page-loading").removeClass("hidden");
            });

        $rootScope
            .$on('$stateChangeSuccess',
            function (event, toState, toParams, fromState, fromParams) {
                $(".page-loading").addClass("hidden");
            });

    }]);
}