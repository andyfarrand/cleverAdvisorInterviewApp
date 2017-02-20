module App {
    class AccountsListComponent implements ng.IComponentOptions {
        public bindings: any;
        public controller: any;
        public templateUrl: string;

        constructor() {
            this.bindings = {
                accounts: "<"
            };
            this.controller = AccountsListController;
            this.templateUrl = "Components/Accounts/accounts-list.template.html";
        }
    }
    class AccountsListController implements ng.IController {
        //bound by component
        accounts: Account[];

        sorts = [];
        filters = [];
        selectedSort; 

        idFilter;
        dateFilter = { startDate: null, endDate: null };
        investmentAmountSelectedFilter = null;
        accountTypeFilter = null;


        accountTypeList = [];
        investmentAmounts = [];

        public currentPage = 1;
        public perPage = 10;

        static $inject = ["utility", "$timeout", "MomentJS"];
        constructor(private utility, private $timeout, private moment) { }
        $onInit = () => {
            this.setupFilters();
            this.setupSorts();
        }

        setupFilters() {
            this.filters['idFilter'] = (account: Account) => {
                if (!this.idFilter) return true;
                return account.accountId === +this.idFilter
            }
            this.filters["daterangeFilter"] = (account: Account) => {
                if (!this.dateFilter.startDate === null || this.dateFilter.endDate === null) return true;
                var date = this.moment(account.dateCreated).toDate();
                return this.dateFilter.startDate.toDate() <= date && this.dateFilter.endDate.toDate() >= date
            }
            var maxInvestmentAmount = this.accounts.reduce((acc, next) => { return next.amountHeld > acc ? next.amountHeld : acc; }, 0);
            var levels = Math.ceil(maxInvestmentAmount / 5000);
            for (var i = 0; i < levels; i++) {
                this.investmentAmounts.push({ min: i * 5000, max: ((i + 1) * 5000), display: (i * 5) + "k - " + (i + 1) * 5 + "k" });
            }
            this.filters["investmentAmountFilter"] = (account: Account) => {
                if (this.investmentAmounts.length === 0) return true;
                if (this.investmentAmountSelectedFilter === null || this.investmentAmountSelectedFilter === "") return true;
                return (account.amountHeld >= this.investmentAmountSelectedFilter.min && account.amountHeld <= this.investmentAmountSelectedFilter.max)
            }

            this.accountTypeList = this.accounts
                .map(i => i.type)
                .filter((value, index, self) => { return self.indexOf(value) === index; }) //return unique vals
                .sort();

            this.filters["accountType"] = (account: Account) => {
                if (this.accountTypeFilter === null || this.accountTypeFilter === "") return true;
                return this.accountTypeFilter === account.type;
            }
        }

        setupSorts() {
            this.sorts.push({ label: "Id", predicate: (account: Account) => account.accountId, sortReverse: false });
            this.sorts.push({ label: "Date (ascending)", predicate: (account: Account) => account.dateCreated, sortReverse: false });
            this.sorts.push({ label: "Date (descending)", predicate: (account: Account) => account.dateCreated, sortReverse: true });
            this.sorts.push({ label: "Ammount Held (ascending)", predicate: (account: Account) => account.amountHeld, sortReverse: false });
            this.sorts.push({ label: "Amount Held (descending)", predicate: (account: Account) => account.amountHeld, sortReverse: true });
            this.selectedSort = this.sorts.filter(s => s.label == "Id")[0];
        }

        clearCalendar() {
            this.$timeout(() => {
                angular.element('[date-range-picker]').val(null);
                this.dateFilter = { startDate: null, endDate: null };
            });
        }

        clearAccountType() {
            this.accountTypeFilter = null;
        }

        clearInvested() {
            this.investmentAmountSelectedFilter = null;
        }

        applyFilters = (account) => {
            return Object.keys(this.filters).reduce((acc, next) => {
                if (!(this.filters[next](account))) {
                    acc = false
                }
                return acc;
            }, true)
        }
    }

    angular.module("app").component("accountList", new AccountsListComponent());
}