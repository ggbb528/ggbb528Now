import { ChatMessage } from '@src/pages/background/chat';
import moment from 'moment';
import { useEffect, useRef } from 'react';
import useChatMessage from '../../hooks/useChatMessage';

function ChatEmote({ emoteId }: { emoteId: string }) {
  const CDN_URL = `https://static-cdn.jtvnw.net/emoticons/v2/${emoteId}/default/light/2.0`;

  return (
    <img className="max-w-6 max-h-6 inline-block aspect-auto" src={CDN_URL} />
  );
}

function Message({ message }: { message: string }) {
  return <span>{message}</span>;
}

function parseMessage(
  message: string,
  emotes?: {
    [emoteid: string]: string[];
  }
) {
  if (!emotes) return <Message message={message} />;

  const replacements: {
    emote: JSX.Element;
    start: number;
    end: number;
  }[] = [];

  Object.entries(emotes).forEach(([id, positions]) => {
    for (const position of positions) {
      const [start, end] = position.split('-').map((num) => parseInt(num, 10));

      replacements.push({
        emote: <ChatEmote emoteId={id} />,
        start,
        end,
      });
    }
  });

  replacements.sort((a, b) => a.start - b.start);

  let lastIndex = 0;
  const messageNodes = [];

  for (let i = 0; i < replacements.length; i++) {
    const { start, end, emote } = replacements[i];
    messageNodes.push(<Message message={message.slice(lastIndex, start)} />);
    messageNodes.push(emote);
    lastIndex = end + 1;
  }

  if (lastIndex !== message.length) {
    messageNodes.push(<Message message={message.slice(lastIndex)} />);
  }

  return messageNodes;
}

function MessageItem({
  color,
  displayName,
  message,
  emotes,
  sendtime,
}: ChatMessage) {
  const sendDate = new Date(parseInt(sendtime));
  return (
    <div className="p-1 text-left">
      <span className="pr-1">{moment(sendDate).format('HH:mm')}</span>
      <span className="font-bold whitespace-nowrap" style={{ color }}>
        {displayName}
      </span>
      <span>:</span>
      <div className="break-all inline">{parseMessage(message, emotes)}</div>
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
