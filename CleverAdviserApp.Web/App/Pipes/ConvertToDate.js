var App;
(function (App) {
    var ConvertToDate = (function () {
        function ConvertToDate() {
        }
        ConvertToDate.factory = function () {
            var f = function (utility) {
                return function (dateStr) {
                    return utility.convertJsonDateToJSDate(dateStr);
                };
            };
            f.$inject = ["utility"];
            return f;
        };
        return ConvertToDate;
    }());
    angular.module("app").filter("convertToDate", ConvertToDate.factory());
})(App || (App = {}));
//# sourceMappingURL=ConvertToDate.js.map