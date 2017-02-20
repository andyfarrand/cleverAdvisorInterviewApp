module App {
    class AppComponent implements ng.IComponentOptions{
        public bindings: any;
        public controller: any;
        public templateUrl: string;

        constructor() {
            this.bindings = {};
            this.controller = AppController;
            this.templateUrl = "Components/app.template.html";
        }
    }

    class AppController implements ng.IController {

    }

    angular.module("app").component("app", new AppComponent());
}