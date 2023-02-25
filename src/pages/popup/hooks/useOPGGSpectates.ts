import { useQuery } from '@tanstack/react-query';
import { Data } from '../models/spectate-type';

const OPGG_API_URL =
  'https://op.gg/api/v1.0/internal/bypass/spectates/{SERVER}/{SUMMONER_ID}';

function useOPGGSpectates({
  lang = 'zh_TW',
  server,
  summonerId,
}: {
  lang?: string;
  server: 'kr' | 'tw';
  summonerId: string;
}) {
  // prettier-ignore
  const API_URL = OPGG_API_URL
    .replace('{SERVER}', server)
    .replace('{SUMMONER_ID}',summonerId);

  return useQuery({
    queryKey: ['spectates', server, summonerId],
    queryFn: () =>
      fetch(
        `${API_URL}?${new URLSearchParams({
          hl: lang,
        })}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((response) => response.data as Data),
    staleTime: 60000,
    cacheTime: 60000,
  });
}

export default useOPGGSpectates;
