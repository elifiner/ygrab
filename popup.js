$(function () {
    // todo: move to configuration JSON file
    var SITES = [
        {
            name: "Union Bank of Israel / Transactions",
            logo: "logos/union_bank_of_israel.jpg",
            urls: [
                "https://hb.unionbank.co.il/*/Accounts/ExtendedActivity.aspx",
                "file:///*.html",
            ],
            query: 'table#ctlActivityTable',
            columns: { date: 1, payee: 2, category: null, memo: null, outflow: 4, inflow: 5 },
            dateFormat: 'DD/MM/YY',
            filename: 'union-transactions-{date}.csv',
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
            dateFormat: 'DD/MM/YY',
            filename: 'union-credit-card-{date}.csv',
            ignoreTopRows: 0,
            ignoreBottomRows: 1,
        }
    ]

    function matches(text, patterns) {
        for (var i = 0; i < patterns.length; i++) {
            regex = patterns[i].replace(/\*/g, "[^ ]*");
            if (text.match(regex) != null) {
                return true;
            }
        }
        return false;
    }

    function detectSite(tab) {
        for (i = 0; i < SITES.length; i++) {
            var site = SITES[i];
            if (matches(tab.url, site.urls)) {
                return site;
            }
        }
    }

    function updatePopup(site) {
        if (site) {
            $('#message').text(site.name + " detected.");
            $('#logo').show().attr("src", site.logo);
            $('#scrape').show();
        } else {
            $('#message').text("This page is not supported.");
            $('#logo').hide();
            $('#scrape').hide();
        }
    }

    function bindEvents(tab, site) {
        $('#scrape').click(function() {
            chrome.tabs.executeScript(tab.id, {code: 'scrape(' + JSON.stringify(site) + ')'});
        });
    }

    function loadContentScripts(tab, scripts) {
        console.log(scripts);
        chrome.tabs.executeScript(tab.id, scripts[0], function(response) {
            if (scripts.length > 1) {
                loadContentScripts(tab, scripts.slice(1, scripts.length));
            }
        });
    }

    // runs on ext window popup
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var tab = tabs[0];
        var site = detectSite(tab);
        updatePopup(site);
        bindEvents(tab, site);
        loadContentScripts(tab, [
            {file: 'jquery.js'},
            {file: 'moment.js'},
            {file: 'scrape.js'}
        ]);
    });
});
