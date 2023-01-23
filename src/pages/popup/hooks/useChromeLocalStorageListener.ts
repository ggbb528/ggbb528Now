import { useEffect, useState } from 'react';

export default function useChromeLocalStorageListener<T>(
  key: string
): [T | null, (newValue: T) => void] {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    chrome.storage.local.get([key], (result) => {
      setValue(result[key]);
    });

    const onChanged = (changes: any, areaName: string) => {
      if (areaName === 'local' && key in changes) {
        setValue(changes[key].newValue);
      }
    };

    chrome.storage.onChanged.addListener(onChanged);

    return () => {
      chrome.storage.onChanged.removeListener(onChanged);
    };
  }, [key]);

  const setLocalStorageValue = (newValue: T) => {
    chrome.storage.local.set({ [key]: newValue }, () => {
      setValue(newValue);
    });
  };

  return [value, setLocalStorageValue];
}
