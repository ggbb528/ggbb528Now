import useChromeLocalStorageListener from './useChromeLocalStorageListener';
import { AccountLiveRecord } from '../models/accountLiveRecord-type';

function useAccountLiveHistory() {
  const [histories, setHistories] = useChromeLocalStorageListener<
    AccountLiveRecord[]
  >('ACCOUNT_LIVE_HISTORY');

  // get history by account_id
  const getLiveHistoryRecord = (summoner_id: string) => {
    return histories?.find((history) => history.summoner_id === summoner_id);
  };

  // insert / update history into histories
  const setLiveHistoryRecord = (history: AccountLiveRecord) => {
    const remainingRecords =
      histories?.filter((h) => h.summoner_id !== history.summoner_id) || [];

    setHistories([history, ...remainingRecords]);
  };

  return { histories, getLiveHistoryRecord, setLiveHistoryRecord };
}

export default useAccountLiveHistory;
