var App;
(function (App) {
    var Utility = (function () {
        function Utility(moment) {
            this.moment = moment;
        }
        Utility.prototype.convertJsonDateToJSDate = function (jsonDate) {
            return this.moment(jsonDate).toDate();
        };
        return Utility;
    }());
    Utility.$inject = ["MomentJS"];
    App.Utility = Utility;
    angular.module("app")
        .service("utility", Utility);
})(App || (App = {}));
//# sourceMappingURL=utility.js.map