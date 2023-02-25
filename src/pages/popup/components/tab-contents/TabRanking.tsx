import { Constants } from '@src/configs/constants';
import React, { useRef, useState } from 'react';
import useOPGGSpectates from '../../hooks/useOPGGSpectates';
import { Account } from '../../models/account-type';
import Pill from '../Pill';
import RankingTable from '../RankingTable';

interface ServerOptionButtonProps {
  className?: string;
  active?: boolean;
  setAccount: React.Dispatch<React.SetStateAction<Account>>;
  account: {
    url: string;
    summoner_id: string;
    server: string;
    account_id: string;
  };
}

function ServerOptionButton({
  className = '',
  active,
  account,
  setAccount,
}: ServerOptionButtonProps) {
  const buttonEndRef = useRef<HTMLDivElement>(null);
  const scrollToBtn = () => {
    buttonEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onClickBtn = () => {
    setAccount({
      server: account.server as 'kr' | 'tw',
      summonerId: account.summoner_id,
    });
    scrollToBtn();
  };
  return (
    <li
      className="nav-item flex-auto text-center cursor-pointer "
      role="presentation"
    >
      <a
        className={`nav-link w-full block font-medium text-xs leading-tight uppercase rounded px-6 py-2 focus:outline-none focus:ring-0 
        ${active ? 'active' : ''} ${className}`}
        role="tab"
        aria-selected="true"
        onClick={onClickBtn}
      >
        <div className="flex whitespace-nowrap gap-1 items-center">
          <Pill bgColor="bg-yellow-500">{account.server.toUpperCase()}</Pill>{' '}
          {account.account_id}
          <div ref={buttonEndRef}></div>
        </div>
      </a>
    </li>
  );
}

function ServerOptionButtons({
  account,
  setAccount,
}: {
  account: Account;
  setAccount: React.Dispatch<React.SetStateAction<Account>>;
}) {
  return (
    <div className="py-1 px-2 overflow-x-auto scrollbar-hide">
      <ul
        className="nav nav-pills flex flex-row list-none gap-2"
        id="pills-tabFill"
        role="tablist"
      >
        {Constants.OPGG_ACCOUNTS.map((accountInfo) => (
          <ServerOptionButton
            key={accountInfo.summoner_id}
            active={account.summonerId === accountInfo.summoner_id}
            account={accountInfo}
            setAccount={setAccount}
          ></ServerOptionButton>
        ))}
      </ul>
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

  const { data, error } = useOPGGSpectates({
    server: Constants.OPGG_ACCOUNTS[0].server as 'kr' | 'tw',
    summonerId: Constants.OPGG_ACCOUNTS[0].summoner_id,
  });

  console.log('err', error);
  return (
    <>
      <ServerOptionButtons setAccount={setAccount} account={account} />
      <ServerTabContents {...account} />
    </>
  );
}
