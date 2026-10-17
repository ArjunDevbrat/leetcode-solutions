
var minSwaps = function(nums) {
    const n = nums.length;

    function digitSum(num) {
        let sum = 0;

        while (num > 0) {
            sum += num % 10;
            num = Math.floor(num / 10);
        }

        return sum;
    }

    let arr = nums.map((num, index) => ({
        num: num,
        sum: digitSum(num),
        index: index
    }));

    arr.sort((a, b) => {
        if (a.sum !== b.sum) {
            return a.sum - b.sum;
        }
        return a.num - b.num;
    });

    let visited = new Array(n).fill(false);
    let swaps = 0;

    for (let i = 0; i < n; i++) {
        if (visited[i] || arr[i].index === i) {
            continue;
        }

        let cycleSize = 0;
        let j = i;

        while (!visited[j]) {
            visited[j] = true;
            j = arr[j].index;
            cycleSize++;
        }

        swaps += cycleSize - 1;
    }

    return swaps;
};
