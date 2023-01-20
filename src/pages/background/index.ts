import { OptionKeys } from '@src/configs/optionKeys';
import alarms from './alarms';

// set alarms
alarms();

// on installed
chrome.runtime.onInstalled.addListener(function () {
  chrome.storage.sync.get(
    [OptionKeys.OPTION_KEY_UPGRADE_NOTIFICATION.name],
    (result) => {
      if (result[OptionKeys.OPTION_KEY_UPGRADE_NOTIFICATION.name]) {
        chrome.tabs.create({ url: 'src/pages/updates/index.html' });
      }
    }
  );
});
