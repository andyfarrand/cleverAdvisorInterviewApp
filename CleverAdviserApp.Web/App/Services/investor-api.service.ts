module App {
    export interface IInvestorApiService {
        getById(id: number): ng.IHttpPromise<Investor>;
        get(): ng.IHttpPromise<Investor[]>;
    }

    class InvestorApiService implements IInvestorApiService {
        static $inject = ["$http", "$q"];
        constructor(
            private $http: ng.IHttpService,
            private $q: ng.IQService) {     
        }

        get() {
            console.log("get called");
            var defer = this.$q.defer();
            this.$http.get("/api/investors", { cache: true })
                .then(result => {
                    console.log("result:", result);
                    defer.resolve((<Investor[]>result.data));
                }).catch(error => {
                    defer.reject(error);
                });
            return defer.promise;
        }

        getById(id: number) {
            var defer = this.$q.defer();
            this.get().then((result) => {
                var investor = (<Investor[]>result).filter(i => i.investorId === +id);
                if (investor.length > 0) defer.resolve(investor[0]);
                else defer.reject();
            });
            return defer.promise;
        }
    }
    angular.module("app")
        .service("investorApiService", InvestorApiService);
}