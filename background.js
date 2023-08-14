// // Listen for the extension's popup window to open
// chrome.extension.onConnect.addListener(function (port) {
//   if (port.name === 'scrollAndCapture') {
//     // Create the "web view" folder if it doesn't exist
//     const folderName = 'web_view';

//     // Create a CSV file for saving screenshot details
//     const csvFile = `${folderName}/screenshot_details_web.csv`;
//     const header = ['Image', 'Scrolling Time (UTC)', 'Scroll Position', 'Scroll Percentage'];

//     // Write the header to the CSV file
//     let csvContent = header.join(',') + '\n';

//     // Calculate the scroll height
//     let scrollHeight = 0;
//     let viewportHeight = 0;

//     // Start the manual scrolling process
//     let scrollPosition = 0;
//     const screenshotImages = [];

//     function scrollAndCapture() {
//       if (scrollPosition < scrollHeight) {
//         // Capture a screenshot of the current view
//         const screenshotName = `screenshot_${scrollPosition}.png`;
//         const screenshotDataUrl = document.createElement('canvas').toDataURL();

//         // Get the scroll percentage
//         const scrollPercentage = (scrollPosition / scrollHeight) * 100;

//         // Get the scrolling time in UTC format with milliseconds
//         const scrollingTime = new Date().toISOString().slice(0, -1);

//         // Append screenshot details to CSV content
//         const row = [screenshotName, scrollingTime, scrollPosition, scrollPercentage];
//         csvContent += row.join(',') + '\n';

//         // Update the scroll position
//         scrollPosition += viewportHeight;

//         // Scroll the page
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//           chrome.tabs.executeScript(tabs[0].id, { code: `window.scrollTo(0, ${scrollPosition});` });
//         });

//         // Wait for the page to settle and capture the screenshot
//         console.log("here")
//         setTimeout(scrollAndCapture, 3);
//       } else {
//         // Save the CSV file
//         const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
//         const downloadLink = document.createElement('a');
//         downloadLink.href = URL.createObjectURL(blob);
//         downloadLink.download = 'screenshot_details_web.csv';
//         downloadLink.click();
//       }
//     }

//     // Listen for messages from the extension's popup window
//     port.onMessage.addListener(function (msg) {
//       if (msg.action === 'startScrolling') {
//         // Calculate the scroll height and viewport height
//         chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
//           chrome.tabs.executeScript(
//             tabs[0].id,
//             { code: 'Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);' },
//             function (result) {
//               scrollHeight = result[0];

//               chrome.tabs.executeScript(
//                 tabs[0].id,
//                 { code: 'Math.max(window.innerHeight, document.documentElement.clientHeight);' },
//                 function (result) {
//                   viewportHeight = result[0];
//                   scrollAndCapture();
//                 }
//               );
//             }
//           );
//         });
//       }
//     });
//   }
// });





// chrome.runtime.onMessage.addListener(
//     function(request, sender, sendResponse) {
//       if( request.message === "capture_page" ) {
//         chrome.tabs.captureVisibleTab(null, {}, function (image) {
//           console.log(image); // Logs the data URL for the image. You can process it as needed.
//         });
//       }
//     }
//   );




// // Register the service worker
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('service-worker.js')
//     .then(function(registration) {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch(function(error) {
//       console.error('Service Worker registration failed:', error);
//     });
// }

// // Establish a connection with the content script
// chrome.runtime.onConnect.addListener(function(port) {
//   // Listen for messages from the content script
//   port.onMessage.addListener(function(message) {
//     if (message.action === 'startRecording') {
//       console.log('Recording started');
//       // TODO: Start recording logic
//     } else if (message.action === 'stopRecording') {
//       console.log('Recording stopped');
//       // TODO: Stop recording logic and trigger download
//     }
//   });
// });


// this is the correct one 
// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === 'start_recording') {
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.scripting.executeScript({
//         target: {tabId: tabs[0].id},
//         function: function() {
//           window.postMessage({message: "start_recording"}, "*");
//         }
//       });
//     });
//   }
// });
// end 


// let allScrollData = {};  // Store data from all tabs
// let recording = false;  // Global recording state

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === 'scroll_data') {
//     let tabId = sender.tab.id;
//     if (!allScrollData[tabId]) allScrollData[tabId] = [];
//     allScrollData[tabId].push(request.data);
//   } else if (request.message === 'start_recording') {
//     recording = true;
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, {message: "start_recording"});
//     });
//   } else if (request.message === 'stop_recording') {
//     recording = false;
//     downloadallScrollData();
//     allScrollData = {};  // Clear the data after downloading
//   }
// });

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (recording && changeInfo.status === 'complete') {
//     chrome.tabs.sendMessage(tabId, {message: "start_recording"});
//   }
// });

// // let allScrollData = [];

// // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
// //   console.log(request);  // Debug information
// //   if (request.message === 'scroll_data') {
// //     allScrollData.push(request.data); // Store the scroll data
// //   } else if (request.message === 'start_recording') {
// //     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
// //       chrome.scripting.executeScript({
// //         target: {tabId: tabs[0].id},
// //         function: function() {
// //           return window.location.href;
// //         }
// //       }, function(results) {
// //           // Here, results[0] will be the URL of the current tab
// //           console.log(results[0]);
          
// //           // you can now use results[0] to send the URL to your content script
// //           chrome.scripting.executeScript({
// //             target: {tabId: tabs[0].id},
// //             function: function(url) {
// //               window.postMessage({message: "start_recording", url: url}, "*");
// //             },
// //             args: [results[0]] // pass the URL as an argument to the function
// //           });
// //       });
// //     });
// //   } else if (request.message === 'stop_recording') {
// //     // Download allScrollData as a CSV file
// //     downloadallScrollData();
    
// //     allScrollData = []; // Clear the data after downloading
// //   }
// // });

// function downloadallScrollData() {
//   let csvContent = 'data:text/csv;charset=utf-8,'
//       + 'Time (UTC),Event,Scroll Position,Scroll Percentage,Mouse X,Mouse,URL Y\n'
//       + allScrollData.map(e => {
//           let values = [
//               e.time,
//               e.event,
//               e.position || '',
//               e.percentage || '',
//               e.mouseX || '',
//               e.mouseY || '',
//               e.url || ''
//           ];
//           return values.join(',');
//       }).join('\n');

//   var blob = new Blob([csvContent], {type: 'text/csv'});
//   var url = URL.createObjectURL(blob);
//   var downloadLink = document.createElement("a");
//   downloadLink.href = url;
//   downloadLink.download = "all_scroll_data.csv";
//   document.body.appendChild(downloadLink);
//   downloadLink.click();
//   document.body.removeChild(downloadLink);
// }



// background.js



// ...neeeew 

// let allScrollData = {};  // Store data from all tabs

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === 'scroll_data') {
//     let tabId = sender.tab.id;
//     if (!allScrollData[tabId]) allScrollData[tabId] = [];
//     allScrollData[tabId].push(...request.data);
//   }
// });


// new 16/ july 

// background.js

// background.js

// let recording = false;  // Global recording state

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//   if (request.message === 'start_recording') {
//     recording = true;
//     chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//       chrome.tabs.sendMessage(tabs[0].id, {message: "start_recording"});
//     });
//   } else if (request.message === 'stop_recording') {
//     recording = false;
//     chrome.storage.local.get(['scrollData'], function(result) {
//       let scrollData = result.scrollData || [];
//       sendResponse({scrollData: scrollData});
//       chrome.storage.local.clear();
//     });
//   }
//   return true;  // To allow asynchronous sendResponse
// });

// chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
//   if (recording && changeInfo.status === 'complete') {
//     chrome.tabs.sendMessage(tabId, {message: "start_recording"});
//   }
// });


// the last one 

// background.js

let recording = false;  // Global recording state

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.message === 'start_recording') {
    recording = true;
    chrome.storage.local.remove(['scrollData']); // Clears the existing data before starting new recording
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, {message: "start_recording"});
    });
  } else if (request.message === 'stop_recording') {
    recording = false;
    chrome.storage.local.get(['scrollData'], function(result) {
      let scrollData = result.scrollData || [];
      sendResponse({scrollData: scrollData});
      chrome.storage.local.clear(); // Clears the data after sending to the popup
    });
  }
  return true;  // To allow asynchronous sendResponse
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (recording && changeInfo.status === 'complete') {
    chrome.tabs.sendMessage(tabId, {message: "start_recording"});
  }
});
