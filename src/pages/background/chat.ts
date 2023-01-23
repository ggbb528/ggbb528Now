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
}

const MESSAGES_LIMIT = 50;
const messageQueue = new FixedLengthQueue<ChatMessage>(MESSAGES_LIMIT);

function sendChatMessage(chatMessage: ChatMessage) {
  chrome.runtime.sendMessage({
    type: 'CHAT_MESSAGE',
    chatMessage: chatMessage,
  });
}

function putMessage(chatMessage: ChatMessage) {
  messageQueue.enqueue(chatMessage);
  sendChatMessage(chatMessage);
}

export default async function chat() {
  try {
    let optionChatMessage =
      (await getOptionValue(OptionKeys.OPTION_KEY_CHAT_MESSAGE)) ||
      OptionKeys.OPTION_KEY_CHAT_MESSAGE.defaultValue;

    const client = new tmi.Client({
      channels: [Constants.TWITCH_CHANNEL],
      connection: {
        reconnect: true,
      },
    });

    client.on('message', (channel, tags, message, self) => {
      // "Alca: Hello, World!"
      console.log(`${tags['display-name']}: ${message}`);

      putMessage({
        id: crypto.randomUUID(),
        displayName: `${tags['display-name']}`,
        color: `${tags.color}`,
        emotes: tags.emotes,
        message,
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
