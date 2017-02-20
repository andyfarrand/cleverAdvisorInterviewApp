var App;
(function (App) {
    var HomeComponent = (function () {
        function HomeComponent() {
            this.bindings = {};
            this.controller = HomeController;
            this.templateUrl = "Components/Home/home.template.html";
        }
        return HomeComponent;
    }());
    var HomeController = (function () {
        function HomeController() {
        }
        return HomeController;
    }());
    angular.module("app").component("home", new HomeComponent());
})(App || (App = {}));
