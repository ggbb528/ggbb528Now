import { OPGG_ACCOUNTS } from '@/configs/constants';
import { useQuery } from '@tanstack/react-query';
import { Account } from '../models/account-type';

function useGgbb528Accounts() {
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

        return accounts;
      } catch (e) {
        console.log(e);
      }
    },
    initialData: OPGG_ACCOUNTS,
    enabled: true,
  });
}

export default useGgbb528Accounts;
