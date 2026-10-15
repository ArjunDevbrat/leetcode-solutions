
var sumCounts = function(nums) {
    let total = 0;
    let n = nums.length;

    for (let i = 0; i < n; i++) {
        let distinct = new Set();

        for (let j = i; j < n; j++) {
            distinct.add(nums[j]);

            let count = distinct.size;
            total += count * count;
        }
    }

    return total;
};
