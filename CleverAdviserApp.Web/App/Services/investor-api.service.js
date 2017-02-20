var App;
(function (App) {
    var InvestorApiService = (function () {
        function InvestorApiService($http, $q) {
            this.$http = $http;
            this.$q = $q;
        }
        InvestorApiService.prototype.get = function () {
            console.log("get called");
            var defer = this.$q.defer();
            this.$http.get("/api/investors", { cache: true })
                .then(function (result) {
                console.log("result:", result);
                defer.resolve(result.data);
            }).catch(function (error) {
                defer.reject(error);
            });
            return defer.promise;
        };
        InvestorApiService.prototype.getById = function (id) {
            var defer = this.$q.defer();
            this.get().then(function (result) {
                var investor = result.filter(function (i) { return i.investorId === +id; });
                if (investor.length > 0)
                    defer.resolve(investor[0]);
                else
                    defer.reject();
            });
            return defer.promise;
        };
        return InvestorApiService;
    }());
    InvestorApiService.$inject = ["$http", "$q"];
    angular.module("app")
        .service("investorApiService", InvestorApiService);
})(App || (App = {}));
//# sourceMappingURL=investor-api.service.js.map