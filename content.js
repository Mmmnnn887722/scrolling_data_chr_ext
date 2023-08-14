// // // Create the "web view" folder if it doesn't exist
// // const folderName = 'web_view';

// // // Create a CSV file for saving screenshot details
// // const csvFile = `${folderName}/screenshot_details_web.csv`;
// // const header = ['Image', 'Scrolling Time (UTC)', 'Scroll Position', 'Scroll Percentage'];

// // // Write the header to the CSV file
// // let csvContent = header.join(',') + '\n';

// // // Calculate the scroll height
// // const scrollHeight = document.documentElement.scrollHeight;
// // const viewportHeight = window.innerHeight;

// // // Start the manual scrolling process
// // let scrollPosition = 0;
// // const screenshotImages = [];

// // function scrollAndCapture() {
// //   if (scrollPosition < scrollHeight) {
// //     // Capture a screenshot of the current view
// //     const screenshotName = `screenshot_${scrollPosition}.png`;
// //     const screenshotDataUrl = document.createElement('canvas').toDataURL();

// //     // Get the scroll percentage
// //     const scrollPercentage = (scrollPosition / scrollHeight) * 100;

// //     // Get the scrolling time in UTC format with milliseconds
// //     const scrollingTime = new Date().toISOString().slice(0, -1);

// //     // Append screenshot details to CSV content
// //     const row = [screenshotName, scrollingTime, scrollPosition, scrollPercentage];
// //     csvContent += row.join(',') + '\n';

// //     // Update the scroll position
// //     scrollPosition += viewportHeight;

// //     // Scroll the page
// //     window.scrollTo(0, scrollPosition);

// //     // Wait for the page to settle and capture the screenshot
// //     setTimeout(scrollAndCapture, 500);
// //   } else {
// //     // Save the CSV file
// //     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
// //     const downloadLink = document.createElement('a');
// //     downloadLink.href = URL.createObjectURL(blob);
// //     downloadLink.download = 'screenshot_details_web.csv';
// //     downloadLink.click();
// //   }
// // }

// // scrollAndCapture();



// // // Function to get scroll percentage
// // function getScrollPercentage() {
// //   return ((window.scrollY + window.innerHeight) / document.body.offsetHeight) * 100;
// // }

// // // Function to get current date-time
// // function getDateTime() {
// //   return new Date().toISOString();
// // }

// // let scrollData = [];

// // // Listen to scroll event
// // let scrollTimer = null;
// // window.addEventListener('scroll', function(){
// //   let scrollPercentage = getScrollPercentage();
// //   let dateTime = getDateTime();

// //   // Save scroll data
// //   scrollData.push({
// //       time: dateTime,
// //       position: window.scrollY,
// //       percentage: scrollPercentage
// //   });

// //   // Clear the timer if it already exists
// //   if (scrollTimer !== null) {
// //       clearTimeout(scrollTimer);
// //   }

// //   // Set the timer
// //   scrollTimer = setTimeout(function() {
// //       // Create the CSV file after 3 seconds of no scrolling
// //       let csvContent = 'data:text/csv;charset=utf-8,'
// //           + 'Scrolling Time (UTC),Scroll Position,Scroll Percentage\n'
// //           + scrollData.map(e => `${e.time},${e.position},${e.percentage}`).join('\n');

// //       // Create a blob from the CSV content
// //       var blob = new Blob([csvContent], {type: 'text/csv'});

// //       // Create a blob URL
// //       var url = URL.createObjectURL(blob);

// //       // Create a download link and click it
// //       var downloadLink = document.createElement("a");
// //       downloadLink.href = url;
// //       downloadLink.download = "scroll_data.csv";
// //       document.body.appendChild(downloadLink);
// //       downloadLink.click();
// //       document.body.removeChild(downloadLink);

// //       // Clear scrollData after download
// //       scrollData = [];
// //   }, 3000);
// // });



// // Function to get scroll percentage
// function getScrollPercentage() {
//   return ((window.scrollY + window.innerHeight) / document.body.offsetHeight) * 100;
// }

// // Function to get current date-time
// function getDateTime() {
//   return new Date().toISOString();
// }

// let scrollData = [];

// // Listen to mouse wheel event
// window.addEventListener('wheel', function(event){
//   let dateTime = getDateTime();


// // Listen to scroll event
// window.addEventListener('scroll', function(){
//   let scrollPercentage = getScrollPercentage();
//   let dateTime = getDateTime();

//   // Save scroll data
//   scrollData.push({
//     time: dateTime,
//     event: 'scroll',
//     position: window.scrollY,
//     percentage: scrollPercentage
//   });
// });

// // Listen to mouse wheel event
// window.addEventListener('wheel', function(event){
//   let dateTime = getDateTime();

//   // Save wheel data
//   scrollData.push({
//     time: dateTime,
//     event: 'mouseWheel',
//     deltaY: event.deltaY
//   });
// });


// // // Listen to scroll event
// // let scrollTimer = null;

// // window.addEventListener('scroll', function(){
// //   let scrollPercentage = getScrollPercentage();
// //   let dateTime = getDateTime();

// //   // Save scroll data
// //   scrollData.push({
// //       time: dateTime,
// //       position: window.scrollY,
// //       percentage: scrollPercentage

// //   });

//   // Clear the timer if it already exists
//   if (scrollTimer !== null) {
//       clearTimeout(scrollTimer);
//   }

//   // Set the timer
//   scrollTimer = setTimeout(function() {
//       // Create the CSV file after 3 seconds of no scrolling
//       // let csvContent = 'data:text/csv;charset=utf-8,'
//       //     + 'Scrolling Time (UTC),Scroll Position,Scroll Percentage\n'
//       //     + scrollData.map(e => `${e.time},${e.position},${e.percentage}`).join('\n');

//       // Create the CSV file after 3 seconds of no scrolling
//       // let csvContent = 'data:text/csv;charset=utf-8,'
//       //     + 'Event Time (UTC),Event,Scroll Position,Scroll Percentage,Mouse Scroll DeltaY\n'
//       //     + scrollData.map(e => `${e.time},${e.event || 'scroll'},${e.position || ''},${e.percentage || ''},${e.deltaY || ''}`).join('\n');
          

//       let csvContent = 'data:text/csv;charset=utf-8,'
//           + 'Event Time (UTC),Event,Scroll Position,Scroll Percentage,Mouse Scroll DeltaY\n'
//           + scrollData.map(e => `${e.time},${e.event || ''},${e.position || ''},${e.percentage || ''},${e.deltaY || ''}`).join('\n');
      
//       // Create a blob from the CSV content
//       var blob = new Blob([csvContent], {type: 'text/csv'});

//       // Create a blob URL
//       var url = URL.createObjectURL(blob);

//       // Create a download link and click it
//       var downloadLink = document.createElement("a");
//       downloadLink.href = url;
//       downloadLink.download = "scroll_data.csv";
//       document.body.appendChild(downloadLink);
//       downloadLink.click();
//       document.body.removeChild(downloadLink);

//       // Clear scrollData after download
//       scrollData = [];
//   }, 3000);
// });

// // // Listen to mouse wheel event
// // window.addEventListener('wheel', function(event){
// //   console.log(event.deltaY); // Logs the distance scrolled in pixels. Positive value if scrolling down, negative value if scrolling up.
// // });

// // // Listen to mouse wheel event
// // window.addEventListener('wheel', function(event){
// //   let dateTime = getDateTime();

// //   // Save scroll data
// //   scrollData.push({
// //       time: dateTime,
// //       event: 'mouseScroll',
// //       deltaY: event.deltaY
// //   });
// // });

// // Capture screenshot of visible area
// chrome.runtime.sendMessage({"message": "capture_page"});




// this is the correct code 


// // Function to get scroll percentage
// function getScrollPercentage() {
//   return ((window.scrollY + window.innerHeight) / document.body.offsetHeight) * 100;
// }

// // Function to get current date-time
// function getDateTime() {
//   return new Date().toISOString();
// }

// let scrollData = [];
// let previousScrollPosition = window.scrollY;

// // Listen to scroll event
// window.addEventListener('scroll', function(){
//   let currentScrollPosition = window.scrollY;

//   // We only want to record a scroll event if the position has changed.
//   if (currentScrollPosition !== previousScrollPosition) {
//     let scrollPercentage = getScrollPercentage();
//     let dateTime = getDateTime();

//     // Save scroll data
//     scrollData.push({
//       time: dateTime,
//       event: 'scroll',
//       position: currentScrollPosition,
//       percentage: scrollPercentage
//     });

//     previousScrollPosition = currentScrollPosition;
//   }
// });

// // Listen to mousemove event
// window.addEventListener('mousemove', function(event){
//   let dateTime = getDateTime();

//   // Save mouse position data
//   scrollData.push({
//     time: dateTime,
//     event: 'mousemove',
//     mouseX: event.clientX,
//     mouseY: event.clientY
//   });
// });

// let scrollTimer = null;
// window.addEventListener('scroll', function(){
//   // Clear the timer if it already exists
//   if (scrollTimer !== null) {
//       clearTimeout(scrollTimer);
//   }

//   // Set the timer
//   scrollTimer = setTimeout(function() {
//       // Create the CSV file after 3 seconds of no scrolling
//       let csvContent = 'data:text/csv;charset=utf-8,'
//           + 'Time (UTC),Event,Scroll Position,Scroll Percentage,Mouse X,Mouse Y\n'
//           + scrollData.map(e => {
//               // Get the values in the correct order
//               let values = [
//                   e.time,
//                   e.event,
//                   e.position || '', // Use an empty string if the position is not defined
//                   e.percentage || '', // Use an empty string if the percentage is not defined
//                   e.mouseX || '', // Use an empty string if the mouseX is not defined
//                   e.mouseY || ''  // Use an empty string if the mouseY is not defined
//               ];

//               // Join the values into a string and return it
//               return values.join(',');
//           }).join('\n');

//       // Create a blob from the CSV content
//       var blob = new Blob([csvContent], {type: 'text/csv'});

//       // Create a blob URL
//       var url = URL.createObjectURL(blob);

//       // Create a download link and click it
//       var downloadLink = document.createElement("a");
//       downloadLink.href = url;
//       downloadLink.download = "scroll_data.csv";
//       document.body.appendChild(downloadLink);
//       downloadLink.click();
//       document.body.removeChild(downloadLink);

//       // Clear scrollData after download
//       scrollData = [];
//   }, 3000);
// });


//  end 





// Function to get scroll percentage
// function getScrollPercentage() {
//   return ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100;
// }


// Function to get current date-time
// function getDateTime() {
//   return new Date().toISOString();
// }

// // This function sends scroll data to the background script
// function sendScrollDataToBackgroundScript() {
//   chrome.runtime.sendMessage({
//     message: "scroll_data",
//     data: [scrollData]  // wrap scrollData in an array
//   });
// }

// let scrollData = [];
// let previousScrollPosition = window.scrollY;
// let recording = false;


// // Event handling function
// function handleEvent(event) {
//   if (!recording) return;

//   if (event.type === 'scroll') {
//     let currentScrollPosition = window.scrollY;

//     if (currentScrollPosition !== previousScrollPosition) {
//       let scrollPercentage = getScrollPercentage();
//       let dateTime = getDateTime();
//       let url = window.location.href;

//       let eventData = {
//         time: dateTime,
//         event: 'scroll',
//         position: currentScrollPosition,
//         percentage: scrollPercentage,
//         url: url
//       };
      
//       // Immediately send the data to the background script
//       chrome.runtime.sendMessage({
//         message: "scroll_data",
//         data: eventData
//       });

//       previousScrollPosition = currentScrollPosition;
//     }
//   } else if (event.type === 'mousemove') {
//     let dateTime = getDateTime();
//     let url = window.location.href;

//     let eventData = {
//       time: dateTime,
//       event: 'mousemove',
//       mouseX: event.clientX,
//       mouseY: event.clientY,
//       url: url
//     };
//     scrollData.push(eventData);

//     // Immediately send the data to the background script
//     chrome.runtime.sendMessage({
//       message: "scroll_data",
//       data: eventData
//     });
//   }
// }


// // Function to download scrollData as CSV
// function downloadScrollData() {
//   let csvContent = 'data:text/csv;charset=utf-8,'
//       + 'Time (UTC),Event,Scroll Position,Scroll Percentage,Mouse X,Mouse,URL Y\n'
//       + scrollData.map(e => {
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
//   downloadLink.download = "scroll_data.csv";
//   document.body.appendChild(downloadLink);
//   downloadLink.click();
//   document.body.removeChild(downloadLink);
//   scrollData = [];
// }


// // Listen to scroll and mousemove event
// window.addEventListener('scroll', handleEvent);
// window.addEventListener('mousemove', handleEvent);
// // Call this function when the page is about to unload
// // Call this function when the page is about to unload
// window.addEventListener('beforeunload', function() {
//   if (recording && scrollData.length > 0) {
//     sendScrollDataToBackgroundScript(); // Send the remaining scroll data
//     if (!document.documentElement) return;
//   }
// });

// // Listen to messages from popup
// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//    if (request.message === "start_recording") {
//      recording = true;
//    } else if (request.message === "stop_recording") {
//      sendScrollDataToBackgroundScript(); // Send the remaining scroll data
//     recording = false;
//      downloadScrollData();
//    }
//  });

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.message === "stop_recording") {
//     sendScrollDataToBackgroundScript(); // Send the remaining scroll data
//     recording = false;
//   }
// });



// neeeeeeeew

// let scrollData = [];

// // Function to get scroll percentage
// function getScrollPercentage() {
//   return ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100;
// }

// // Function to get current date-time
// function getDateTime() {
//   return new Date().toISOString();
// }

// // This function sends scroll data to the background script
// function sendScrollDataToBackgroundScript() {
//   chrome.runtime.sendMessage({
//     message: "scroll_data",
//     data: scrollData  // wrap scrollData in an array
//   });
// }

// let recording = false;

// function handleEvent(event) {
//   if (!recording) return;

//   let eventData = {
//     time: getDateTime(),
//     url: window.location.href
//   };

//   if (event.type === 'scroll') {
//     eventData.event = 'scroll';
//     eventData.position = window.scrollY;
//     eventData.percentage = getScrollPercentage();
//   } else if (event.type === 'mousemove') {
//     eventData.event = 'mousemove';
//     eventData.mouseX = event.clientX;
//     eventData.mouseY = event.clientY;
//   }

//   scrollData.push(eventData);
// }

// window.addEventListener('scroll', handleEvent);
// window.addEventListener('mousemove', handleEvent);

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.message === "start_recording") {
//     recording = true;
//   } else if (request.message === "stop_recording") {
//     sendScrollDataToBackgroundScript(); // Send the remaining scroll data
//     recording = false;
//   }
// });

// // Function to download scrollData as CSV
// function downloadScrollData() {
//   let csvContent = 'data:text/csv;charset=utf-8,'
//       + 'Time (UTC),Event,Scroll Position,Scroll Percentage,Mouse X,Mouse,URL Y\n'
//       + scrollData.map(e => {
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
//   downloadLink.download = "scroll_data.csv";
//   document.body.appendChild(downloadLink);
//   downloadLink.click();
//   document.body.removeChild(downloadLink);
// }

// chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
//   if (request.message === "stop_recording") {
//     sendScrollDataToBackgroundScript(); // Send the remaining scroll data
//     recording = false;
//     downloadScrollData();
//   }
// });


// neeeew 16/july

// content.js

let previousScrollPosition = window.scrollY;
let recording = false;

function getScrollPercentage() {
  return ((window.scrollY + window.innerHeight) / document.documentElement.scrollHeight) * 100;
}

function getDateTime() {
  return new Date().toISOString();
}

function handleEvent(event) {
  if (!recording) return;

  let eventData = {
    time: getDateTime(),
    url: window.location.href
  };

  if (event.type === 'scroll') {
    let currentScrollPosition = window.scrollY;

    if (currentScrollPosition !== previousScrollPosition) {
      eventData.event = 'scroll';
      eventData.position = currentScrollPosition;
      eventData.percentage = getScrollPercentage();

      previousScrollPosition = currentScrollPosition;
    } else {
      return;  // Skip this event if the scroll position didn't change
    }
  } else if (event.type === 'mousemove') {
    eventData.event = 'mousemove';
    eventData.mouseX = event.clientX;
    eventData.mouseY = event.clientY;
  }

  chrome.storage.local.get(['scrollData'], function(result) {
    let scrollData = result.scrollData || [];
    scrollData.push(eventData);
    chrome.storage.local.set({scrollData: scrollData});
  });
}

window.addEventListener('scroll', handleEvent);
window.addEventListener('mousemove', handleEvent);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.message === "start_recording") {
    recording = true;
  } else if (request.message === "stop_recording") {
    recording = false;
  }
});
