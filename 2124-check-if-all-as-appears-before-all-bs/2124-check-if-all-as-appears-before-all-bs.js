
var checkString = function(s) {
    let foundB = false;

    for (let i = 0; i < s.length; i++) {
        if (s[i] === 'b') {
            foundB = true;
        }

        if (s[i] === 'a' && foundB) {
            return false;
        }
    }

    return true;
};
