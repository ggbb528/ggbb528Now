import { Constants } from '@src/configs/constants';
import tmi from 'tmi.js';
import { OptionKeys } from './../../configs/optionKeys';
import { getOptionValue } from './utils/options';
import { FixedLengthQueue } from './utils/queue';

export interface ChatMessage {
  id: string;
  displayName: string;
  color: string;
  message: string;
  emotes: { [emoteid: string]: string[] } | undefined;
  sendtime: string;
}

const MESSAGES_LIMIT = 50;
async function getTwitchChat() {
  try {
    const messageQueue = new FixedLengthQueue<ChatMessage>(
      MESSAGES_LIMIT,
      'CHAT_MESSAGE_HISTORY'
    );

    let optionChatMessage =
      (await getOptionValue(OptionKeys.OPTION_KEY_CHAT_MESSAGE)) ||
      OptionKeys.OPTION_KEY_CHAT_MESSAGE.defaultValue;

    const client = new tmi.Client({
      channels: [Constants.TWITCH_CHANNEL],
      connection: {
        reconnect: true,
      },
    });

    const putMessage = (chatMessage: ChatMessage) => {
      messageQueue.enqueue(chatMessage);
    };

    client.on('message', (channel, tags, message, self) => {
      // "Alca: Hello, World!"
      console.log(`${tags['display-name']}: ${message}`);

      putMessage({
        id: crypto.randomUUID(),
        displayName: `${tags['display-name']}`,
        color: `${tags.color}`,
        emotes: tags.emotes,
        message,
        sendtime: `${tags['tmi-sent-ts']}`,
      });
    });

    client.connect();

    // options change listner
    chrome.storage.onChanged.addListener((changes, areaName) => {
      if (areaName !== 'sync') return;
      if (changes[OptionKeys.OPTION_KEY_CHAT_MESSAGE.name] !== undefined) {
        optionChatMessage =
          changes[OptionKeys.OPTION_KEY_CHAT_MESSAGE.name].newValue;
      }

      if (!optionChatMessage) {
        client.disconnect();
        return;
      }

      client.connect();
    });
  } catch (e) {
    console.log(e);
  }
}

export default function chat() {
  try {
    chrome.alarms.create('STORE_CHAT_MESSAGE', {
      when: Date.now() + 1000,
      periodInMinutes: 60,
    });

    chrome.alarms.onAlarm.addListener(function (alarm) {
      if (alarm.name === 'STORE_CHAT_MESSAGE') {
        getTwitchChat();
      }
    });
  } catch (e) {
    console.log(e);
  }
}
