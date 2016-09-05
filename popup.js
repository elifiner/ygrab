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

// handle click on popup link
document.addEventListener('DOMContentLoaded', function () {
    document.getElementById('scrape').addEventListener('click', scrapeCurrentTab);
});
