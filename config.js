var ygrab_sites = [
    {
        name: "Union Bank of Israel / Transactions",
        logo: "logos/union_bank_of_israel.jpg",
        urls: [
            "https://hb.unionbank.co.il/*/Accounts/ExtendedActivity.aspx",
            "file:///*.html",
        ],
        scraper: 'Ygrab.scrapeUnionTransactions',
        filename: 'union-transactions-{date}.csv'
    },

    {
        name: "Union Bank of Israel / Credit Card",
        logo: "logos/union_bank_of_israel.jpg",
        urls: [
            "https://hb.unionbank.co.il/*/CreditCard/DisplayCreditCardActivity.aspx",
        ],
        scraper: 'Ygrab.scrapeUnionCreditCard',
        filename: 'union-credit-card-{date}.csv'
    }
];
