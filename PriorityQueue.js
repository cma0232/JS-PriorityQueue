type CompareFn<T> = (a: T, b: T) => number;

class CustomizedPriorityQueue<T> {
  private heap: T[] = [];
  private compare: CompareFn<T>;

  constructor(options: { compare: CompareFn<T> }) {
    this.compare = options.compare;
  }

  private parentIndex(index: number) {
    return Math.floor((index - 1) / 2);
  }

  private leftChildIndex(index: number) {
    return 2 * index + 1;
  }

  private rightChildIndex(index: number) {
    return 2 * index + 2;
  }

  private swap(i: number, j: number) {
    [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]];
  }

  private bubbleUp(index: number) {
    while (index > 0) {
      const parent = this.parentIndex(index);
      if (this.compare(this.heap[parent], this.heap[index]) <= 0) break;
      this.swap(parent, index);
      index = parent;
    }
  }

  private bubbleDown(index: number) {
    const length = this.heap.length;
    while (true) {
      const left = this.leftChildIndex(index);
      const right = this.rightChildIndex(index);
      let smallest = index;

      if (left < length && this.compare(this.heap[left], this.heap[smallest]) < 0) {
        smallest = left;
      }
      if (right < length && this.compare(this.heap[right], this.heap[smallest]) < 0) {
        smallest = right;
      }
      if (smallest === index) break;
      this.swap(index, smallest);
      index = smallest;
    }
  }

  enqueue(item: T) {
    this.heap.push(item);
    this.bubbleUp(this.heap.length - 1);
  }

  dequeue(): T | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const end = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.bubbleDown(0);
    }
    return min;
  }

  peek(): T | undefined {
    return this.heap[0];
  }

  size(): number {
    return this.heap.length;
  }

  isEmpty(): boolean {
    return this.heap.length === 0;
  }
}

const pq = new CustomizedPriorityQueue({
  compare: (a, b) => a - b // min heap
});

// Enqueue tasks
pq.enqueue({ name: "task1", priority: 3 });
pq.enqueue({ name: "task2", priority: 1 });
pq.enqueue({ name: "task3", priority: 2 });

// Dequeue tasks in order of priority
console.log(pq.dequeue()); // { name: "task2", priority: 1 }
console.log(pq.peek());    // { name: "task3", priority: 2 }
console.log(pq.size());    // 2
