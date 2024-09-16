import { ChatMessage } from '@/pages/background/chat';
import useChromeLocalStorageListener from './useChromeLocalStorageListener';

export default function useChatMessage() {
  const [messages] = useChromeLocalStorageListener<ChatMessage[]>(
    'CHAT_MESSAGE_HISTORY'
  );

  return { messages };
}
