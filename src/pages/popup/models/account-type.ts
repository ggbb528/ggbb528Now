export interface Account {
  url: string;
  summoner_id: string;
  server: 'kr' | 'tw';
  account_id: string;
  is_live?: boolean;
}
