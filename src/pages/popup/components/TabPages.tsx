import { Tabs, TabsList, TabsContent, TabsTrigger } from '@/components/ui/tabs';
import TabChatMessage from './tab-contents/TabChatMessage';
import TabVOD from './tab-contents/TabVOD';
import TabRankingProfile from './tab-contents/TabRankingProfile';
import { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import Tooltip from '../../../components/custom-ui/tooltip';
import { openURL } from '../utils/utility';
import TabLiveGame from './tab-contents/TabLiveGame';
import useChromeSyncStorageListener from '../hooks/useChromeSyncStorageListener';
import { OptionKeys } from '@/configs/optionKeys';
import useMultipleOPGGSpectates from '../hooks/useMultipleOPGGSpectates';
import LiveIcon from '@/components/custom-ui/liveicon';

enum TAB_PAGES {
  RANKING = 'RANKING',
  LIVEGAME = 'LIVEGAME',
  VOD = 'VOD',
  CHATS = 'CHATS',
}

export default function TabPages() {
  const [currentTab, setCurrentTab] = useState(TAB_PAGES.RANKING);
  const scrollDivRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  const [enableChat] = useChromeSyncStorageListener(
    OptionKeys.OPTION_KEY_CHAT_MESSAGE.name
  );

  const spectates = useMultipleOPGGSpectates();

  const [liveSpectates] = spectates.filter(
    (spectate) => spectate.status === 'success'
  );

  const updateScrollPositionToBottom = () => {
    requestAnimationFrame(() => {
      endRef.current?.scrollIntoView({
        block: 'end',
        inline: 'nearest',
        behavior: 'instant',
      });
    });
  };

  const onChangeTab = (tab: string) => {
    setCurrentTab(tab);

    if (tab === TAB_PAGES.CHATS) {
      updateScrollPositionToBottom();
    }
  };

  return (
    <div className="flex-1">
      <Tabs
        value={currentTab}
        onValueChange={onChangeTab}
        className="h-full flex flex-col"
      >
        <div ref={scrollDivRef} className="h-[27.75rem] overflow-auto">
          <TabsContent
            forceMount={true}
            hidden={currentTab !== TAB_PAGES.RANKING}
            value={TAB_PAGES.RANKING}
          >
            <TabRankingProfile />
          </TabsContent>
          <TabsContent
            forceMount={true}
            hidden={currentTab !== TAB_PAGES.LIVEGAME}
            value={TAB_PAGES.LIVEGAME}
          >
            <TabLiveGame />
          </TabsContent>
          <TabsContent
            forceMount={true}
            hidden={currentTab !== TAB_PAGES.VOD}
            value={TAB_PAGES.VOD}
          >
            <TabVOD />
          </TabsContent>
          <TabsContent
            forceMount={true}
            hidden={currentTab !== TAB_PAGES.CHATS}
            value={TAB_PAGES.CHATS}
          >
            <TabChatMessage />
          </TabsContent>
          <div ref={endRef}></div>
        </div>
        <TabsList className="flex justify-start">
          <TabsTrigger value={TAB_PAGES.RANKING}>LOL牌位</TabsTrigger>
          {!!liveSpectates && (
            <TabsTrigger value={TAB_PAGES.LIVEGAME}>
              <div className="flex items-center justify-center gap-1">
                <span>Live! </span>
                <LiveIcon account={liveSpectates.data?.account} />
              </div>
            </TabsTrigger>
          )}
          <TabsTrigger value={TAB_PAGES.VOD}>VOD</TabsTrigger>
          {!!enableChat && (
            <TabsTrigger value={TAB_PAGES.CHATS}>聊天室</TabsTrigger>
          )}
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
