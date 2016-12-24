var ygrab_sites = [
    {
        name: "Union Bank of Israel / Transactions",
        logo: "logos/union_bank_of_israel.jpg",
        urls: [
            "https://hb.unionbank.co.il/*/Accounts/ExtendedActivity.aspx",
            "file:///*.html",
        ],
        query: 'table#ctlActivityTable',
        columns: { date: 1, payee: 2, category: null, memo: null, outflow: 4, inflow: 5 },
        filename: 'union-transactions-{date}.csv',
        dateFormat: 'DD/MM/YY',
        ignoreTopRows: 0,
        ignoreBottomRows: 0,
    },

    {
        name: "Union Bank of Israel / Credit Card",
        logo: "logos/union_bank_of_israel.jpg",
        urls: [
            "https://hb.unionbank.co.il/*/CreditCard/DisplayCreditCardActivity.aspx",
        ],
        query: 'table#ctlRegularTransactions',
        columns: { date: 0, payee: 1, category: null, memo: null, outflow: 4, inflow: null },
        filename: 'union-credit-card-{date}.csv',
        dateFormat: 'DD/MM/YY',
        ignoreTopRows: 0,
        ignoreBottomRows: 1,
    }
];
