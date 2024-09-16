import { OPGG_ACCOUNTS } from '@/configs/constants';
import React, { useEffect, useRef, useState } from 'react';
import { Account } from '../../models/account-type';
import Pill from '../Pill';
import RankingTable from '../RankingTable';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useGgbb528Accounts from '../../hooks/useGgbb528Accounts';
import LiveIcon from '../LiveIcon';
import useMultipleOPGGSpectates from '../../hooks/useMultipleOPGGSpectates';
import useAccountLiveHistory from '../../hooks/useAccountLiveHistory';

function ServerOptionButtons({
  account,
  setAccount,
}: {
  account: Account;
  setAccount: React.Dispatch<React.SetStateAction<Account>>;
}) {
  const menuContainerRef = useRef<HTMLDivElement>(null);
  const currentBtnRefs = useRef<(HTMLLIElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const { data: accounts } = useGgbb528Accounts();
  const maxIndex = accounts?.length || 0;
  const spectates = useMultipleOPGGSpectates();
  const { histories } = useAccountLiveHistory();

  const sortFn = (a: Account, b: Account) => {
    const aHistory = histories?.find((h) => h.summoner_id === a.summoner_id);
    const bHistory = histories?.find((h) => h.summoner_id === b.summoner_id);

    if (aHistory && bHistory) {
      const aLastGameTime = new Date(aHistory.last_game_start_time);
      const bLastGameTime = new Date(bHistory.last_game_start_time);

      return bLastGameTime.getTime() - aLastGameTime.getTime();
    }

    if (aHistory) return -1;
    if (bHistory) return 1;
    return 0;
  };

  useEffect(() => {
    accounts?.sort(sortFn);
  }, [accounts, histories]);

  const [liveSpectates] = spectates.filter(
    (spectate) => spectate.status === 'success'
  );

  const scrollToIndex = (index: number) => {
    let nextIndex = index;
    if (nextIndex >= maxIndex) nextIndex -= maxIndex;
    if (nextIndex < 0) nextIndex += maxIndex;

    currentBtnRefs.current[nextIndex]?.scrollIntoView({
      inline: 'center',
      block: 'nearest',
      behavior: 'smooth',
    });

    setCurrentIndex(nextIndex);
  };

  return (
    <div className="relative overflow-hidden flex mx-1">
      {currentIndex > 0 && (
        <div
          className={`flex items-center left-0 top-0 bottom-0 cursor-pointer`}
          onClick={() => scrollToIndex(currentIndex - 1)}
        >
          <FontAwesomeIcon icon={faChevronLeft} className="p-1" />
        </div>
      )}
      <div
        className="py-1 px-2 overflow-x-auto scrollbar-hide"
        ref={menuContainerRef}
      >
        <ul
          className="nav nav-pills flex flex-row list-none gap-2"
          id="pills-tabFill"
          role="tablist"
        >
          {accounts?.map((accountInfo, i) => (
            <li
              key={accountInfo.summoner_id}
              className="nav-item flex-auto text-center cursor-pointer "
              role="presentation"
              ref={(el) => (currentBtnRefs.current[i] = el)}
            >
              <a
                className={`nav-link w-full block font-medium text-xs leading-tight uppercase rounded px-6 py-2 focus:outline-none focus:ring-0 
               ${
                 account.summoner_id === accountInfo.summoner_id ? 'active' : ''
               }`}
                role="tab"
                aria-selected="true"
                onClick={() => {
                  setAccount({
                    ...accountInfo,
                  });

                  scrollToIndex(i);
                }}
              >
                <div className="flex whitespace-nowrap gap-2 items-center">
                  <Pill bgColor="bg-yellow-500">
                    {accountInfo.server.toUpperCase()}
                  </Pill>
                  <span>{accountInfo.account_id}</span>
                  {liveSpectates?.data?.account.summonerId ===
                    accountInfo.summoner_id && <LiveIcon showTooltip={false} />}
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
      {currentIndex < maxIndex - 1 && (
        <div
          className="flex items-center right-0 top-0 bottom-0 cursor-pointer"
          onClick={() => scrollToIndex(currentIndex + 1)}
        >
          <FontAwesomeIcon icon={faChevronRight} className="p-1" />
        </div>
      )}
    </div>
  );
}

interface ServerTabContentProps {
  className?: string;
  children?: React.ReactNode;
}

function ServerTabContent({ className = '', children }: ServerTabContentProps) {
  return (
    <div
      className={`tab-pane fade show active
      ${className}`}
    >
      {children}
    </div>
  );
}

function ServerTabContents(props: Account) {
  return (
    <div className="tab-content" id="pills-tabContentFill">
      <ServerTabContent>
        <RankingTable {...props} />
      </ServerTabContent>
    </div>
  );
}

export default function TabRanking() {
  const { data: accounts } = useGgbb528Accounts();
  const [account, setAccount] = useState<Account>(OPGG_ACCOUNTS[0]);

  useEffect(() => {
    if (!accounts) return;
    if (accounts.length === 0) return;

    setAccount(accounts[0]);
  }, [accounts]);

  return (
    <>
      <ServerOptionButtons setAccount={setAccount} account={account} />
      <ServerTabContents {...account} />
    </>
  );
}
