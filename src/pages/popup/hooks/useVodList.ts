import { useEffect, useState } from 'react';
import { VOD } from '../models/vod-type';

export const useVodList = () => {
  const [vods, setVods] = useState<VOD[]>([]);

  useEffect(() => {
    chrome.storage?.local?.get('vodList', ({ vodList }) => {
      if (Array.isArray(vodList)) {
        setVods(vodList);
      }
    });
  }, []);

  return [vods] as const;
};
