import { ChatMessage } from '@src/pages/background/chat';
import { useEffect, useState } from 'react';

const MESSAGES_LIMIT = 50;
export default function useChatMessage() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);

  useEffect(() => {
    // fetch history
    chrome.runtime?.sendMessage(
      {
        type: 'CHAT_MESSAGE_HISTORY',
      },
      (response: { hisMessages: ChatMessage[] }) => {
        const hisMessages = response?.hisMessages || [];
        setMessages([...hisMessages]);
      }
    );

    const listener = (
      msg: { type: string; chatMessage: ChatMessage },
      sender: chrome.runtime.MessageSender,
      sendResponse: (response?: any) => void
    ) => {
      if (msg.type === 'CHAT_MESSAGE') {
        setMessages((prev) => {
          if (prev.length > MESSAGES_LIMIT)
            prev.splice(0, prev.length - MESSAGES_LIMIT);
          return [...prev, msg.chatMessage];
        });
      }
    };

    chrome.runtime.onMessage.addListener(listener);
    return () => chrome.runtime.onMessage.removeListener(listener);
  }, []);

  return { messages };
}
