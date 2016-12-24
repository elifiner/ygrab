$(function () {
    function scrapeCurrentTab() {
        chrome.tabs.getSelected(null, function(tab){
            chrome.tabs.executeScript(tab.id, {file: 'jquery.js'}, function(response) { 
                chrome.tabs.executeScript(tab.id, {file: 'scrape.js'}, function(response) { 
                    chrome.tabs.executeScript(tab.id, {code: 'scrape()'}, function() {
                    });
                });
            });
        });
    }

    $('#title').text('Title!');
    $('#scrape').click(scrapeCurrentTab);
});
