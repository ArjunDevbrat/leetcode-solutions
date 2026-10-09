var minInsertions = function(s) {
    let balance = 0;
    let ans = 0;

    for (let i = 0; i < s.length; i++) {

        if (s[i] === '(') {
            balance++;
        } 
        else {
            // ')' mila, check karo next ')' hai ya nahi
            if (i + 1 < s.length && s[i + 1] === ')') {
                i++;
            } 
            else {
                // Ek ')' missing hai
                ans++;
            }

            // Ek complete '))' ek '(' ko close karta hai
            if (balance > 0) {
                balance--;
            } 
            else {
                // Closing aa gaya but opening nahi hai
                ans++;
            }
        }
    }

    // Har remaining '(' ke liye '))' chahiye
    ans += balance * 2;

    return ans;
};
