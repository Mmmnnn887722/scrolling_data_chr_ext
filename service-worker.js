// Listen for messages from the content script
self.addEventListener('message', function(event) {
    if (event.data.action === 'startRecording') {
      startRecording();
    } else if (event.data.action === 'stopRecording') {
      stopRecording();
    }
  });
  
  function startRecording() {
    // Your code to start recording scroll and mouse position data
    console.log('Start recording');
  
    // Send a message to the content script that recording has started
    self.clients.matchAll().then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage({ action: 'recordingStarted' });
      });
    });
  }
  
  function stopRecording() {
    // Your code to stop recording and download the CSV file
    console.log('Stop recording');
  
    // Send a message to the content script that recording has stopped
    self.clients.matchAll().then(function(clients) {
      clients.forEach(function(client) {
        client.postMessage({ action: 'recordingStopped' });
      });
    });
  }

  

  