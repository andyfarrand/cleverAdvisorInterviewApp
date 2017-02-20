var App;
(function (App) {
    var InvestorListComponent = (function () {
        function InvestorListComponent() {
            this.bindings = { investors: "<" };
            this.controller = InvestorListController;
            this.templateUrl = "Components/Investors/investor-list.template.html";
        }
        return InvestorListComponent;
    }());
    var InvestorListController = (function () {
        function InvestorListController(utility, $timeout) {
            var _this = this;
            this.utility = utility;
            this.$timeout = $timeout;
            this.$onInit = function () {
                console.log("list:", _this.investors);
                _this.setupFilters();
                _this.setupSorts();
            };
            this.moment = window.moment;
            this.sorts = [];
            this.filters = [];
            this.investmentAmounts = [];
            this.investmentAmountSelectedFilter = null;
            this.numOfAccountsFilter = null;
            this.numOfAccountsList = [];
            this.dateFilter = { startDate: null, endDate: null };
            this.currentPage = 1;
            this.perPage = 10;
            this.applyFilters = function (investor) {
                return Object.keys(_this.filters).reduce(function (acc, next) {
                    if (!(_this.filters[next](investor))) {
                        acc = false;
                    }
                    return acc;
                }, true);
            };
        }
        InvestorListController.prototype.setupSorts = function () {
            this.sorts.push({ label: "Id", predicate: function (investor) { return investor.investorId; }, sortReverse: false });
            this.sorts.push({ label: "Name (ascending)", predicate: function (investor) { return investor.name; }, sortReverse: false });
            this.sorts.push({ label: "Name (descending)", predicate: function (investor) { return investor.name; }, sortReverse: true });
            this.sorts.push({ label: "Surname (ascending)", predicate: function (investor) { return investor.surname; }, sortReverse: false });
            this.sorts.push({ label: "Surname (descending)", predicate: function (investor) { return investor.surname; }, sortReverse: true });
            this.sorts.push({ label: "Date (ascending)", predicate: function (investor) { return investor.dateCreated; }, sortReverse: false });
            this.sorts.push({ label: "Date (descending)", predicate: function (investor) { return investor.dateCreated; }, sortReverse: true });
            this.sorts.push({ label: "Total Invested (ascending)", predicate: function (investor) { return investor.totalInvested; }, sortReverse: false });
            this.sorts.push({ label: "Total Invested (descending)", predicate: function (investor) { return investor.totalInvested; }, sortReverse: true });
            this.selectedSort = this.sorts.filter(function (s) { return s.label == "Id"; })[0];
        };
        InvestorListController.prototype.setupFilters = function () {
            var _this = this;
            this.filters['idFilter'] = function (investor) {
                if (!_this.idFilter)
                    return true;
                return investor.investorId === +_this.idFilter;
            };
            this.filters['nameFilter'] = function (investor) {
                if (!_this.nameFilter)
                    return true;
                return investor.name.toLowerCase().indexOf(_this.nameFilter.toLowerCase()) > -1;
            };
            this.filters['surnameFilter'] = function (investor) {
                if (!_this.surnameFilter)
                    return true;
                return investor.surname.toLowerCase().indexOf(_this.surnameFilter.toLowerCase()) > -1;
            };
            this.filters["daterangeFilter"] = function (investor) {
                if (!_this.dateFilter.startDate === null || _this.dateFilter.endDate === null)
                    return true;
                var date = _this.moment(investor.dateCreated).toDate();
                return _this.dateFilter.startDate.toDate() <= date && _this.dateFilter.endDate.toDate() >= date;
            };
            var maxInvestmentAmount = this.investors.reduce(function (acc, next) { return next.totalInvested > acc ? next.totalInvested : acc; }, 0);
            var levels = Math.ceil(maxInvestmentAmount / 10000);
            for (var i = 0; i < levels; i++) {
                this.investmentAmounts.push({ min: i * 10000, max: ((i + 1) * 10000), display: (i * 10) + "k - " + (i + 1) * 10 + "k" });
            }
            this.filters["investmentAmountFilter"] = function (investor) {
                if (_this.investmentAmounts.length === 0)
                    return true;
                if (_this.investmentAmountSelectedFilter === null || _this.investmentAmountSelectedFilter === "")
                    return true;
                return (investor.totalInvested >= _this.investmentAmountSelectedFilter.min && investor.totalInvested <= _this.investmentAmountSelectedFilter.max);
            };
            this.numOfAccountsList = this.investors
                .map(function (i) { return i.numberOfAccounts; })
                .filter(function (value, index, self) { return self.indexOf(value) === index; }) //return unique vals
                .sort(function (a, b) { return a - b; });
            this.filters["numOfAccounts"] = function (investor) {
                if (_this.numOfAccountsFilter === null || _this.numOfAccountsFilter === "")
                    return true;
                return +_this.numOfAccountsFilter === investor.numberOfAccounts;
            };
        };
        InvestorListController.prototype.clearCalendar = function () {
            var _this = this;
            //just changing the model doesnt work here as the calendar is a jquery plugin.
            //so clear the input, change the model then force a digest cycle with $timeout
            this.$timeout(function () {
                angular.element('[date-range-picker]').val(null);
                _this.dateFilter = { startDate: null, endDate: null };
            });
        };
        InvestorListController.prototype.clearAccounts = function () {
            this.numOfAccountsFilter = null;
        };
        InvestorListController.prototype.clearInvested = function () {
            this.investmentAmountSelectedFilter = null;
        };
        return InvestorListController;
    }());
    InvestorListController.$inject = ["utility", "$timeout"];
    angular.module("app")
        .component("investorList", new InvestorListComponent());
})(App || (App = {}));
//# sourceMappingURL=investor-list.component.js.map