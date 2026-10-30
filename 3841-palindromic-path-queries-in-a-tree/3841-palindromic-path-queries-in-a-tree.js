
var palindromePath = function(n, edges, s, queries) {
    const adj = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const LOG = 16;

    const parent = new Array(n).fill(-1);
    const depth = new Array(n).fill(0);
    const tin = new Array(n);
    const tout = new Array(n);
    const mask = new Array(n);

    // Iterative DFS + Euler Tour
    const order = [];
    const stack = [0];

    while (stack.length) {
        const u = stack.pop();

        tin[u] = order.length + 1;
        order.push(u);

        for (const v of adj[u]) {
            if (v === parent[u]) continue;

            parent[v] = u;
            depth[v] = depth[u] + 1;
            stack.push(v);
        }
    }

    const size = new Array(n).fill(1);

    for (let i = n - 1; i >= 0; i--) {
        const u = order[i];

        if (parent[u] !== -1) {
            size[parent[u]] += size[u];
        }

        tout[u] = tin[u] + size[u] - 1;

        mask[u] = 1 << (s.charCodeAt(u) - 97);
    }

    // Binary Lifting
    const up = Array.from(
        { length: LOG },
        () => new Int32Array(n).fill(-1)
    );

    for (let i = 0; i < n; i++) {
        up[0][i] = parent[i];
    }

    for (let j = 1; j < LOG; j++) {
        for (let i = 0; i < n; i++) {
            const p = up[j - 1][i];

            if (p !== -1) {
                up[j][i] = up[j - 1][p];
            }
        }
    }

    function lca(a, b) {
        if (depth[a] < depth[b]) {
            [a, b] = [b, a];
        }

        let diff = depth[a] - depth[b];

        for (let j = 0; j < LOG; j++) {
            if ((diff >> j) & 1) {
                a = up[j][a];
            }
        }

        if (a === b) return a;

        for (let j = LOG - 1; j >= 0; j--) {
            if (up[j][a] !== up[j][b]) {
                a = up[j][a];
                b = up[j][b];
            }
        }

        return parent[a];
    }

    // Fenwick Tree with XOR range updates
    class Fenwick {
        constructor(n) {
            this.n = n;
            this.bit = new Int32Array(n + 2);
        }

        update(i, val) {
            while (i <= this.n) {
                this.bit[i] ^= val;
                i += i & -i;
            }
        }

        query(i) {
            let res = 0;

            while (i > 0) {
                res ^= this.bit[i];
                i -= i & -i;
            }

            return res;
        }

        rangeUpdate(l, r, val) {
            this.update(l, val);
            this.update(r + 1, val);
        }
    }

    const bit = new Fenwick(n + 1);

    // Initialize subtree range XOR
    for (let u = 0; u < n; u++) {
        bit.rangeUpdate(tin[u], tout[u], mask[u]);
    }

    const ans = [];

    for (const q of queries) {
        const parts = q.split(" ");

        if (parts[0] === "update") {
            const u = Number(parts[1]);
            const c = parts[2];

            const newMask = 1 << (c.charCodeAt(0) - 97);

            const diff = mask[u] ^ newMask;

            bit.rangeUpdate(tin[u], tout[u], diff);

            mask[u] = newMask;
        } 
        else {
            const u = Number(parts[1]);
            const v = Number(parts[2]);

            const w = lca(u, v);

            const pathMask =
                bit.query(tin[u]) ^
                bit.query(tin[v]) ^
                mask[w];

            ans.push(
                (pathMask & (pathMask - 1)) === 0
            );
        }
    }

    return ans;
};
