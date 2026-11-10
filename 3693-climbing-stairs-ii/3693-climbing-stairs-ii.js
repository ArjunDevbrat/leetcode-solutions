var climbStairs = function(n, costs) {
    const dp = new Array(n + 1).fill(Infinity);

    dp[0] = 0;

    for (let i = 1; i <= n; i++) {
        for (let jump = 1; jump <= 3; jump++) {
            const prev = i - jump;

            if (prev >= 0) {
                const cost = costs[i - 1] + jump * jump;
                dp[i] = Math.min(dp[i], dp[prev] + cost);
            }
        }
    }

    return dp[n];
};