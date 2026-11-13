var countNonDecreasingSubarrays = function(nums, k) {
    const n = nums.length;

    let deque = new Array(n);
    let head = 0;
    let tail = 0;

    let right = n - 1;
    let cost = 0;
    let ans = 0;

    for (let i = n - 1; i >= 0; i--) {
        // Maintain monotonic deque
        while (
            tail > head &&
            nums[deque[tail - 1]] < nums[i]
        ) {
            const l = deque[--tail];

            const r = tail > head
                ? deque[tail - 1]
                : right + 1;

            cost += (r - l) * (nums[i] - nums[l]);
        }

        deque[tail++] = i;

        // Reduce window if cost exceeds k
        while (cost > k) {
            cost -= nums[deque[head]] - nums[right];

            if (deque[head] === right) {
                head++;
            }

            right--;
        }

        ans += right - i + 1;
    }

    return ans;
};