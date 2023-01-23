import { Constants } from '@src/configs/constants';
import tmi from 'tmi.js';
import { OptionKeys } from './../../configs/optionKeys';
import { getOptionValue } from './utils/options';
import { FixedLengthQueue } from './utils/queue';
import { getSyncStorageValue, setSyncStorageValue } from './utils/storage';

export interface ChatMessage {
  id: string;
  displayName: string;
  color: string;
  message: string;
  emotes: { [emoteid: string]: string[] } | undefined;
  sendtime: Date;
}

const MESSAGES_LIMIT = 50;

function sendChatMessage(chatMessage: ChatMessage) {
  chrome.runtime.sendMessage({
    type: 'CHAT_MESSAGE',
    chatMessage: chatMessage,
  });
}

async function getTwitchChat() {
  try {
    const messageQueue = new FixedLengthQueue<ChatMessage>(MESSAGES_LIMIT);

    // restore history messages
    const historyMessage = await getSyncStorageValue('CHAT_MESSAGE_HISTORY');
    if (historyMessage && Array.isArray(historyMessage)) {
      historyMessage.forEach((message) => messageQueue.enqueue(message));
    }

    chrome.runtime.onSuspend.addListener(function () {
      setSyncStorageValue('CHAT_MESSAGE_HISTORY', messageQueue.toArray());
    });

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
      sendChatMessage(chatMessage);
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
        sendtime: new Date(parseInt(`${tags['tmi-sent-ts']}`)),
      });
    });

    client.connect();

    // message listener
    const listener = (
      request: { type: string },
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      if (request.type === 'CHAT_MESSAGE_HISTORY') {
        if (!optionChatMessage) {
          sendResponse({ hisMessages: [] });
          return;
        }

        sendResponse({ hisMessages: messageQueue.toArray() });
      }
    };
    chrome.runtime.onMessage.addListener(listener);

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
