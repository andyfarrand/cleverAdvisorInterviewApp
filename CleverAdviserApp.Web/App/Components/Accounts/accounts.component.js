var App;
(function (App) {
    var AccountsComponent = (function () {
        function AccountsComponent() {
            this.bindings = {
                investor: "<"
            };
            this.controller = AccountsController;
            this.templateUrl = "Components/Accounts/accounts.template.html";
        }
        return AccountsComponent;
    }());
    var AccountsController = (function () {
        function AccountsController() {
        }
        return AccountsController;
    }());
    angular.module("app")
        .component("accounts", new AccountsComponent());
})(App || (App = {}));
