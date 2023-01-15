import alarms from './alarms';

// set alarms
alarms();

// on installed
chrome.runtime.onInstalled.addListener(function () {
  chrome.tabs.create({ url: 'src/pages/updates/index.html' });
});
