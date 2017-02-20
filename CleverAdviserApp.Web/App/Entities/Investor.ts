module App {

    export interface Investor {
        investorId: number;
        name: string;
        surname: string;
        dateCreated: string;
        accounts: Account[];
        numberOfAccounts: number;
        totalInvested: number;
    }

}