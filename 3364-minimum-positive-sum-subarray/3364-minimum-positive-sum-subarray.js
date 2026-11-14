var minimumSumSubarray = function(nums, l, r) {
    let ans = Infinity;
    const n = nums.length;

    for (let i = 0; i < n; i++) {
        let sum = 0;

        for (let j = i; j < n && j - i + 1 <= r; j++) {
            sum += nums[j];

            let len = j - i + 1;

            if (len >= l && sum > 0) {
                ans = Math.min(ans, sum);
            }
        }
    }

    return ans === Infinity ? -1 : ans;
};