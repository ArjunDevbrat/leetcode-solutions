var minSumSquareDiff = function(nums1, nums2, k1, k2) {
    let k = k1 + k2;

    // Maximum possible difference is 100000
    let freq = new Array(100001).fill(0);

    let total = 0;

    for (let i = 0; i < nums1.length; i++) {
        let d = Math.abs(nums1[i] - nums2[i]);

        freq[d]++;
        total += d;
    }

    // We can make all differences zero
    if (k >= total) {
        return 0;
    }

    // Start from largest difference
    for (let d = 100000; d > 0 && k > 0; d--) {

        if (freq[d] === 0) {
            continue;
        }

        // Number of elements having this difference
        let count = freq[d];

        // Move these elements from d -> d-1
        let moves = Math.min(k, count);

        freq[d] -= moves;
        freq[d - 1] += moves;

        k -= moves;
    }

    // Calculate final sum of squares
    let answer = 0;

    for (let d = 1; d <= 100000; d++) {
        if (freq[d] > 0) {
            answer += freq[d] * d * d;
        }
    }

    return answer;
};