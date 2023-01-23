import { ChatMessage } from '@src/pages/background/chat';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import useChatMessage from '../../hooks/useChatMessage';

function MessageItem({
  color,
  displayName,
  message,
  emotes,
  sendtime,
}: ChatMessage) {
  return (
    <div className="p-1 text-left flex flex-row justify-start">
      <span>{moment(sendtime).format('HH:mm')}</span>
      <span className="font-bold mx-1" style={{ color }}>
        {displayName}:
      </span>
      <span className="mr-auto">{message}</span>
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
