var maximumSaleItems = function(items, budget) {
    const n = items.length;
    const dp = new Array(budget + 1).fill(0);

    let minPrice = Infinity;

    for (const [factor, price] of items) {
        minPrice = Math.min(minPrice, price);

        // First purchase: purchased copy + free copies
        let count = 0;

        for (const [otherFactor] of items) {
            if (otherFactor % factor === 0) {
                count++;
            }
        }

        // 0/1 Knapsack: activate each item type only once
        for (let j = budget; j >= price; j--) {
            dp[j] = Math.max(
                dp[j],
                dp[j - price] + count
            );
        }
    }

    // Spend remaining budget on the cheapest item
    let ans = 0;

    for (let i = 0; i <= budget; i++) {
        ans = Math.max(
            ans,
            dp[i] + Math.floor((budget - i) / minPrice)
        );
    }

    return ans;
};