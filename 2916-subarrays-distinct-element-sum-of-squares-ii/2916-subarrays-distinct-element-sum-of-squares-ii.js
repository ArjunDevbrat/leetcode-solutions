
var sumCounts = function(nums) {
    const MOD = 1000000007;
    const n = nums.length;
    const size = 4 * n;

    const sum = new Float64Array(size);
    const sq = new Float64Array(size);
    const lazy = new Float64Array(size);

    function update(node, start, end, l, r) {
        if (l > end || r < start) return;

        if (l <= start && end <= r) {
            sq[node] = (sq[node] + 2 * sum[node] + (end - start + 1)) % MOD;
            sum[node] = (sum[node] + end - start + 1) % MOD;
            lazy[node]++;
            return;
        }

        const mid = Math.floor((start + end) / 2);
        const left = node * 2;
        const right = left + 1;

        if (lazy[node] !== 0) {
            const v = lazy[node];

            sq[left] = (sq[left] + 2 * v * sum[left] + v * v * (mid - start + 1)) % MOD;
            sum[left] = (sum[left] + v * (mid - start + 1)) % MOD;
            lazy[left] += v;

            sq[right] = (sq[right] + 2 * v * sum[right] + v * v * (end - mid)) % MOD;
            sum[right] = (sum[right] + v * (end - mid)) % MOD;
            lazy[right] += v;

            lazy[node] = 0;
        }

        if (l <= mid) update(left, start, mid, l, r);
        if (r > mid) update(right, mid + 1, end, l, r);

        sum[node] = (sum[left] + sum[right]) % MOD;
        sq[node] = (sq[left] + sq[right]) % MOD;
    }

    let last = new Map();
    let ans = 0;

    for (let i = 0; i < n; i++) {
        let prev = last.has(nums[i]) ? last.get(nums[i]) : -1;

        update(1, 0, n - 1, prev + 1, i);

        ans = (ans + sq[1]) % MOD;
        last.set(nums[i], i);
    }

    return ans;
};
