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
  const sendDate = new Date(parseInt(sendtime));
  return (
    <div className="p-1 text-left flex flex-row justify-start">
      <span>{moment(sendDate).format('HH:mm')}</span>
      <span className="font-bold whitespace-nowrap" style={{ color }}>
        {displayName}
      </span>
      <span>:</span>
      <span>{message}</span>
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
      {messages?.map((message) => (
        <MessageItem key={message.id} {...message} />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
