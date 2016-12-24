$(function () {
    // todo: move to configuration JSON file
    var SITES = [
        {
            name: "Union Bank of Israel / Transactions",
            logo: "logos/union_bank_of_israel.jpg",
            urls: [
                "https://hb.unionbank.co.il/*/Accounts/ExtendedActivity.aspx",
                "file:///*.html",
            ]
        },
        {
            name: "Union Bank of Israel / Credit Card",
            logo: "logos/union_bank_of_israel.jpg",
            urls: [
                "https://hb.unionbank.co.il/*/CreditCard/DisplayCreditCardActivity.aspx",
            ]
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

    function updatePopup() {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            $('#message').text("This page is not supported.");
            $('#logo').hide();
            $('#scrape').hide();
            if (tabs[0].url) {
                for (i = 0; i < SITES.length; i++) {
                    var site = SITES[i];
                    if (matches(tabs[0].url, site.urls)) {
                        $('#message').text(site.name + " detected.");
                        $('#logo').show().attr("src", site.logo);
                        $('#scrape').show();
                        break;
                    }
                }
            }
        });
    }

    function loadContentScripts(scripts) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.executeScript(tabs[0].id, scripts[0], function(response) {
                loadContentScripts(scripts.slice(1, scripts.length));
            });
        });
    }

    function bindEvents() {
        $('#scrape').click(function() {
            loadContentScripts([
                {file: 'jquery.js'},
                {file: 'moment.js'},
                {file: 'scrape.js'},
                {code: 'scrape()'},
            ]);
        });        
    }

    updatePopup();
    bindEvents();
});
