import { Constants } from '@src/configs/constants';
import React, { useRef, useState } from 'react';
import { Account } from '../../models/account-type';
import Pill from '../Pill';
import RankingTable from '../RankingTable';
import {
  faChevronRight,
  faChevronLeft,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  const maxIndex = Constants.OPGG_ACCOUNTS.length;

  const scrollToIndex = (index: number) => {
    let nextIndex = index;
    if (nextIndex >= maxIndex) nextIndex -= maxIndex;
    if (nextIndex < 0) nextIndex += maxIndex;

    currentBtnRefs.current[nextIndex]?.scrollIntoView({
      inline: 'start',
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
          {Constants.OPGG_ACCOUNTS.map((accountInfo, i) => (
            <li
              key={accountInfo.summoner_id}
              className="nav-item flex-auto text-center cursor-pointer "
              role="presentation"
              ref={(el) => (currentBtnRefs.current[i] = el)}
            >
              <a
                className={`nav-link w-full block font-medium text-xs leading-tight uppercase rounded px-6 py-2 focus:outline-none focus:ring-0 
               ${
                 account.summonerId === accountInfo.summoner_id ? 'active' : ''
               }`}
                role="tab"
                aria-selected="true"
                onClick={() => {
                  setAccount({
                    server: accountInfo.server as 'kr' | 'tw',
                    summonerId: accountInfo.summoner_id,
                  });

                  scrollToIndex(i);
                }}
              >
                <div className="flex whitespace-nowrap gap-1 items-center">
                  <Pill bgColor="bg-yellow-500">
                    {accountInfo.server.toUpperCase()}
                  </Pill>
                  {accountInfo.account_id}
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
  const [account, setAccount] = useState<Account>({
    server: Constants.OPGG_ACCOUNTS[0].server as 'kr' | 'tw',
    summonerId: Constants.OPGG_ACCOUNTS[0].summoner_id,
  });

  return (
    <>
      <ServerOptionButtons setAccount={setAccount} account={account} />
      <ServerTabContents {...account} />
    </>
  );
}
