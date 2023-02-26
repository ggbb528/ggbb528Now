import { Constants } from '@src/configs/constants';
import moment from 'moment';
import useMultipleOPGGSpectates from '../../hooks/useMultipleOPGGSpectates';
import {
  Account,
  ChampionsByID,
  Data,
  Participant,
  TierInfo,
} from '../../models/spectate-type';
import 'moment/dist/locale/zh-tw';
import Pill from '../Pill';
import { useEffect, useState } from 'react';
moment.locale('zh-tw');

function CurrentGameTime({ createTime }: { createTime: Date }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const intervalID = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalID);
    };
  }, []);

  const gameTime = moment
    .utc(moment(time).diff(moment(createTime)))
    .format('mm:ss');

  return <span>遊戲時間: {gameTime}</span>;
}

function getWinLosePercentage(win?: number, lose?: number) {
  if (win === undefined || lose === undefined || win === 0 || lose === 0)
    return 'N/A';
  else return Math.round((win / (win + lose)) * 10000) / 100 + ' %';
}

function getTier(tierInfo?: TierInfo) {
  if (!tierInfo) return 'N/A';

  let tierString = '';
  switch (tierInfo.tier) {
    case 'CHALLENGER':
    case 'GRANDMASTER':
    case 'MASTER':
      tierString = `${tierInfo.tier}`;
      break;
    default:
      tierString = `${tierInfo.tier} ${tierInfo.division}`;
  }

  return tierString;
}

function TeamTable({
  account,
  players,
  champions,
  team,
}: {
  account: Account;
  players: Participant[];
  champions: { [key: string]: ChampionsByID };
  team: string;
}) {
  const positionMap: {
    [key: string]: { name: string; index: number };
  } = {
    TOP: { name: 'TOP', index: 0 },
    JUNGLE: { name: 'JG', index: 1 },
    MID: { name: 'MID', index: 2 },
    ADC: { name: 'ADC', index: 3 },
    SUPPORT: { name: 'SUP', index: 4 },
  };

  players.sort((p1, p2) => {
    return positionMap[p1.position.toUpperCase()].index <
      positionMap[p2.position.toUpperCase()].index
      ? -1
      : 1;
  });

  const bgColor = team === 'BLUE' ? 'bg-blue-100' : 'bg-red-100';
  const textColor = team === 'BLUE' ? 'text-blue-500' : 'text-red-600';

  return (
    <div className={`${bgColor} rounded`}>
      <table className="w-full">
        <tbody>
          {players.map((player) => {
            const soloRankStatInfo = player.summoner.league_stats.find(
              (x) => x.queue_info.game_type === 'SOLORANKED'
            );
            let tierInfo;
            if (soloRankStatInfo) {
              tierInfo = soloRankStatInfo.tier_info;
            }
            const isGGBB528 =
              player.summoner.summoner_id === account.summonerId;

            return (
              <tr
                key={player.champion_id}
                className={`${isGGBB528 ? `${textColor} font-bold` : ''}`}
              >
                <td className="p-1 w-1/6">
                  {positionMap[player.position.toUpperCase()].name}
                </td>
                <td className="p-1 ">{champions[player.champion_id].name}</td>
                <td className="p-1 ">{getTier(tierInfo)}</td>
                <td className="p-1 w-1/6">
                  {getWinLosePercentage(
                    soloRankStatInfo?.win,
                    soloRankStatInfo?.lose
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function LiveGameStatus({ gameData }: { gameData: Data }) {
  const account = gameData.account;
  const redPlayers = gameData.participants.filter((x) => x.team_key === 'RED');
  const bluePlayers = gameData.participants.filter(
    (x) => x.team_key === 'BLUE'
  );
  const [redTeam] = gameData.teams.filter((x) => x.key === 'RED');
  const [blueTeam] = gameData.teams.filter((x) => x.key === 'BLUE');
  const queue_info = gameData.queue_info;

  return (
    <div className="p-2">
      <div className="px-2 py-1 bg-gray-200 rounded font-bold text-base">
        {account.accountId} 正在進行遊戲
      </div>
      <div className="p-2 bg-white border-b flex justify-center items-center gap-2">
        <Pill bgColor="bg-yellow-500">{account.server.toUpperCase()}</Pill>
        <span className="border-x px-2">{queue_info.queue_translate}</span>
        <CurrentGameTime createTime={gameData.created_at} />
      </div>
      <div className="p-2 text-blue-500 bg-blue-100 font-bold flex gap-1 justify-between rounded my-1">
        <span>藍隊</span>
        <span>平均牌位: {getTier(blueTeam.average_tier_info)}</span>
      </div>
      <TeamTable
        account={account}
        champions={gameData.championsById}
        players={bluePlayers}
        team="BLUE"
      />
      <div className="p-2 text-red-600 bg-red-50 font-bold flex gap-1 justify-between rounded my-1">
        <span>紅隊</span>
        <span>平均牌位: {getTier(redTeam.average_tier_info)}</span>
      </div>
      <TeamTable
        account={account}
        champions={gameData.championsById}
        players={redPlayers}
        team="RED"
      />
    </div>
  );
}

function TabLiveGame() {
  const spectates = useMultipleOPGGSpectates({
    summoners: Constants.OPGG_ACCOUNTS.map((account) => ({
      server: account.server as 'kr' | 'tw',
      summonerId: account.summoner_id,
      accountId: account.account_id,
    })),
  });

  const [liveSpectates] = spectates.filter(
    (spectate) => spectate.status === 'success'
  );

  let gameData: Data | undefined = undefined;
  if (liveSpectates?.data) {
    gameData = liveSpectates.data;
  }

  return <div>{gameData && <LiveGameStatus gameData={gameData} />}</div>;
}

export default TabLiveGame;
