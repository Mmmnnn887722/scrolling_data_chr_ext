// // Establish a connection with the background script
// const port = chrome.runtime.connect({ name: 'scrollAndCapture' });

// // Handle the click event of the start button
// const startButton = document.getElementById('start-button');
// startButton.addEventListener('click', function () {
//   // Send a message to the background script to start scrolling
//   port.postMessage({ action: 'startScrolling' });
// });

//  the coreect one 

// // Establish a connection with the background script
// const port = chrome.runtime.connect({ name: 'scrollAndCapture' });

// // Handle the click event of the start button
// const startButton = document.getElementById('start-button');
// startButton.addEventListener('click', function () {
//   // Send a message to the background script to start recording
//   port.postMessage({ action: 'startRecording' });

//   // Disable the start button and enable the stop button
//   startButton.disabled = true;
//   stopButton.disabled = false;
// });

// // Handle the click event of the stop button
// const stopButton = document.getElementById('stop-button');
// stopButton.addEventListener('click', function () {
//   // Send a message to the background script to stop recording
//   port.postMessage({ action: 'stopRecording' });

//   // Disable the stop button
//   stopButton.disabled = true;
// });

// // Listen for messages from the background script
// port.onMessage.addListener(function (message) {
//   if (message.action === 'recordingStarted') {
//     // Enable the stop button
//     stopButton.disabled = false;
//   } else if (message.action === 'recordingStopped') {
//     // Enable the start button
//     startButton.disabled = false;
//   }
// });


//  end 





// document.getElementById('start').addEventListener('click', function() {
//   // Send a message to the background script
//   chrome.runtime.sendMessage({message: 'start_recording'});
// });

// document.getElementById('stop').addEventListener('click', function() {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.scripting.executeScript({
//       target: {tabId: tabs[0].id},
//       function: function() {
//         window.postMessage({message: "stop_recording"}, "*");
//       }
//     });
//   });
// });




// document.getElementById('start').addEventListener('click', function() {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {message: "start_recording"});
//   });
// });

// document.getElementById('stop').addEventListener('click', function() {
//   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
//     chrome.tabs.sendMessage(tabs[0].id, {message: "stop_recording"});
//   });
// });

// new 16/july 

// popup.js

function startRecording() {
  chrome.runtime.sendMessage({message: "start_recording"});
}

function stopRecording() {
  chrome.runtime.sendMessage({message: "stop_recording"}, function(response) {
    downloadScrollData(response.scrollData);
  });
}

function downloadScrollData(scrollData) {
  let csvContent = 'data:text/csv;charset=utf-8,'
      + 'Time (UTC),Event,Scroll Position,Scroll Percentage,Mouse X,Mouse,URL Y\n'
      + scrollData.map(e => {
          let values = [
              e.time,
              e.event,
              e.position || '',
              e.percentage || '',
              e.mouseX || '',
              e.mouseY || '',
              e.url || ''
          ];
          return values.join(',');
      }).join('\n');

  var blob = new Blob([csvContent], {type: 'text/csv'});
  var url = URL.createObjectURL(blob);
  var downloadLink = document.createElement("a");
  downloadLink.href = url;
  downloadLink.download = "scroll_data.csv";
  document.body.appendChild(downloadLink);
  downloadLink.click();
  document.body.removeChild(downloadLink);
}

document.getElementById('start').addEventListener('click', startRecording);
document.getElementById('stop').addEventListener('click', stopRecording);
