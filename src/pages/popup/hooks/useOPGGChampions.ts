import { Champion } from './../models/champion-type';
import { useQuery } from '@tanstack/react-query';

const API_URL = 'https://op.gg/api/v1.0/internal/bypass/meta/champions';

export default function useOPGGChampions(lang = 'zh_TW') {
  return useQuery({
    queryKey: ['champions'],
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
        .then((response) => response.data as Champion[]),
    staleTime: Infinity,
  });
}
