import { ChatMessage } from '@src/pages/background/chat';
import { useEffect, useRef } from 'react';
import useChatMessage from '../../hooks/useChatMessage';

function MessageItem({ color, displayName, message, emotes }: ChatMessage) {
  console.log('emotes', emotes);
  return (
    <div className="p-1 text-left">
      <span className="font-bold mr-1" style={{ color }}>
        {displayName}:
      </span>
      <span className="">{message}</span>
    </div>
  );
}

export default function TabChatMessage() {
  const { messages } = useChatMessage();

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      {messages.map((message) => (
        <MessageItem key={message.id} {...message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
