import { useQueries } from '@tanstack/react-query';
import { Data } from '../models/spectate-type';

const OPGG_API_URL =
  'https://op.gg/api/v1.0/internal/bypass/spectates/{SERVER}/{SUMMONER_ID}';

function useMultipleOPGGSpectates({
  lang = 'zh_TW',
  summoners,
}: {
  lang?: string;
  summoners: {
    server: 'kr' | 'tw';
    summonerId: string;
    accountId: string;
  }[];
}) {
  return useQueries({
    queries: summoners.map((summoner) => {
      // prettier-ignore
      const API_URL = OPGG_API_URL
            .replace('{SERVER}', summoner.server)
            .replace('{SUMMONER_ID}', summoner.summonerId);

      return {
        queryKey: ['spectates', summoner.server, summoner.summonerId],
        queryFn: () =>
          fetch(
            `${API_URL}?${new URLSearchParams({
              hl: lang,
            })}`
          )
            .then((response) => {
              if (!response.ok) {
                return Promise.reject(response);
              }
              return response.json();
            })
            .then(
              (response) => ({ ...response.data, account: summoner } as Data)
            )
            .catch((error) => {
              console.log(error);
            }),
        staleTime: 60000,
        cacheTime: 60000,
        retry: 6,
      };
    }),
  });
}

export default useMultipleOPGGSpectates;
