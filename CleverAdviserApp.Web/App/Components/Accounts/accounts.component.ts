module App {
    class AccountsComponent implements ng.IComponentOptions {
        public bindings: any;
        public controller: any;
        public templateUrl: string;

        constructor() {
            this.bindings = {
                investor: "<"
            };
            this.controller = AccountsController;
            this.templateUrl = "Components/Accounts/accounts.template.html";
        }
    }

    class AccountsController implements ng.IController {
        investor: Investor;
    }

    angular.module("app")
        .component("accounts", new AccountsComponent());
}