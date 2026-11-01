var minMoves = function(nums) {
    let min = nums[0];
    let sum = 0;

    for (let num of nums) {
        min = Math.min(min, num);
        sum += num;
    }

    return sum - nums.length * min;
};