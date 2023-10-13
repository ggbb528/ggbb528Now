import { OPGG_ACCOUNTS } from '@src/configs/constants';
import { useQuery } from '@tanstack/react-query';
import { Account } from '../models/account-type';
import useAccountLiveHistory from './useAccountLiveHistory';

function useGgbb528Accounts() {
  const { histories } = useAccountLiveHistory();

  const sortFn = (a: Account, b: Account) => {
    const aHistory = histories?.find((h) => h.summoner_id === a.summoner_id);
    const bHistory = histories?.find((h) => h.summoner_id === b.summoner_id);

    if (aHistory && bHistory) {
      const aLastGameTime = new Date(aHistory.last_game_start_time);
      const bLastGameTime = new Date(bHistory.last_game_start_time);

      return bLastGameTime.getTime() - aLastGameTime.getTime();
    }

    if (aHistory) {
      return -1;
    }

    if (bHistory) {
      return 1;
    }

    return 0;
  };

  return useQuery({
    queryKey: ['ggbb528Accounts'],
    queryFn: async () => {
      try {
        const response = await fetch(
          'https://api.ggbb528.com/api/lol/accounts.json'
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const accounts = (await response.json()) as Account[];

        return accounts.sort(sortFn);
      } catch (e) {
        console.log(e);
      }
    },
    initialData: OPGG_ACCOUNTS.sort(sortFn),
    enabled: true,
  });
}

export default useGgbb528Accounts;
