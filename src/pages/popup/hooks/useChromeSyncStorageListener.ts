import { useEffect, useState } from 'react';

export default function useChromeSyncStorageListener<T>(
  key: string
): [T | null, (newValue: T) => void] {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    chrome.storage.sync.get([key], (result) => {
      setValue(result[key]);
    });

    const onChanged = (changes: any, areaName: string) => {
      if (areaName === 'sync' && key in changes) {
        setValue(changes[key].newValue);
      }
    };

    chrome.storage.onChanged.addListener(onChanged);

    return () => {
      chrome.storage.onChanged.removeListener(onChanged);
    };
  }, [key]);

  const setSyncStorageValue = (newValue: T) => {
    chrome.storage.sync.set({ [key]: newValue }, () => {
      setValue(newValue);
    });
  };

  return [value, setSyncStorageValue];
}
