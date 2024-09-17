import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import TabChatMessage from './tab-contents/TabChatMessage';
import TabVod from './tab-contents/TabVod';
import TabRanking from './tab-contents/TabRanking';
import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Tooltip from './Tooltip';
import { openURL } from '../utils/utility';

export default function TabPages() {
  const [currentTab, setCurrentTab] = useState('ranking');
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateScrollPositionToBottom = () => {
      if (currentTab === 'chats') {
        endRef.current?.scrollIntoView({ block: 'end', inline: 'nearest' });
      }
    };

    updateScrollPositionToBottom();

    // MutationObserver to monitor changes in the content
    const observer = new MutationObserver(updateScrollPositionToBottom);
    if (scrollDivRef.current) {
      observer.observe(scrollDivRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => {
      if (scrollDivRef.current) {
        observer.disconnect();
      }
    };
  }, [currentTab]);

  return (
    <div className="flex-1">
      <Tabs
        value={currentTab}
        onValueChange={setCurrentTab}
        className="h-full flex flex-col"
      >
        <div ref={scrollDivRef} className="h-[27.75rem] overflow-auto">
          <TabsContent value="ranking" key="tanking">
            <TabRanking />
          </TabsContent>
          <TabsContent value="vod" key="vod">
            <TabVod />
          </TabsContent>
          <TabsContent value="chats" key="chats" className="p-1">
            <TabChatMessage />
          </TabsContent>
          <div ref={endRef}></div>
        </div>
        <TabsList className="flex justify-start">
          <TabsTrigger value="ranking">LOL牌位</TabsTrigger>
          <TabsTrigger value="vod">VOD</TabsTrigger>
          <TabsTrigger value="chats">聊天室</TabsTrigger>
          <div className="ml-auto p-2 flex justify-center items-center gap-1">
            <Tooltip message="更新紀錄">
              <span
                title="更新紀錄"
                className="text-gray-400  hover:text-blue-800 transition duration-300 ease-in-out cursor-pointer"
                onClick={() => openURL('src/pages/updates/index.html')}
              >
                v{__APP_VERSION__}
              </span>
            </Tooltip>
            <Tooltip message="設定">
              <FontAwesomeIcon
                title="設定"
                icon={faGear}
                className="text-gray-400  hover:text-blue-800 transition duration-300 ease-in-out cursor-pointer hover:animate-spin"
                onClick={() => openURL('src/pages/options/index.html')}
              />
            </Tooltip>
          </div>
        </TabsList>
      </Tabs>
    </div>
  );
}
