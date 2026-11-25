
var smallestUniqueSubarray = function(nums) {
    const n = nums.length;

    // Build suffix array
    const sa = Array.from({ length: n }, (_, i) => i);

    let rank = Int32Array.from(nums);
    let nextRank = new Int32Array(n);

    for (let k = 1; k < n; k *= 2) {
        sa.sort((a, b) => {
            if (rank[a] !== rank[b]) {
                return rank[a] - rank[b];
            }

            const ra = a + k < n ? rank[a + k] : -1;
            const rb = b + k < n ? rank[b + k] : -1;

            return ra - rb;
        });

        let classes = 0;
        nextRank[sa[0]] = 0;

        for (let i = 1; i < n; i++) {
            const a = sa[i - 1];
            const b = sa[i];

            const a1 = rank[a];
            const b1 = rank[b];

            const a2 = a + k < n ? rank[a + k] : -1;
            const b2 = b + k < n ? rank[b + k] : -1;

            if (a1 !== b1 || a2 !== b2) {
                classes++;
            }

            nextRank[b] = classes;
        }

        [rank, nextRank] = [nextRank, rank];

        if (classes === n - 1) break;
    }

    // Store suffix positions
    const pos = new Int32Array(n);

    for (let i = 0; i < n; i++) {
        pos[sa[i]] = i;
    }

    // Build LCP array using Kasai's algorithm
    const lcp = new Int32Array(n);
    let h = 0;

    for (let i = 0; i < n; i++) {
        const r = pos[i];

        if (r === 0) {
            h = 0;
            continue;
        }

        const j = sa[r - 1];

        while (
            i + h < n &&
            j + h < n &&
            nums[i + h] === nums[j + h]
        ) {
            h++;
        }

        lcp[r] = h;

        if (h > 0) h--;
    }

    // Find the shortest unique subarray
    let ans = n;

    for (let r = 0; r < n; r++) {
        const i = sa[r];

        const shared = Math.max(
            lcp[r],
            r + 1 < n ? lcp[r + 1] : 0
        );

        if (shared < n - i) {
            ans = Math.min(ans, shared + 1);
        }
    }

    return ans;
};

