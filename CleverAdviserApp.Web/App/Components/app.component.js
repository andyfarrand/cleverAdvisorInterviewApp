var App;
(function (App) {
    var AppComponent = (function () {
        function AppComponent() {
            this.bindings = {};
            this.controller = AppController;
            this.templateUrl = "Components/app.template.html";
        }
        return AppComponent;
    }());
    var AppController = (function () {
        function AppController() {
        }
        return AppController;
    }());
    angular.module("app").component("app", new AppComponent());
})(App || (App = {}));
