var maxAlternatingSum = function(nums) {
    let squares = nums.map(x => x * x);
    squares.sort((a, b) => a - b);

    let n = squares.length;
    let ans = 0;

    for (let i = 0; i < n; i++) {
        if (i < Math.floor(n / 2)) {
            ans -= squares[i];
        } else {
            ans += squares[i];
        }
    }

    return ans;
};
