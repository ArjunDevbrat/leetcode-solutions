
var sortableIntegers = function(nums) {
    let n = nums.length;
    let sorted = [...nums].sort((a, b) => a - b);
    let ans = 0;

    for (let k = 1; k <= n; k++) {
        if (n % k !== 0) continue;

        let possible = true;

        for (let start = 0; start < n; start += k) {
            let freq = new Map();
            let descents = 0;

            for (let i = start; i < start + k; i++) {
                freq.set(
                    nums[i],
                    (freq.get(nums[i]) || 0) + 1
                );

                freq.set(
                    sorted[i],
                    (freq.get(sorted[i]) || 0) - 1
                );

                if (i > start && nums[i - 1] > nums[i]) {
                    descents++;
                }
            }

            // Check the circular boundary too
            if (k > 1 && nums[start + k - 1] > nums[start]) {
                descents++;
            }

            if (
                descents > 1 ||
                [...freq.values()].some(count => count !== 0)
            ) {
                possible = false;
                break;
            }
        }

        if (possible) {
            ans += k;
        }
    }

    return ans;
};
