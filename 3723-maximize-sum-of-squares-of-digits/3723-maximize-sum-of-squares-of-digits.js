
var maxSumOfSquares = function(num, sum) {
    if (sum > 9 * num) return "";

    let ans = "";

    for (let i = 0; i < num; i++) {
        let digit = Math.min(9, sum);
        ans += digit;
        sum -= digit;
    }

    return sum === 0 ? ans : "";
};
