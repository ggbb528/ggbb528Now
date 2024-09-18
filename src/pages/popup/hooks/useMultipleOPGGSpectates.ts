import { useQueries } from '@tanstack/react-query';
import { Data } from '../models/spectate-type';
import useGgbb528Accounts from './useGgbb528Accounts';

const OPGG_API_URL =
  'https://op.gg/api/v1.0/internal/bypass/spectates/{SERVER}/{SUMMONER_ID}';

function useMultipleOPGGSpectates(lang = 'zh_TW') {
  const { data } = useGgbb528Accounts();

  const accounts = data || [];

  return useQueries({
    queries: accounts.map((account) => {
      // prettier-ignore
      const API_URL = OPGG_API_URL
            .replace('{SERVER}', account.server)
            .replace('{SUMMONER_ID}', account.summoner_id);

      return {
        queryKey: ['spectates', account.server, account.summoner_id],
        queryFn: async () => {
          const response = await fetch(
            `${API_URL}?${new URLSearchParams({
              hl: lang,
            })}`
          );

          if (!response.ok) throw new Error(response.statusText);

          const data = await response.json();

          return {
            ...data.data,
            account: {
              server: account.server,
              summonerId: account.summoner_id,
              accountId: account.account_id,
            },
          } as Data;
        },
        staleTime: 60000,
        retry: 6,
        retryDelay: 5000,
      };
    }),
  });
}

export default useMultipleOPGGSpectates;
