var minimumChanges = function(s, k) {
    const n = s.length;
    const INF = 1e9;

    // cost[i][j] = minimum changes to make s[i...j]
    // a semi-palindrome
    const cost = Array.from({ length: n }, () =>
        new Array(n).fill(INF)
    );

    // Precompute costs for every substring
    for (let i = 0; i < n; i++) {
        for (let len = 2; i + len <= n; len++) {
            let minCost = INF;

            // Find proper divisors of substring length
            for (let d = 1; d < len; d++) {
                if (len % d !== 0) continue;

                let changes = 0;

                // Check each group formed using divisor d
                for (let offset = 0; offset < d; offset++) {
                    let left = i + offset;
                    let right = i + len - d + offset;

                    while (left < right) {
                        if (s[left] !== s[right]) {
                            changes++;
                        }

                        left += d;
                        right -= d;
                    }
                }

                minCost = Math.min(minCost, changes);
            }

            cost[i][i + len - 1] = minCost;
        }
    }

    // DP: dp[p][i] = minimum changes to partition
    // first i characters into exactly p substrings
    const dp = Array.from({ length: k + 1 }, () =>
        new Array(n + 1).fill(INF)
    );

    dp[0][0] = 0;

    for (let p = 1; p <= k; p++) {
        for (let i = 2 * p; i <= n; i++) {
            for (let j = 2 * (p - 1); j <= i - 2; j++) {
                if (dp[p - 1][j] === INF) continue;

                dp[p][i] = Math.min(
                    dp[p][i],
                    dp[p - 1][j] + cost[j][i - 1]
                );
            }
        }
    }

    return dp[k][n];
};