module App {
    class ConvertToDate {
        static factory() {
            var f = (utility:Utility) => {
                return (dateStr) => {
                    return utility.convertJsonDateToJSDate(dateStr);
                }
            }
            f.$inject = ["utility"];
            return f;
        }
    }
    angular.module("app").filter("convertToDate", ConvertToDate.factory());
}