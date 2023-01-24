import React, { useEffect, useRef } from 'react';
import TabChatMessage from './tab-contents/TabChatMessage';
import TabRanking from './tab-contents/TabRanking';
import TabStatistics from './tab-contents/TabStatistics';
import TabVod from './tab-contents/TabVod';

interface TabPaneProps {
  target: string;
  children?: React.ReactNode;
  active?: boolean;
  className?: string;
  startFromButtom?: boolean;
}
function TabPane(props: TabPaneProps) {
  const divRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: 'auto' });
  };

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      if (!props.startFromButtom) return;

      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          if (mutation.target.className.includes('show')) {
            scrollToBottom();
          }
        }
      });
    });

    if (divRef.current) {
      observer.observe(divRef.current, { attributes: true });
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={divRef}
      className={`tab-pane fade ${props.active ? 'show active' : ''} ${props.className || ''}`}
      id={`${props.target}`}
      role="tabpanel"
      aria-labelledby={`${props.target}-tab`}
    >
      {props.children}
      <div ref={endRef} />
    </div>
  );
}

export default function Content({ className = '' }: { className?: string }) {
  return (
    <div className={`tab-content  ${className}`} id="tabs-tabContent">
      <TabPane target="ranking" active>
        <TabRanking />
      </TabPane>
      <TabPane target="statistics">
        <TabStatistics />
      </TabPane>
      <TabPane target="vod">
        <TabVod />
      </TabPane>
      <TabPane target="chat" startFromButtom={true} className="bg-gray-50 min-h-full p-1">
        <TabChatMessage />
      </TabPane>
    </div>
  );
}
