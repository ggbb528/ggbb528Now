import { VOD } from '../models/vod-type';
import { useQuery } from '@tanstack/react-query';

export default function useVODList() {
  const fetchVOD = async () => {
    // store in vodList.vodList
    return chrome.storage.local.get('vodList').then(({ vodList }) => {
      if (!Array.isArray(vodList)) {
        throw new Error('vodList must be an array');
      }
      return vodList as VOD[];
    });
  };

  return useQuery({
    queryKey: ['vodList'],
    queryFn: fetchVOD,
    staleTime: 60000,
  });
}
