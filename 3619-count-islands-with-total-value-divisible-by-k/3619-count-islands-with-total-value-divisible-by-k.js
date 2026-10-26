
var countIslands = function(grid, k) {
    const m = grid.length;
    const n = grid[0].length;
    let count = 0;

    function dfs(i, j) {
        if (
            i < 0 || i >= m ||
            j < 0 || j >= n ||
            grid[i][j] === 0
        ) {
            return 0;
        }

        // Current land cell ko visited mark karo
        const value = grid[i][j];
        grid[i][j] = 0;

        // 4 directions mein island ka sum nikalo
        return value
            + dfs(i + 1, j)
            + dfs(i - 1, j)
            + dfs(i, j + 1)
            + dfs(i, j - 1);
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (grid[i][j] > 0) {
                const sum = dfs(i, j);

                if (sum % k === 0) {
                    count++;
                }
            }
        }
    }

    return count;
};
