
var shortestPath = function(n, edges, labels, k) {
    const adj = Array.from({ length: n }, () => []);

    for (const [u, v, w] of edges) {
        adj[u].push([v, w]);
    }

    const K = k + 1;

    const dist = new Float64Array(n * K);
    dist.fill(Infinity);

    // Min Heap
    class MinHeap {
        constructor() {
            this.heap = [];
        }

        push(cost, id) {
            const h = this.heap;
            h.push([cost, id]);

            let i = h.length - 1;

            while (i > 0) {
                let p = (i - 1) >> 1;

                if (h[p][0] <= cost) break;

                h[i] = h[p];
                i = p;
            }

            h[i] = [cost, id];
        }

        pop() {
            const h = this.heap;
            const top = h[0];
            const last = h.pop();

            if (h.length > 0) {
                let i = 0;

                while (true) {
                    let child = 2 * i + 1;

                    if (child >= h.length) break;

                    if (
                        child + 1 < h.length &&
                        h[child + 1][0] < h[child][0]
                    ) {
                        child++;
                    }

                    if (h[child][0] >= last[0]) break;

                    h[i] = h[child];
                    i = child;
                }

                h[i] = last;
            }

            return top;
        }

        isEmpty() {
            return this.heap.length === 0;
        }
    }

    const pq = new MinHeap();

    // Start from node 0
    const startId = 1;

    dist[startId] = 0;
    pq.push(0, startId);

    while (!pq.isEmpty()) {
        const [cost, id] = pq.pop();

        const u = Math.floor(id / K);
        const count = id % K;

        if (cost !== dist[id]) continue;

        if (u === n - 1) {
            return cost;
        }

        for (const [v, w] of adj[u]) {
            let newCount;

            if (labels[u] === labels[v]) {
                newCount = count + 1;
            } else {
                newCount = 1;
            }

            if (newCount > k) continue;

            const newCost = cost + w;
            const newId = v * K + newCount;

            if (newCost < dist[newId]) {
                dist[newId] = newCost;
                pq.push(newCost, newId);
            }
        }
    }

    return -1;
};
