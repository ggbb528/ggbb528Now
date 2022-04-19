'use strict';

const streams = require("./func/streams")();
const notification = require("./func/notification")();

// set alarms
chrome.alarms.clearAll();
chrome.alarms.onAlarm.addListener(function(alarm) {
  switch (alarm.name) {
    case 'streamCheckAlarm':
      streams.checkStreams();
      break;
    case 'vodSyncAlarm':
      streams.syncVOD();
      break;
    default:
      break;
  }  
});
chrome.alarms.create('streamCheckAlarm',  {delayInMinutes: 1, periodInMinutes: 1});
chrome.alarms.create('vodSyncAlarm',  {when : Date.now() + 1000, periodInMinutes: 60});

// init check
chrome.storage.local.get({
  ggbb528Open: false,
}, function(items) {
    streams.checkStreams();
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
  if (changes.ggbb528Open && changes.ggbb528Open.newValue == true) {
    notification.streamOpen("ggbb528", "ggbb528 開台囉!!!", "趕快前往實況台~~~");
  }
});

chrome.notifications.onClicked.addListener(function(id) {
  switch (id) {
    case "ggbb528":
      chrome.notifications.clear("ggbb528", function(message) {
          chrome.tabs.create({ "url": "https://www.twitch.tv/ggbb528" });
      });
      break;
    default:
      break;
  }
});