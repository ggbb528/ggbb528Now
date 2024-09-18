import { useQuery } from '@tanstack/react-query';
import { Profile } from '../models/profile-type';

const OPGG_API_URL =
  'https://op.gg/api/v1.0/internal/bypass/summoners/{SERVER}/{SUMMONER_ID}';

export default function useOPGGProfile({
  limit = 10,
  lang = 'zh_TW',
  server,
  summonerId,
}: {
  limit?: number;
  lang?: string;
  server: 'kr' | 'tw';
  summonerId: string;
}) {
  // prettier-ignore
  const API_URL = OPGG_API_URL
        .replace('{SERVER}', server)
        .replace('{SUMMONER_ID}',summonerId);

  return useQuery({
    queryKey: ['profile', server, summonerId],
    queryFn: () =>
      fetch(
        `${API_URL}?${new URLSearchParams({
          hl: lang,
          limit: `${limit}`,
        })}`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error(response.statusText);
          }
          return response.json();
        })
        .then((response) => response.data as Profile),
    staleTime: 60000,
  });
}
