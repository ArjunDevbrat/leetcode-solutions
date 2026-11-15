var numOfSubarrays = function(arr) {
    const MOD = 1000000007;

    let odd = 0;
    let even = 1;
    let prefix = 0;
    let ans = 0;

    for (let num of arr) {
        prefix += num;

        if (prefix % 2 === 0) {
            ans = (ans + odd) % MOD;
            even++;
        } else {
            ans = (ans + even) % MOD;
            odd++;
        }
    }

    return ans;
};