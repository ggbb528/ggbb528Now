import { Constants } from '@src/configs/constants';
import { OptionKeys } from '@src/configs/optionKeys';
import { sendLiveNotification } from './utils/notifications';
import { checkStreams } from './utils/streams';
import syncVod from './utils/vods';

export enum AlarmType {
  checkStream = 'CHECKSTREAM',
  syncVOD = 'SYNCVOD',
}

export default function alarms() {
  if (!chrome.alarms) return;

  chrome.alarms.clearAll();

  chrome.alarms.create(AlarmType.checkStream, {
    delayInMinutes: 1,
    periodInMinutes: 1,
  });
  chrome.alarms.create(AlarmType.syncVOD, {
    when: Date.now() + 1000,
    periodInMinutes: 60,
  });

  chrome.alarms.onAlarm.addListener(function (alarm) {
    switch (alarm.name) {
      case AlarmType.checkStream:
        checkStreams();
        break;
      case AlarmType.syncVOD:
        syncVod();
        break;
      default:
        break;
    }
  });

  // init check
  chrome.storage.local.get({ ggbb528Open: false }, function () {
    checkStreams();
  });

  chrome.storage.onChanged.addListener(function (changes, areaName) {
    if (changes.ggbb528Open && changes.ggbb528Open.newValue == true) {
      chrome.storage.sync.get(
        [OptionKeys.OPTION_KEY_LIVE_NOTIFICATION.name],
        (result) => {
          if (result[OptionKeys.OPTION_KEY_LIVE_NOTIFICATION.name]) {
            sendLiveNotification(
              'ggbb528',
              'ggbb528 開台囉!!!',
              '趕快前往實況台~~~'
            );
          }
        }
      );
    }
  });

  chrome.notifications.onClicked.addListener(function (id) {
    switch (id) {
      case 'ggbb528':
        chrome.notifications.clear('ggbb528', function () {
          chrome.tabs.create({ url: Constants.TWITCH_CHANNEL_URL });
        });
        break;
      default:
        break;
    }
  });
}
