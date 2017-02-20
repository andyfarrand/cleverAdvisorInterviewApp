var App;
(function (App) {
    var InvestorsComponent = (function () {
        function InvestorsComponent() {
            this.bindings = { investors: "<" };
            this.controller = InvestorsController;
            this.templateUrl = "Components/Investors/investors.template.html";
        }
        return InvestorsComponent;
    }());
    var InvestorsController = (function () {
        function InvestorsController() {
        }
        return InvestorsController;
    }());
    angular.module("app").component("investors", new InvestorsComponent());
})(App || (App = {}));
//# sourceMappingURL=investors.component.js.map