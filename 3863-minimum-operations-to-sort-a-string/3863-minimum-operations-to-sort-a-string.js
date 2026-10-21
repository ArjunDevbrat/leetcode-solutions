
var minOperations = function(s) {
    let n = s.length;
    let sorted = [...s].sort().join("");

    if (s === sorted) return 0;
    if (n === 2) return -1;

    let mn = sorted[0];
    let mx = sorted[n - 1];

    if (s[0] === mn || s[n - 1] === mx) {
        return 1;
    }

    for (let i = 1; i < n - 1; i++) {
        if (s[i] === mn || s[i] === mx) {
            return 2;
        }
    }

    return 3;
};
