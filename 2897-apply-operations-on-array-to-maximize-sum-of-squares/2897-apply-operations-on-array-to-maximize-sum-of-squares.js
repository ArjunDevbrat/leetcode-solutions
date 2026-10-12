var maxSum = function(nums, k) {
    const MOD = 1000000007n;

    let bits = new Array(31).fill(0);

    // Count each bit
    for (let num of nums) {
        for (let b = 0; b < 31; b++) {
            if (Math.floor(num / (2 ** b)) % 2 === 1) {
                bits[b]++;
            }
        }
    }

    let ans = 0n;

    // Build k maximum numbers
    for (let i = 0; i < k; i++) {
        let num = 0n;

        for (let b = 0; b < 31; b++) {
            if (bits[b] > 0) {
                num += 2n ** BigInt(b);
                bits[b]--;
            }
        }

        // BigInt prevents precision loss
        ans = (ans + (num * num) % MOD) % MOD;
    }

    return Number(ans);
};