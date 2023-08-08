// Store the last known scroll position of the window.
let previousScrollPosition = window.scrollY;

// A flag to check if recording is currently active.
let recording = false;

// Function to calculate the percentage of the document that has been scrolled.
function getScrollPercentage() {
  return ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100;
}

// Function to get the current date and time in ISO format.
function getDateTime() {
  return new Date().toISOString();
}

// Handler function to record various events like scrolling and mouse movements.
function handleEvent(event) {
  // If recording is not active, don't process the event.
  if (!recording) return;

  // Prepare a basic event data structure with the current time and URL.
  let eventData = {
    time: getDateTime(),
    url: window.location.href
  };

  // If the event type is 'scroll'
  if (event.type === 'scroll') {
    let currentScrollPosition = window.scrollY;

    // Check if the scroll position has changed since the last recorded position.
    if (currentScrollPosition !== previousScrollPosition) {
      eventData.event = 'scroll';
      eventData.position = currentScrollPosition;
      eventData.percentage = getScrollPercentage();

      // Update the previous scroll position to the current one.
      previousScrollPosition = currentScrollPosition;
    } else {
      return;  // If the scroll position hasn't changed, skip this event.
    }
  } 
  // If the event type is 'mousemove'
  else if (event.type === 'mousemove') {
    eventData.event = 'mousemove';
    eventData.mouseX = event.clientX;
    eventData.mouseY = event.clientY;
  }
  try {
  // Fetch the existing scrollData from Chrome's local storage.
  chrome.storage.local.get(['scrollData'], function(result) {
    let scrollData = result.scrollData || [];

    // Add the new event data to the existing list.
    scrollData.push(eventData);

    // Logging before saving
    console.log("Attempting to save data:", eventData);

    // Save the updated scrollData back to local storage.
    chrome.storage.local.set({scrollData: scrollData}, function() {
      if (chrome.runtime.lastError) {
          console.error("Data saving failed:", chrome.runtime.lastError);
      } else {
          console.log("Data saved successfully.");
      }
    })
  });
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
// Add event listeners for 'scroll' and 'mousemove' events.
window.addEventListener('scroll', handleEvent);
window.addEventListener('mousemove', handleEvent);

// Listen for messages from the extension's background script or popup.
// This is used to control the recording state.
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "start_recording") {
    recording = true;
  } else if (request.message === "stop_recording") {
    recording = false;
  }
});
