import { useEffect, useState } from 'react';

export const useVodList = () => {
  const [vods, setVods] = useState([]);

  useEffect(() => {
    console.log('get vod list');
    chrome.storage?.local?.get('vodList', ({ vodList }) => {
      if (Array.isArray(vodList)) {
        console.log('vodList', vodList);
        setVods(vodList as []);
      }
    });
  }, []);

  return [vods] as const;
};
