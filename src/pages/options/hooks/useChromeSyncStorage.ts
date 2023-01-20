import { useEffect, useState } from 'react';

export default function useChromeSyncStorage<T>(
  key: string,
  defaultValue: T
): [T, (newValue: T) => void] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    chrome.storage.sync.get([key], (result: { [key: string]: T }) => {
      setValue(result[key]);
    });
  }, [key]);

  function setChromeSyncStorageValue(newValue: T) {
    setValue(newValue);
    chrome.storage.sync.set({ [key]: newValue });
  }

  return [value, setChromeSyncStorageValue];
}
