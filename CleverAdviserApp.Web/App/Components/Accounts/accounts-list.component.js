var App;
(function (App) {
    var AccountsListComponent = (function () {
        function AccountsListComponent() {
            this.bindings = {
                accounts: "<"
            };
            this.controller = AccountsListController;
            this.templateUrl = "Components/Accounts/accounts-list.template.html";
        }
        return AccountsListComponent;
    }());
    var AccountsListController = (function () {
        function AccountsListController(utility, $timeout, moment) {
            var _this = this;
            this.utility = utility;
            this.$timeout = $timeout;
            this.moment = moment;
            this.sorts = [];
            this.filters = [];
            this.dateFilter = { startDate: null, endDate: null };
            this.investmentAmountSelectedFilter = null;
            this.accountTypeFilter = null;
            this.accountTypeList = [];
            this.investmentAmounts = [];
            this.currentPage = 1;
            this.perPage = 10;
            this.$onInit = function () {
                _this.setupFilters();
                _this.setupSorts();
            };
            this.applyFilters = function (account) {
                return Object.keys(_this.filters).reduce(function (acc, next) {
                    if (!(_this.filters[next](account))) {
                        acc = false;
                    }
                    return acc;
                }, true);
            };
        }
        AccountsListController.prototype.setupFilters = function () {
            var _this = this;
            this.filters['idFilter'] = function (account) {
                if (!_this.idFilter)
                    return true;
                return account.accountId === +_this.idFilter;
            };
            this.filters["daterangeFilter"] = function (account) {
                if (!_this.dateFilter.startDate === null || _this.dateFilter.endDate === null)
                    return true;
                var date = _this.moment(account.dateCreated).toDate();
                return _this.dateFilter.startDate.toDate() <= date && _this.dateFilter.endDate.toDate() >= date;
            };
            var maxInvestmentAmount = this.accounts.reduce(function (acc, next) { return next.amountHeld > acc ? next.amountHeld : acc; }, 0);
            var levels = Math.ceil(maxInvestmentAmount / 5000);
            for (var i = 0; i < levels; i++) {
                this.investmentAmounts.push({ min: i * 5000, max: ((i + 1) * 5000), display: (i * 5) + "k - " + (i + 1) * 5 + "k" });
            }
            this.filters["investmentAmountFilter"] = function (account) {
                if (_this.investmentAmounts.length === 0)
                    return true;
                if (_this.investmentAmountSelectedFilter === null || _this.investmentAmountSelectedFilter === "")
                    return true;
                return (account.amountHeld >= _this.investmentAmountSelectedFilter.min && account.amountHeld <= _this.investmentAmountSelectedFilter.max);
            };
            this.accountTypeList = this.accounts
                .map(function (i) { return i.type; })
                .filter(function (value, index, self) { return self.indexOf(value) === index; }) //return unique vals
                .sort();
            this.filters["accountType"] = function (account) {
                if (_this.accountTypeFilter === null || _this.accountTypeFilter === "")
                    return true;
                return _this.accountTypeFilter === account.type;
            };
        };
        AccountsListController.prototype.setupSorts = function () {
            this.sorts.push({ label: "Id", predicate: function (account) { return account.accountId; }, sortReverse: false });
            this.sorts.push({ label: "Date (ascending)", predicate: function (account) { return account.dateCreated; }, sortReverse: false });
            this.sorts.push({ label: "Date (descending)", predicate: function (account) { return account.dateCreated; }, sortReverse: true });
            this.sorts.push({ label: "Ammount Held (ascending)", predicate: function (account) { return account.amountHeld; }, sortReverse: false });
            this.sorts.push({ label: "Amount Held (descending)", predicate: function (account) { return account.amountHeld; }, sortReverse: true });
            this.selectedSort = this.sorts.filter(function (s) { return s.label == "Id"; })[0];
        };
        AccountsListController.prototype.clearCalendar = function () {
            var _this = this;
            this.$timeout(function () {
                angular.element('[date-range-picker]').val(null);
                _this.dateFilter = { startDate: null, endDate: null };
            });
        };
        AccountsListController.prototype.clearAccountType = function () {
            this.accountTypeFilter = null;
        };
        AccountsListController.prototype.clearInvested = function () {
            this.investmentAmountSelectedFilter = null;
        };
        return AccountsListController;
    }());
    AccountsListController.$inject = ["utility", "$timeout", "MomentJS"];
    angular.module("app").component("accountList", new AccountsListComponent());
})(App || (App = {}));
//# sourceMappingURL=accounts-list.component.js.map