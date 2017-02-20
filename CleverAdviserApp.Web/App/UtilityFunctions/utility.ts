module App {

    export class Utility {
        static $inject = ["MomentJS"];
        constructor(private moment) { }


        convertJsonDateToJSDate(jsonDate: string) {
           return this.moment(jsonDate).toDate();
        }


    }

    angular.module("app")
        .service("utility", Utility);
    
}