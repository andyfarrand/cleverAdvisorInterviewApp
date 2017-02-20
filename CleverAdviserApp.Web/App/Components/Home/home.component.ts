module App {

    class HomeComponent implements ng.IComponentOptions {
        public bindings: any;
        public controller: any;
        public templateUrl: string;

        constructor() {
            this.bindings = {};
            this.controller = HomeController;
            this.templateUrl = "Components/Home/home.template.html";
        }
    }

    class HomeController implements ng.IController {
        
    }

    angular.module("app").component("home", new HomeComponent());
}