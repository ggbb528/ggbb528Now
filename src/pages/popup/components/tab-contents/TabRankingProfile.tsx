import { useEffect, useRef, useState } from 'react';
import useGgbb528Accounts from '../../hooks/useGgbb528Accounts';
import { Account } from '../../models/account-type';
import { OPGG_ACCOUNTS } from '@/configs/constants';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useOPGGProfile from '../../hooks/useOPGGProfile';
import { Datum, GameType as RankType } from '../../models/summoner-type';
import { LeagueStat } from '../../models/profile-type';
import { Skeleton } from '@/components/ui/skeleton';
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import useOPGGSummoners from '../../hooks/useOPGGSummoners';
import moment from 'moment';
import 'moment/dist/locale/zh-tw';
import useOPGGChampions from '../../hooks/useOPGGChampions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfinity } from '@fortawesome/free-solid-svg-icons';
import CustomTooltip from '@/components/custom-ui/tooltip';
import {
  TooltipContent,
  TooltipTrigger,
  Tooltip,
} from '@/components/ui/tooltip';
import useMultipleOPGGSpectates from '../../hooks/useMultipleOPGGSpectates';
import LiveIcon from '@/components/custom-ui/liveicon';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
moment.locale('zh-tw');

enum GameType {
  WIN = 'WIN',
  LOSE = 'LOSE',
  REMAKE = 'REMAKE',
  UNKNOWN = 'UNKNOWN',
}

const getGameType = (game: Datum) => {
  if (game.is_remake) return GameType.REMAKE;
  if (`${game.myData.stats.result}`.toUpperCase() === GameType.WIN)
    return GameType.WIN;
  if (`${game.myData.stats.result}`.toUpperCase() === GameType.LOSE)
    return GameType.LOSE;

  return GameType.UNKNOWN;
};

const getRowBackgroundColor = (game: Datum) => {
  const gameType = getGameType(game);

  switch (gameType) {
    case GameType.WIN:
      return 'bg-blue-200';
    case GameType.LOSE:
      return 'bg-red-100';
    case GameType.REMAKE:
    default:
      return '';
  }
};

const getGameResultBadge = (game: Datum) => {
  const gameType = getGameType(game);

  switch (gameType) {
    case GameType.WIN:
      return <Badge variant="blue">W</Badge>;
    case GameType.LOSE:
      return <Badge variant="red">L</Badge>;
    case GameType.REMAKE:
      return <Badge variant="yellow">R</Badge>;
    default:
      return <Badge variant="gray">UN</Badge>;
  }
};

const getKDA = (game: Datum) => {
  const k = game.myData.stats.kill;
  const d = game.myData.stats.death;
  const a = game.myData.stats.assist;

  if (d === 0)
    return (
      <span>
        KDA: <FontAwesomeIcon icon={faInfinity} />
      </span>
    );
  return <span>KDA: {Math.round(((k + a) / d) * 100) / 100}</span>;
};

function LoadingTableRows({
  rows = 10,
  cols = 5,
}: {
  rows?: number;
  cols?: number;
}) {
  return (
    <>
      {Array.from({ length: rows }).map((_, idx) => (
        <TableRow key={idx}>
          {Array.from({ length: cols }).map((_, idy) => (
            <TableCell key={idy}>
              <Skeleton className="h-5 w-full rounded-lg" />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
}

function getGameTime(game: Datum) {
  const gameTime = moment(game.created_at).fromNow();
  const gameDetailTime = moment(game.created_at).format('LLL');
  return (
    <Tooltip>
      <TooltipTrigger>{gameTime}</TooltipTrigger>
      <TooltipContent side="bottom">{gameDetailTime}</TooltipContent>
    </Tooltip>
  );
}

function GameHistoryTable({ account }: { account: Account }) {
  const [rankType, setRankType] = useState<RankType>(RankType.Total);
  const { data: champions } = useOPGGChampions();

  const { isLoading, data: games } = useOPGGSummoners({
    server: account.server,
    summonerId: account.summoner_id,
    limit: 10,
    gameType: rankType,
  });

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

  const getChampion = (game: Datum) => {
    if (!champions) return <></>;
    const championId = game.myData?.champion_id;
    const championName =
      champions.find((champion) => champion.id === championId)?.name || '';

    if (game.queue_info.game_type === RankType.FlexRanked) {
      return (
        <CustomTooltip message="彈性積分" position="bottom">
          <span>
            {championName}
            <div className="absolute inline-flex items-center justify-center w-1 h-1 text-xs bg-red-500 rounded-full -top-0 -right-1 dark:border-gray-900"></div>
          </span>
        </CustomTooltip>
      );
    }

    return <span>{championName}</span>;
  };

  return (
    <div className="rounded bg-gray-100 py-1">
      <div className="flex justify-start items-center border-b border-black pb-1">
        <div className="mx-2 w-1/3">
          <Select
            value={rankType}
            onValueChange={(option) => setRankType(option as RankType)}
          >
            <SelectTrigger>
              <SelectValue></SelectValue>
            </SelectTrigger>
            <SelectContent>
              {options.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 text-base text-center font-bold">
          近10場遊戲記錄
        </div>
      </div>
      <Table className="text-xs">
        <TableBody>
          {isLoading && <LoadingTableRows />}
          {games?.map((game) => (
            <TableRow key={game.id} className={getRowBackgroundColor(game)}>
              <TableCell>{getGameResultBadge(game)}</TableCell>
              <TableCell>{getGameTime(game)}</TableCell>
              <TableCell>{getChampion(game)}</TableCell>
              <TableCell>
                <div className="space-x-1">
                  <span>{game.myData.stats.kill}</span>
                  <span>/</span>
                  <span>{game.myData.stats.death}</span>
                  <span>/</span>
                  <span>{game.myData.stats.assist}</span>
                </div>
              </TableCell>
              <TableCell className="text-left">{getKDA(game)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

function RankBadge({
  isLoading,
  leagueStat,
}: {
  isLoading: boolean;
  leagueStat?: LeagueStat;
}) {
  if (isLoading || !leagueStat) return <Skeleton className="h-4 w-12" />;

  let tierString = '';
  switch (`${leagueStat.tier_info.tier}`.toUpperCase()) {
    case 'CHALLENGER':
    case 'GRANDMASTER':
    case 'MASTER':
      tierString = `${leagueStat.tier_info.tier || ''}`;
      break;
    default:
      tierString = `${leagueStat.tier_info.tier || ''} ${
        leagueStat.tier_info.division || ''
      }`;
  }

  return <span className="text-blue-600">{tierString}</span>;
}

function LP({
  isLoading,
  leagueStat,
}: {
  isLoading: boolean;
  leagueStat?: LeagueStat;
}) {
  if (isLoading || !leagueStat) return <Skeleton className="h-4 w-12" />;

  return <span>{leagueStat.tier_info.lp}</span>;
}

function WinRate({
  isLoading,
  leagueStat,
}: {
  isLoading: boolean;
  leagueStat?: LeagueStat;
}) {
  if (isLoading || !leagueStat) return <Skeleton className="h-4 w-12" />;

  const { win, lose } = leagueStat;
  if (win === null || lose === null || win === 0 || lose === 0)
    return <span>N/A</span>;

  return <span>{Math.round((win / (win + lose)) * 10000) / 100}%</span>;
}

function WinCount({
  isLoading,
  leagueStat,
}: {
  isLoading: boolean;
  leagueStat?: LeagueStat;
}) {
  if (isLoading || !leagueStat) return <Skeleton className="h-4 w-12" />;

  return <span>{leagueStat.win}</span>;
}

function LoseCount({
  isLoading,
  leagueStat,
}: {
  isLoading: boolean;
  leagueStat?: LeagueStat;
}) {
  if (isLoading || !leagueStat) return <Skeleton className="h-4 w-12" />;

  return <span>{leagueStat.lose}</span>;
}

function RankingProfile({ account }: { account: Account }) {
  const { data: profile, isLoading } = useOPGGProfile({
    server: account.server,
    summonerId: account.summoner_id,
  });

  const soloRankStats = profile?.league_stats.find(
    (x) => x.queue_info.game_type === 'SOLORANKED'
  );

  return (
    <div>
      <div className="flex flex-row justify-center items-center rounded bg-gray-100 px-2">
        <div className="w-3/12 flex flex-col justify-center items-center gap-1">
          <div>牌位</div>
          <div>
            <RankBadge isLoading={isLoading} leagueStat={soloRankStats} />
          </div>
        </div>
        <div className="w-9/12 grid grid-cols-2 ">
          <div className="border-b border-black p-1 flex justify-center items-center">
            <div className="w-1/2">分數</div>
            <div className="w-1/2">
              <LP isLoading={isLoading} leagueStat={soloRankStats} />
            </div>
          </div>
          <div className="border-b  border-black p-1  flex justify-center items-center">
            <div className="w-1/2">勝率</div>
            <div className="w-1/2">
              <WinRate isLoading={isLoading} leagueStat={soloRankStats} />
            </div>
          </div>
          <div className="p-1  flex justify-center items-center">
            <div className="w-1/2">勝場</div>
            <div className="w-1/2">
              <WinCount isLoading={isLoading} leagueStat={soloRankStats} />
            </div>
          </div>
          <div className="p-1  flex justify-center items-center">
            <div className="w-1/2">敗場</div>
            <div className="w-1/2">
              <LoseCount isLoading={isLoading} leagueStat={soloRankStats} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AccountButton({
  account,
  actived,
  onClick,
}: {
  account: Account;
  actived: boolean;
  onClick: () => void;
}) {
  const spectates = useMultipleOPGGSpectates();

  const [liveSpectates] = spectates.filter(
    (spectate) => spectate.status === 'success'
  );

  return (
    <Button
      variant={actived ? 'actived' : 'inactived'}
      className="flex justify-center items-center space-x-2 text-xs w-full"
      onClick={onClick}
    >
      <Badge className="uppercase" variant="yellow">
        {account.server}
      </Badge>
      <span>{account.account_id}</span>
      {liveSpectates?.data?.account.summonerId === account.summoner_id && (
        <LiveIcon showTooltip={false} />
      )}
    </Button>
  );
}

function AccountsCarousel({
  accounts,
  currentAccount,
  setCurrentAccount,
}: {
  accounts?: Account[];
  currentAccount: Account;
  setCurrentAccount: React.Dispatch<React.SetStateAction<Account>>;
}) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const accountBtnRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(false);

  // Update the visibility of arrows based on scroll position
  const updateArrowsVisibility = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 1);
    }
  };

  // Scroll left and right functions
  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -200, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 200, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    updateArrowsVisibility();
    const handleScroll = () => updateArrowsVisibility();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (carousel) {
        carousel.removeEventListener('scroll', handleScroll);
      }
    };
  }, [accounts]);

  const onClickAccountButton = (account: Account, index: number) => {
    setCurrentAccount(account);
    if (accountBtnRefs.current?.[index]) {
      accountBtnRefs.current[index]?.scrollIntoView({
        inline: 'center',
        block: 'nearest',
        behavior: 'smooth',
      });
    }
  };

  return (
    <div
      id="carousel-container"
      className="relative overflow-hidden flex space-x-1 items-center justify-between"
    >
      {showLeftArrow && (
        <Button
          variant="transparent"
          size="icon-xs"
          className="absolute left-0"
          onClick={scrollLeft}
        >
          <FaChevronLeft />
        </Button>
      )}
      <div
        ref={carouselRef}
        id="carousel"
        className="overflow-x-auto scrollbar-hide flex-1"
      >
        <div
          id="carousel-items-container"
          className="inline-flex space-x-2 justify-center items-center"
        >
          {accounts?.map((account, index) => (
            <div
              key={account.summoner_id}
              className="min-w-[160px]"
              ref={(el) => (accountBtnRefs.current[index] = el)}
            >
              <AccountButton
                account={account}
                actived={currentAccount.summoner_id === account.summoner_id}
                onClick={() => onClickAccountButton(account, index)}
              />
            </div>
          ))}
        </div>
      </div>
      {showRightArrow && (
        <Button
          variant="transparent"
          size="icon-xs"
          className="absolute right-0"
          onClick={scrollRight}
        >
          <FaChevronRight />
        </Button>
      )}
    </div>
  );
}

export default function TabRankingProfile() {
  const { data: accounts } = useGgbb528Accounts();
  const [currentAccount, setCurrentAccount] = useState<Account>(
    OPGG_ACCOUNTS[0]
  );

  useEffect(() => {
    if (!accounts) return;
    if (accounts.length === 0) return;

    setCurrentAccount(accounts[0]);
  }, [accounts]);

  return (
    <div className="px-1 space-y-1">
      <AccountsCarousel
        accounts={accounts}
        currentAccount={currentAccount}
        setCurrentAccount={setCurrentAccount}
      />
      <RankingProfile account={currentAccount} />
      <GameHistoryTable account={currentAccount} />
    </div>
  );
}
