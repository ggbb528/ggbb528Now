export function getSyncStorageValue<T>(key: string): Promise<T> {
  return new Promise((resolve, reject) => {
    chrome.storage.sync.get([key], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve(result[key]);
    });
  });
}

export function setSyncStorageValue<T>(key: string, value: T) {
  chrome.storage.sync.set({ [key]: value });
}

export function getLocalStorageValue<T>(key: string): Promise<T> {
  return new Promise((resolve, reject) => {
    chrome.storage.local.get([key], (result) => {
      if (chrome.runtime.lastError) {
        reject(chrome.runtime.lastError);
        return;
      }
      resolve(result[key]);
    });
  });
}

export function setLocalStorageValue<T>(key: string, value: T) {
  chrome.storage.local.set({ [key]: value });
}
