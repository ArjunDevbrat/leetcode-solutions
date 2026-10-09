var removeOuterParentheses = function(s) {
    let ans = "";
    let balance = 0;

    for (let ch of s) {
        if (ch === '(') {
            if (balance > 0) {
                ans += ch;
            }
            balance++;
        } else {
            balance--;

            if (balance > 0) {
                ans += ch;
            }
        }
    }

    return ans;
};
