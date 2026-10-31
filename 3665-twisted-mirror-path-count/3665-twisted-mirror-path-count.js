
var uniquePaths = function(grid) {
    const MOD = 1000000007;

    const m = grid.length;
    const n = grid[0].length;

    const dp = Array.from(
        { length: m },
        () => Array.from(
            { length: n },
            () => [0, 0]
        )
    );

    // dp[i][j][0] = paths entering from left
    // dp[i][j][1] = paths entering from above

    dp[0][0][0] = 1;

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {

            const fromLeft = dp[i][j][0];
            const fromTop = dp[i][j][1];

            if (grid[i][j] === 1) {

                // Mirror: Right -> Down
                if (fromLeft > 0 && i + 1 < m) {
                    dp[i + 1][j][1] =
                        (dp[i + 1][j][1] + fromLeft) % MOD;
                }

                // Mirror: Down -> Right
                if (fromTop > 0 && j + 1 < n) {
                    dp[i][j + 1][0] =
                        (dp[i][j + 1][0] + fromTop) % MOD;
                }

            } else {

                const total = (fromLeft + fromTop) % MOD;

                // Move Right
                if (j + 1 < n) {
                    dp[i][j + 1][0] =
                        (dp[i][j + 1][0] + total) % MOD;
                }

                // Move Down
                if (i + 1 < m) {
                    dp[i + 1][j][1] =
                        (dp[i + 1][j][1] + total) % MOD;
                }
            }
        }
    }

    return (
        dp[m - 1][n - 1][0] +
        dp[m - 1][n - 1][1]
    ) % MOD;
};
