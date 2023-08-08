# User Activity Tracker Chrome Extension
User Activity Tracker is a Chrome Extension designed to record user interactions such as scrolling and mouse movements on web pages. Users can then download this recorded data in a CSV format for analysis.

# Features
Real-time Recording: Track user interactions including scrolling and mouse movements.
Easy Start/Stop: A popup interface to easily start or stop the recording.
Data Export: Export the recorded data as a CSV file.

# Installation
1- Clone this repository:
git clone https://github.com/Mmmnnn887722/scrolling_data_chr_ext.git

2- Open the Chrome browser, go to chrome://extensions/.
3- Enable "Developer mode" (usually a toggle in the top right corner).
4- Click "Load unpacked" and select the directory where you cloned this repository.
5- The extension should now appear in your Chrome extensions list.

# Usage
1- Click on the User Activity Tracker extension icon.
2- Use the popup to start or stop the recording.
3- After stopping, a CSV file will be downloaded with the recorded data.

# Files Overview

manifest.json: Configuration file for the Chrome Extension.
popup.html and popup.js: UI and logic for the popup window that appears when the extension icon is clicked.
content.js: Script that runs in the context of web pages to record user interactions.
background.js: Background script for handling long-running tasks and managing the recording state.

# Contributing

# License
