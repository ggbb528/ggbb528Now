import { Constants } from '@configs/constants';
import React, { useState } from 'react';
import { Account } from '../../models/account-type';
import Pill from '../Pill';
import RankingTable from '../RankingTable';

interface ServerOptionButtonProps {
  className?: string;
  children?: React.ReactNode;
  active?: boolean;
  target: string;
  OnClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

function ServerOptionButton({
  className = '',
  children,
  active,
  target,
  OnClick,
}: ServerOptionButtonProps) {
  return (
    <li className="nav-item flex-auto text-center " role="presentation">
      <a
        href={`#pills-${target}`}
        className={`nav-link w-full block font-medium text-xs leading-tight uppercase rounded px-6 py-2 focus:outline-none focus:ring-0 
        ${active ? 'active' : ''} ${className}`}
        id={`pills-${target}-tab`}
        data-bs-toggle="pill"
        data-bs-target={`#pills-${target}`}
        role="tab"
        aria-controls={`pills-${target}`}
        aria-selected="true"
        onClick={OnClick}
      >
        {children}
      </a>
    </li>
  );
}

function ServerOptionButtons({
  setAccount,
}: {
  setAccount: React.Dispatch<React.SetStateAction<Account>>;
}) {
  return (
    <div className="py-1 px-2">
      <ul
        className="nav nav-pills flex flex-row list-none gap-2"
        id="pills-tabFill"
        role="tablist"
      >
        <ServerOptionButton
          target="kr"
          active
          OnClick={() =>
            setAccount({
              server: 'kr',
              summonerId: Constants.OPGG_KR_SUMMONER_ID,
            })
          }
        >
          <Pill bgColor="bg-yellow-500">KR</Pill> {Constants.LOL_KR_ACCOUNT_ID}
        </ServerOptionButton>
        <ServerOptionButton
          target="tw"
          OnClick={() =>
            setAccount({
              server: 'tw',
              summonerId: Constants.OPGG_TW_SUMMONER_ID,
            })
          }
        >
          <Pill bgColor="bg-yellow-500">TW</Pill> {Constants.LOL_TW_ACCOUNT_ID}
        </ServerOptionButton>
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
    server: 'kr',
    summonerId: Constants.OPGG_KR_SUMMONER_ID,
  });
  return (
    <>
      <ServerOptionButtons setAccount={setAccount} />
      <ServerTabContents {...account} />
    </>
  );
}
