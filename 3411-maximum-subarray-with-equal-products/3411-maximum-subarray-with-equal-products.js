
var maxLength = function(nums) {
    const n = nums.length;
    let ans = 0;

    function gcd(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }

    for (let i = 0; i < n; i++) {
        let product = 1n;
        let g = 0;
        let l = 1;

        for (let j = i; j < n; j++) {
            const num = nums[j];

            product *= BigInt(num);

            g = gcd(g, num);
            l = (l / gcd(l, num)) * num;

            if (product === BigInt(g) * BigInt(l)) {
                ans = Math.max(ans, j - i + 1);
            }
        }
    }

    return ans;
};
