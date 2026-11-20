
var maxSelectedElements = function(nums) {
    nums.sort((a, b) => a - b);

    const dp = new Map();
    let ans = 0;

    for (const num of nums) {
        const prev1 = dp.get(num) || 0;
        const prev2 = dp.get(num + 1) || 0;

        const option1 = prev1 + 1;
        const option2 = prev2 + 1;

        dp.set(num + 1, Math.max(dp.get(num + 1) || 0, option1));
        dp.set(num + 2, Math.max(dp.get(num + 2) || 0, option2));

        ans = Math.max(ans, option1, option2);
    }

    return ans;
};
