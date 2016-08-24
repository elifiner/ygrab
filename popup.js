function union() {
    console.log('click');
    chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
        if (changeInfo.status == 'complete') {
            // Execute some script when the page is fully (DOM) ready
            chrome.tabs.executeScript(tabs[0].id, {file: "union.js"}, function() {
                chrome.tabs.executeScript(tabs[0].id, {code: "login();"});
            });
        }
    });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        // chrome.tabs.update( tabs[0].id, { url: "http://unionbank.co.il//" } );
        chrome.tabs.executeScript(tabs[0].id, {file: "union.js"}, 
            function() {
                chrome.tabs.executeScript(tabs[0].id, {code: "enter();"});
            });
    });
}

document.getElementById('union').addEventListener('click', union);
