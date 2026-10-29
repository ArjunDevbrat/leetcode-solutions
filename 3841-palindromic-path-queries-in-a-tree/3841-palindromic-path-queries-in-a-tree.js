
var palindromePath = function(n, edges, s, queries) {
    const adj = Array.from({ length: n }, () => []);

    for (const [u, v] of edges) {
        adj[u].push(v);
        adj[v].push(u);
    }

    const LOG = 17;
    const parent = Array(n).fill(0);
    const depth = Array(n).fill(0);
    const tin = Array(n).fill(0);
    const tout = Array(n).fill(0);
    const mask = Array(n).fill(0);
    let timer = 0;

    const stack = [[0, -1, 0]];

    while (stack.length) {
        const [u, p, state] = stack.pop();

        if (state === 0) {
            parent[u] = p === -1 ? u : p;
            tin[u] = timer++;
            mask[u] = 1 << (s.charCodeAt(u) - 97);

            if (p !== -1) depth[u] = depth[p] + 1;

            stack.push([u, p, 1]);

            for (let i = adj[u].length - 1; i >= 0; i--) {
                const v = adj[u][i];
                if (v !== p) stack.push([v, u, 0]);
            }
        } else {
            tout[u] = timer;
        }
    }

    const up = Array.from(
        { length: LOG },
        () => Array(n).fill(0)
    );

    for (let u = 0; u < n; u++) {
        up[0][u] = parent[u];
    }

    for (let j = 1; j < LOG; j++) {
        for (let u = 0; u < n; u++) {
            up[j][u] = up[j - 1][up[j - 1][u]];
        }
    }

    function lca(u, v) {
        if (depth[u] < depth[v]) [u, v] = [v, u];

        let diff = depth[u] - depth[v];

        for (let j = 0; j < LOG; j++) {
            if ((diff >> j) & 1) u = up[j][u];
        }

        if (u === v) return u;

        for (let j = LOG - 1; j >= 0; j--) {
            if (up[j][u] !== up[j][v]) {
                u = up[j][u];
                v = up[j][v];
            }
        }

        return parent[u];
    }

    const bit = Array(n + 1).fill(0);

    function add(i, val) {
        for (i++; i <= n; i += i & -i) {
            bit[i] ^= val;
        }
    }

    function prefix(i) {
        let res = 0;
        for (i++; i > 0; i -= i & -i) {
            res ^= bit[i];
        }
        return res;
    }

    function rangeUpdate(l, r, val) {
        add(l, val);
        if (r < n) add(r, val);
    }

    function rootMask(u) {
        return prefix(tin[u]);
    }

    for (let u = 0; u < n; u++) {
        rangeUpdate(tin[u], tout[u], mask[u]);
    }

    const answer = [];
    const chars = s.split('');

    for (const q of queries) {
        const parts = q.split(' ');

        if (parts[0] === 'update') {
            const u = Number(parts[1]);
            const c = parts[2];

            const newMask = 1 << (c.charCodeAt(0) - 97);
            const delta = mask[u] ^ newMask;

            rangeUpdate(tin[u], tout[u], delta);

            mask[u] = newMask;
            chars[u] = c;
        } else {
            const u = Number(parts[1]);
            const v = Number(parts[2]);
            const w = lca(u, v);

            const pathMask =
                rootMask(u) ^
                rootMask(v) ^
                mask[w];

            answer.push(
                (pathMask & (pathMask - 1)) === 0
            );
        }
    }

    return answer;
};
