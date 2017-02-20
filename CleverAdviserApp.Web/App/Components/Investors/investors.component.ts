module App {
    class InvestorsComponent implements ng.IComponentOptions {
        public bindings: any;
        public controller: any;
        public templateUrl: string;

        constructor() {
            this.bindings = { investors: "<" };
            this.controller = InvestorsController;
            this.templateUrl = "Components/Investors/investors.template.html";
        }
    }

    class InvestorsController implements ng.IController {
        investors: Investor[];
    }

    angular.module("app").component("investors", new InvestorsComponent());
}