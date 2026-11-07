var assignTasks = function(servers, tasks) {
    class MinHeap {
        constructor(compare) {
            this.heap = [];
            this.compare = compare;
        }

        push(val) {
            this.heap.push(val);
            let i = this.heap.length - 1;

            while (i > 0) {
                let p = Math.floor((i - 1) / 2);

                if (this.compare(this.heap[p], val) <= 0) break;

                this.heap[i] = this.heap[p];
                i = p;
            }

            this.heap[i] = val;
        }

        pop() {
            if (this.heap.length === 0) return null;

            const top = this.heap[0];
            const last = this.heap.pop();

            if (this.heap.length > 0) {
                let i = 0;

                while (true) {
                    let left = 2 * i + 1;
                    let right = 2 * i + 2;
                    let smallest = i;

                    if (
                        left < this.heap.length &&
                        this.compare(this.heap[left], last) < 0
                    ) {
                        smallest = left;
                    }

                    if (
                        right < this.heap.length &&
                        this.compare(this.heap[right], smallest === i ? last : this.heap[smallest]) < 0
                    ) {
                        smallest = right;
                    }

                    if (smallest === i) break;

                    this.heap[i] = this.heap[smallest];
                    i = smallest;
                }

                this.heap[i] = last;
            }

            return top;
        }

        peek() {
            return this.heap[0];
        }

        size() {
            return this.heap.length;
        }
    }

    const free = new MinHeap((a, b) =>
        a[0] - b[0] || a[1] - b[1]
    );

    const busy = new MinHeap((a, b) =>
        a[0] - b[0]
    );

    for (let i = 0; i < servers.length; i++) {
        free.push([servers[i], i]);
    }

    const ans = [];
    let time = 0;

    for (let j = 0; j < tasks.length; j++) {
        time = Math.max(time, j);

        while (busy.size() > 0 && busy.peek()[0] <= time) {
            const [endTime, weight, index] = busy.pop();
            free.push([weight, index]);
        }

        if (free.size() === 0) {
            time = busy.peek()[0];

            while (busy.size() > 0 && busy.peek()[0] <= time) {
                const [endTime, weight, index] = busy.pop();
                free.push([weight, index]);
            }
        }

        const [weight, index] = free.pop();

        ans.push(index);

        busy.push([
            time + tasks[j],
            weight,
            index
        ]);
    }

    return ans;
};