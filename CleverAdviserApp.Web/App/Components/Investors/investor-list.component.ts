
module App {
    class InvestorListComponent implements ng.IComponentOptions {
        public bindings: any;
        public controller: any;
        public templateUrl: string;

        constructor() {
            this.bindings = { investors: "<" };
            this.controller = InvestorListController;
            this.templateUrl = "Components/Investors/investor-list.template.html";
        }
    }

    class InvestorListController implements ng.IController {

        static $inject = ["utility","$timeout"];
        constructor(private utility:Utility, private $timeout) {
        }

        investors: Investor[];


        $onInit = () => {
            console.log("list:", this.investors);
            this.setupFilters();
            this.setupSorts();
        }

        moment = (<any>window).moment;
        public sorts = [];
        public filters: any = [];

        public idFilter: string;
        public nameFilter: string;
        public surnameFilter: string;
        public investmentAmounts = [];
        public investmentAmountSelectedFilter = null;
        public numOfAccountsFilter = null;
        public numOfAccountsList = [];

        public dateFilter = { startDate: null, endDate: null };
        public currentPage = 1;
        public perPage = 10;

        public selectedSort;

        setupSorts() {
            this.sorts.push({ label: "Id", predicate: (investor:Investor) => investor.investorId, sortReverse: false });
            this.sorts.push({ label: "Name (ascending)", predicate: (investor:Investor) => investor.name,  sortReverse: false});
            this.sorts.push({ label: "Name (descending)", predicate: (investor: Investor) => investor.name, sortReverse: true });
            this.sorts.push({ label: "Surname (ascending)", predicate: (investor: Investor) => investor.surname, sortReverse: false });
            this.sorts.push({ label: "Surname (descending)", predicate: (investor: Investor) => investor.surname, sortReverse: true });
            this.sorts.push({ label: "Date (ascending)", predicate: (investor: Investor) => investor.dateCreated, sortReverse: false });
            this.sorts.push({ label: "Date (descending)", predicate: (investor: Investor) => investor.dateCreated, sortReverse: true });
            this.sorts.push({ label: "Total Invested (ascending)", predicate: (investor: Investor) => investor.totalInvested, sortReverse: false });
            this.sorts.push({ label: "Total Invested (descending)", predicate: (investor:Investor) => investor.totalInvested, sortReverse: true });
            this.selectedSort = this.sorts.filter(s => s.label == "Id")[0];
        }

        setupFilters() {
            this.filters['idFilter'] = (investor: Investor) => {
                if (!this.idFilter) return true;
                return investor.investorId === +this.idFilter
            }
            this.filters['nameFilter'] = (investor: Investor) => {
                if (!this.nameFilter) return true;
                return investor.name.toLowerCase().indexOf(this.nameFilter.toLowerCase()) > -1
            }
            this.filters['surnameFilter'] = (investor: Investor) => {
                if (!this.surnameFilter) return true;
                return investor.surname.toLowerCase().indexOf(this.surnameFilter.toLowerCase()) > -1
            }
            this.filters["daterangeFilter"] = (investor: Investor) => {
                if (!this.dateFilter.startDate === null || this.dateFilter.endDate === null) return true;
                var date = this.moment(investor.dateCreated).toDate();
                return this.dateFilter.startDate.toDate() <= date && this.dateFilter.endDate.toDate() >= date 
            }

            var maxInvestmentAmount = this.investors.reduce((acc, next) => { return next.totalInvested > acc ? next.totalInvested : acc; }, 0);
            var levels = Math.ceil(maxInvestmentAmount / 10000);
            for (var i = 0; i < levels; i++) {
                this.investmentAmounts.push({ min: i * 10000 , max: ((i+1)*10000), display:  (i*10) + "k - " + (i+1)*10 + "k"});
            }
            this.filters["investmentAmountFilter"] = (investor: Investor) => {
                if (this.investmentAmounts.length === 0) return true;
                if (this.investmentAmountSelectedFilter ===  null || this.investmentAmountSelectedFilter ===  "") return true;
                return (investor.totalInvested >= this.investmentAmountSelectedFilter.min && investor.totalInvested <= this.investmentAmountSelectedFilter.max)
            }

            this.numOfAccountsList = this.investors
                .map(i => i.numberOfAccounts)
                .filter((value, index, self) => { return self.indexOf(value) ===  index; }) //return unique vals
                .sort((a, b) => a - b);

            this.filters["numOfAccounts"] = (investor: Investor) => {
                if (this.numOfAccountsFilter ===  null || this.numOfAccountsFilter ===  "") return true;
                return +this.numOfAccountsFilter === investor.numberOfAccounts;
            }

        }
        clearCalendar() {
            //just changing the model doesnt work here as the calendar is a jquery plugin.
            //so clear the input, change the model then force a digest cycle with $timeout
            this.$timeout(() => {
                angular.element('[date-range-picker]').val(null);
                this.dateFilter = { startDate: null, endDate: null };
            });
        }

        clearAccounts() {
            this.numOfAccountsFilter = null;
        }

        clearInvested() {
            this.investmentAmountSelectedFilter = null;
        }
        applyFilters = (investor) => {
            return Object.keys(this.filters).reduce((acc, next) => {
                if (!(this.filters[next](investor))) {
                    acc = false
                }
                return acc;
            }, true)
        }
    }

    angular.module("app")
        .component("investorList", new InvestorListComponent())

}