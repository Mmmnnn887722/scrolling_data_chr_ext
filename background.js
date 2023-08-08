// Global variable to maintain the recording state.
let recording = false;

// Listener for messages from other parts of the extension (e.g., content script, popup).
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  
  // If the received message is to start the recording
  if (request.message === 'start_recording') {
    // Set the global recording state to true
    recording = true;

    // Clear any previously stored scroll data before starting a new recording session.
    chrome.storage.local.remove(['scrollData']);

    // Query the currently active tab in the current window
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      // Send a message to the content script of the active tab to start recording.
      chrome.tabs.sendMessage(tabs[0].id, {message: "start_recording"});
    });
  } 
  // If the received message is to stop the recording
  else if (request.message === 'stop_recording') {
    // Set the global recording state to false
    recording = false;

    // Fetch the recorded scroll data from Chrome's local storage.
    chrome.storage.local.get(['scrollData'], function(result) {
      let scrollData = result.scrollData || [];

      // Logging before sending response
      console.log("Sending recorded data:", scrollData);

      // Send the fetched scroll data as a response to the popup.
      sendResponse({scrollData: scrollData});

      // Logging before clearing storage
      console.log("Attempting to clear storage...");

      // Clear the stored data after sending it to the popup.
    chrome.storage.local.clear(function() {
      if (chrome.runtime.lastError) {
          console.error("Failed to clear storage:", chrome.runtime.lastError);
      } else {
          console.log("Storage cleared successfully.");
      }
    });
  });

  // This return statement indicates that the response to the sendMessage will be sent asynchronously.
  // This is necessary when sendResponse will be called outside of the current call stack.
  return true;
}});


// Listener for when a tab is updated (e.g., when a page finishes loading).
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  
  // If recording is currently active and the tab has fully loaded
  if (recording && changeInfo.status === 'complete') {
    // Send a message to the content script of the updated tab to start recording.
    chrome.tabs.sendMessage(tabId, {message: "start_recording"});
  }
});

