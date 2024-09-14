import moment from 'moment';
import useOPGGChampions from '../hooks/useOPGGChampions';
import useOPGGSummoners from '../hooks/useOPGGSummoners';
import { Datum, MyData, GameType as RankType } from '../models/summoner-type';
import Skeleton from './Skeleton';
import 'moment/dist/locale/zh-tw';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfinity } from '@fortawesome/free-solid-svg-icons';
import Pill from './Pill';
import { Account } from '../models/account-type';
import useOPGGProfile from '../hooks/useOPGGProfile';
import { LeagueStat } from '../models/profile-type';
import times from 'lodash/times';
import { useState } from 'react';
import Tooltip from './Tooltip';
moment.locale('zh-tw');

function LoadingRow({ borderB = true }: { borderB?: boolean }) {
  return (
    <tr className={`h-7 ${borderB ? `border-b` : 'rounded-b'}`}>
      <td className="p-1 whitespace-nowrap">
        <Skeleton className="h-4 " />
      </td>
      <td className="p-1 whitespace-nowrap">
        <Skeleton className="h-4 " />
      </td>
      <td className="p-1 whitespace-nowrap">
        <Skeleton className="h-4 " />
      </td>
      <td className="p-1 whitespace-nowrap">
        <Skeleton className="h-4 " />
      </td>
      <td className="p-1 whitespace-nowrap">
        <Skeleton className="h-4 " />
      </td>
    </tr>
  );
}

enum GameType {
  WIN = 'WIN',
  LOSE = 'LOSE',
  REMAKE = 'REMAKE',
  UNKNOWN = 'UNKNOWN',
}

function ResultBadge({ gameType }: { gameType: GameType }) {
  if (gameType === GameType.WIN)
    return <Pill className="text-white bg-blue-600">W</Pill>;
  else if (gameType === GameType.LOSE)
    return <Pill className="text-white bg-red-600">L</Pill>;
  return <Pill className="text-white bg-gray-500">R</Pill>;
}

const getKDA = (k: number, d: number, a: number) => {
  if (d === 0)
    return (
      <span>
        KDA: <FontAwesomeIcon icon={faInfinity} />
      </span>
    );
  return <span>KDA: {Math.round(((k + a) / d) * 100) / 100}</span>;
};

function getGameResult({
  is_remake,
  myData,
}: {
  is_remake: boolean;
  myData: MyData;
}) {
  if (is_remake) return GameType.REMAKE;

  const { result } = myData.stats;
  if (result.toUpperCase() === 'WIN') return GameType.WIN;
  else if (result.toUpperCase() === 'LOSE') return GameType.LOSE;

  return GameType.UNKNOWN;
}

interface RecordRowProps extends Datum {
  borderB?: boolean;
}
function RecordRow({
  borderB = true,
  myData,
  created_at,
  is_remake,
  queue_info,
}: RecordRowProps) {
  const champions = useOPGGChampions();
  const champion = champions.data?.find((x) => x.id === myData.champion_id);

  let bgColor = '';
  const gameType = getGameResult({ is_remake, myData });
  if (gameType === GameType.WIN) bgColor = 'bg-blue-200';
  else if (gameType === GameType.LOSE) bgColor = 'bg-red-100';

  return (
    <tr className={`h-7 ${borderB ? `border-b` : 'rounded-b'} ${bgColor}`}>
      <td className="p-1 text-xs whitespace-nowrap">
        <ResultBadge gameType={gameType} />
      </td>
      <td className="p-1 text-xs whitespace-nowrap">
        <Tooltip message={moment(created_at).format('LLL')}>
          {moment(created_at).fromNow()}
        </Tooltip>
      </td>
      <td className="p-1 text-xs whitespace-nowrap">
        <div className="relative inline-flex items-center">
          {queue_info.game_type === RankType.FlexRanked && (
            <Tooltip message="彈性積分">
              <span>
                {champion?.name}
                <div className="absolute inline-flex items-center justify-center w-1 h-1 text-xs bg-red-500 rounded-full -top-0 -right-1 dark:border-gray-900"></div>
              </span>
            </Tooltip>
          )}
          {queue_info.game_type !== RankType.FlexRanked && (
            <span>{champion?.name}</span>
          )}
        </div>
      </td>
      <td className="p-1 text-xs whitespace-nowrap">
        {myData.stats.kill} / {myData.stats.death} / {myData.stats.assist}
      </td>
      <td className="p-1 text-xs whitespace-nowrap text-left">
        {getKDA(myData.stats.kill, myData.stats.death, myData.stats.assist)}
      </td>
    </tr>
  );
}

function LoadingRows() {
  return (
    <>
      {times(9, (id) => (
        <LoadingRow key={id} />
      ))}
      <LoadingRow borderB={false} />
    </>
  );
}

function TableBody({
  server,
  summoner_id,
  gameType,
}: Account & { gameType: RankType }) {
  const { isLoading, isError, data } = useOPGGSummoners({
    server,
    summonerId: summoner_id,
    limit: 10,
    gameType,
  });

  if (isLoading || isError) return <LoadingRows />;
  return (
    <>
      {data?.map((datum, index) => (
        <RecordRow
          key={datum.id}
          borderB={index !== data.length - 1}
          {...datum}
        ></RecordRow>
      ))}
    </>
  );
}

interface StatProps {
  isLoading: boolean;
  leagueStat?: LeagueStat;
}

function RankBadge({ isLoading, leagueStat }: StatProps) {
  if (isLoading || !leagueStat) return <Skeleton className="h-4 w-12" />;

  let tierString = '';
  switch (`${leagueStat.tier_info.tier}`.toUpperCase()) {
    case 'CHALLENGER':
    case 'GRANDMASTER':
    case 'MASTER':
      tierString = `${leagueStat.tier_info.tier}`;
      break;
    default:
      tierString = `${leagueStat.tier_info.tier} ${leagueStat.tier_info.division}`;
  }

  return <span className="text-blue-600">{tierString}</span>;
}

function LP({ isLoading, leagueStat }: StatProps) {
  if (isLoading || !leagueStat) return <Skeleton className="h-4 w-12" />;

  return <span>{leagueStat.tier_info.lp}</span>;
}

function WinRate({ isLoading, leagueStat }: StatProps) {
  if (isLoading || !leagueStat) return <Skeleton className="h-4 w-12" />;

  const { win, lose } = leagueStat;
  if (win === null || lose === null || win === 0 || lose === 0)
    return <span>N/A</span>;

  return <span>{Math.round((win / (win + lose)) * 10000) / 100}%</span>;
}

function WinCount({ isLoading, leagueStat }: StatProps) {
  if (isLoading || !leagueStat) return <Skeleton className="h-4 w-12" />;

  return <span>{leagueStat.win}</span>;
}

function LoseCount({ isLoading, leagueStat }: StatProps) {
  if (isLoading || !leagueStat) return <Skeleton className="h-4 w-12" />;

  return <span>{leagueStat.lose}</span>;
}

function Select({
  rankType,
  setRankType,
}: {
  rankType: RankType;
  setRankType: React.Dispatch<React.SetStateAction<RankType>>;
}) {
  const options = [
    {
      label: '全部',
      value: RankType.Total,
    },
    {
      label: '單排積分',
      value: RankType.SoloRanked,
    },
  ];

  return (
    <div className="flex justify-center items-center">
      <div className="w-full">
        <select
          className="form-select form-select-sm appearance-none block w-full px-2 py-1 text-sm font-normal
    text-gray-700bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300
    rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
          aria-label=".form-select-sm"
          onChange={(option) => setRankType(option.target.value as RankType)}
          value={rankType}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default function RankingTable(account: Account) {
  const [rankType, setRankType] = useState<RankType>(RankType.Total);

  const profile = useOPGGProfile({
    server: account.server,
    summonerId: account.summoner_id,
  });

  const isProfileLoading = profile.isError || profile.isError;
  const soloRankStats = profile.data?.league_stats.find(
    (x) => x.queue_info.game_type === 'SOLORANKED'
  );

  return (
    <div className="px-2">
      <div className="flex flex-row justify-center items-center rounded bg-gray-100 px-2">
        <div className="w-3/12 flex flex-col justify-center items-center gap-1">
          <div>牌位</div>
          <div>
            <RankBadge
              isLoading={isProfileLoading}
              leagueStat={soloRankStats}
            />
          </div>
        </div>
        <div className="w-9/12 grid grid-cols-2 ">
          <div className="border-b border-black p-1 flex justify-center items-center">
            <div className="w-1/2">分數</div>
            <div className="w-1/2">
              <LP isLoading={isProfileLoading} leagueStat={soloRankStats} />
            </div>
          </div>
          <div className="border-b  border-black p-1  flex justify-center items-center">
            <div className="w-1/2">勝率</div>
            <div className="w-1/2">
              <WinRate
                isLoading={isProfileLoading}
                leagueStat={soloRankStats}
              />
            </div>
          </div>
          <div className="p-1  flex justify-center items-center">
            <div className="w-1/2">勝場</div>
            <div className="w-1/2">
              <WinCount
                isLoading={isProfileLoading}
                leagueStat={soloRankStats}
              />
            </div>
          </div>
          <div className="p-1  flex justify-center items-center">
            <div className="w-1/2">敗場</div>
            <div className="w-1/2">
              <LoseCount
                isLoading={isProfileLoading}
                leagueStat={soloRankStats}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="rounded bg-gray-100 mt-1">
        <table className="w-full">
          <thead>
            <tr>
              <th
                scope="col"
                colSpan={5}
                className="text-black  py-1 border-b border-black"
              >
                <div className=" flex justify-start items-center">
                  <div className="mx-2 w-1/3">
                    <Select rankType={rankType} setRankType={setRankType} />
                  </div>
                  <div className="flex-1 text-xl text-center">
                    近10場遊戲記錄
                  </div>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <TableBody {...account} gameType={rankType} />
          </tbody>
        </table>
      </div>
    </div>
  );
}
