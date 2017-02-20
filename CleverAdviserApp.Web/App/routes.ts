module App {
    angular.module("app").config(["$stateProvider",($stateProvider) => {

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
                    investors: ["investorApiService", (investorService: IInvestorApiService) => {
                        return investorService.get();
                    }]
                }
            },
            {
                name: "accounts",
                url: "/investors/{id}",
                component: "accounts",
                resolve: {
                    investor: ["investorApiService", "$stateParams", (investorService: IInvestorApiService, $stateParams:any) => {
                        return investorService.getById($stateParams.id)
                    }]
                }
            }

        ];

        states.forEach(function (state) {
            $stateProvider.state(state);
        });

    }]);

}