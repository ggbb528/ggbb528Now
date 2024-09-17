import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import useChromeSyncStorageListener from '../hooks/useChromeSyncStorageListener';
import { openURL } from '../utils/utility';
import { OptionKeys } from '@/configs/optionKeys';
import useMultipleOPGGSpectates from '../hooks/useMultipleOPGGSpectates';
import Tooltip from '../../../components/custom-ui/tooltip';
import useGgbb528Accounts from '../hooks/useGgbb528Accounts';
import useAccountLiveHistory from '../hooks/useAccountLiveHistory';
import LiveIcon from '../../../components/custom-ui/liveicon';

interface TabItemProps {
  target: string;
  className?: string;
  active?: boolean;
  children?: React.ReactNode;
}
function TabItem(props: TabItemProps) {
  return (
    <li className="nav-item" role="presentation">
      <a
        href={`#${props.target}`}
        className={`nav-link block font-medium text-xs leading-tight uppercase border-x-0 border-t-2 
        border-b-0 border-transparent p-2 hover:border-transparent hover:bg-gray-100 focus:border-transparent
        ${props.active ? 'active' : ''} ${props.className} `}
        id={`${props.target}-tab`}
        data-bs-toggle="pill"
        data-bs-target={`#${props.target}`}
        role="tab"
        aria-controls={`${props.target}`}
        aria-selected="true"
      >
        {props.children}
      </a>
    </li>
  );
}

interface TabProps {
  className?: string;
  children?: React.ReactNode;
}
function Tab(props: TabProps) {
  return (
    <ul
      className={`nav nav-tabs flex flex-row flex-wrap list-none border-b-0 pl-0 ${props.className}`}
      id="tabs-tab"
      role="tablist"
    >
      {props.children}
    </ul>
  );
}

export default function NavigatorBar() {
  const handleClickVersion = () => {
    openURL('src/pages/updates/index.html');
  };

  const handleClickOptions = () => {
    openURL('src/pages/options/index.html');
  };

  const [enableChat] = useChromeSyncStorageListener(
    OptionKeys.OPTION_KEY_CHAT_MESSAGE.name
  );

  const { setLiveHistoryRecord } = useAccountLiveHistory();

  const spectates = useMultipleOPGGSpectates();

  const [liveSpectates] = spectates.filter(
    (spectate) => spectate.status === 'success'
  );

  useEffect(() => {
    if (!liveSpectates?.data) return;

    const summoner_id = liveSpectates.data.account.summonerId;
    const last_game_start_time = liveSpectates.data.created_at;
    setLiveHistoryRecord({ summoner_id, last_game_start_time });
  }, [liveSpectates]);

  return (
    <div className="flex flex-row justify-start items-center">
      <div className="mr-auto">
        <Tab>
          <TabItem target="ranking" active>
            LOL 牌位
          </TabItem>
          {liveSpectates && (
            <TabItem target="liveGame">
              <div className="flex items-center justify-center gap-1">
                <span>Live! </span>
                <LiveIcon />
              </div>
            </TabItem>
          )}
          {/* <TabItem target="statistics">LOL 數據 </TabItem> */}
          <TabItem target="vod">VOD</TabItem>
          {enableChat !== false && <TabItem target="chat">聊天室</TabItem>}
        </Tab>
      </div>
      <div className="p-2 flex justify-center items-center gap-1">
        <Tooltip message="更新紀錄">
          <span
            title="更新紀錄"
            className="text-gray-400  hover:text-blue-800 transition duration-300 ease-in-out cursor-pointer"
            onClick={handleClickVersion}
          >
            v{__APP_VERSION__}
          </span>
        </Tooltip>
        <Tooltip message="設定">
          <FontAwesomeIcon
            title="設定"
            icon={faGear}
            className="text-gray-400  hover:text-blue-800 transition duration-300 ease-in-out cursor-pointer hover:animate-spin"
            onClick={handleClickOptions}
          />
        </Tooltip>
      </div>
    </div>
  );
}
