var removeOuterParentheses = function(s) {
    let ans = "";
    let balance = 0;

    for (let ch of s) {

        if (ch === '(') {
            // Agar balance 0 hai,
            // ye primitive ka outermost '(' hai
            if (balance > 0) {
                ans += ch;
            }

            balance++;
        } 
        else {
            balance--;

            // Agar balance 0 ho gaya,
            // ye primitive ka outermost ')' hai
            if (balance > 0) {
                ans += ch;
            }
        }
    }

    return ans;
};