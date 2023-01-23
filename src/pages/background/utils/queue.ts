import { getLocalStorageValue, setLocalStorageValue } from './storage';

export class FixedLengthQueue<T> {
  private data: T[];
  private maxLength: number;
  private localStorageKey: string;

  constructor(maxLength: number, localStorageKey: string) {
    this.data = [];
    this.maxLength = maxLength;
    this.localStorageKey = localStorageKey;

    // restore data from chrome.storage.local
    this.restoreFromStorage();
  }

  async restoreFromStorage() {
    try {
      const storageData = await getLocalStorageValue<T[]>(this.localStorageKey);
      if (storageData !== undefined) {
        this.data = storageData;
      }
    } catch (e) {
      console.log(e);
    }
  }

  updateToStorage() {
    setLocalStorageValue(this.localStorageKey, this.data);
  }

  enqueue(item: T): void {
    if (this.data.length === this.maxLength) {
      this.data.shift();
    }
    this.data.push(item);
    this.updateToStorage();
  }

  dequeue(): T | undefined {
    const output = this.data.shift();
    this.updateToStorage();
    return output;
  }

  peek(): T | undefined {
    return this.data[0];
  }

  toArray() {
    return this.data;
  }

  clear() {
    this.data = [];
    this.updateToStorage();
  }

  get length(): number {
    return this.data.length;
  }

  get maximumLength(): number {
    return this.maxLength;
  }
}
