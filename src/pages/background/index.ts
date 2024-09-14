import alarms from './alarms';
import chat from './chat';

// keep service workers alive
const keepAlive = () => setInterval(chrome.runtime.getPlatformInfo, 20e3);
chrome.runtime.onStartup.addListener(keepAlive);
keepAlive();

try {
  // set alarms
  alarms();

  // chat
  chat();
} catch (e) {
  console.log(e);
}

// set icon badge when it's dev mode
if (import.meta.env.VITE_DEV_MODE === 'dev') {
  chrome.action.setBadgeBackgroundColor({ color: '#0c4a6e' });
  chrome.action.setBadgeText({ text: 'D' });
}
