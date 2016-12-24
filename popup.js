$(function () {
    // todo: move to configuration JSON file
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
        for (i = 0; i < ygrab_sites.length; i++) {
            var site = ygrab_sites[i];
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
