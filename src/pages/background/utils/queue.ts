export class FixedLengthQueue<T> {
  private data: T[];
  private maxLength: number;

  constructor(maxLength: number) {
    this.data = [];
    this.maxLength = maxLength;
  }

  enqueue(item: T): void {
    if (this.data.length === this.maxLength) {
      this.data.shift();
    }
    this.data.push(item);
  }

  dequeue(): T | undefined {
    return this.data.shift();
  }

  peek(): T | undefined {
    return this.data[0];
  }

  toArray() {
    return this.data;
  }

  clear() {
    this.data = [];
  }

  get length(): number {
    return this.data.length;
  }

  get maximumLength(): number {
    return this.maxLength;
  }
}
