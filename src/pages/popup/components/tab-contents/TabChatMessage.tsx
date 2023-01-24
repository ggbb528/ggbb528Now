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
      const [start, end] = position.split('-');
      replacements.push({
        emote: <ChatEmote emoteId={id} />,
        start: parseInt(start, 10),
        end: parseInt(end, 10),
      });
    }
  });

  replacements.sort((r1, r2) => (r1.start < r2.start ? -1 : 1));

  const messageNodes: JSX.Element[] = [];
  let lastIndex = 0;
  for (let i = 0; i < message.length; i++) {
    const replacement = replacements[0];
    if (replacement) {
      if (i === replacement.start) {
        if (lastIndex !== i) {
          messageNodes.push(<Message message={message.slice(lastIndex, i)} />);
        }
        i = replacement.end + 1;
        lastIndex = i;
        messageNodes.push(replacement.emote);
        replacements.shift();
      }
    }
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
    <div className="p-1 text-left flex flex-row justify-start">
      <span className="pr-1">{moment(sendDate).format('HH:mm')}</span>
      <span className="font-bold whitespace-nowrap" style={{ color }}>
        {displayName}
      </span>
      <span>:</span>
      <div>{parseMessage(message, emotes)}</div>
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
