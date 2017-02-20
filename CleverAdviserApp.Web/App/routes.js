var App;
(function (App) {
    angular.module("app").config(["$stateProvider", function ($stateProvider) {
            var states = [
                {
                    name: "home",
                    url: "/",
                    component: "home"
                },
                {
                    name: "investors",
                    url: "/investors",
                    component: "investors",
                    resolve: {
                        investors: ["investorApiService", function (investorService) {
                                return investorService.get();
                            }]
                    }
                },
                {
                    name: "accounts",
                    url: "/investors/{id}",
                    component: "accounts",
                    resolve: {
                        investor: ["investorApiService", "$stateParams", function (investorService, $stateParams) {
                                return investorService.getById($stateParams.id);
                            }]
                    }
                }
            ];
            states.forEach(function (state) {
                $stateProvider.state(state);
            });
        }]);
})(App || (App = {}));
//# sourceMappingURL=routes.js.map