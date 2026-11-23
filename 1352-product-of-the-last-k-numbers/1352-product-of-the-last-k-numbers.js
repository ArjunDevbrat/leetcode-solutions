
var ProductOfNumbers = function() {
    this.prefix = [1];
};

ProductOfNumbers.prototype.add = function(num) {
    if (num === 0) {
        this.prefix = [1];
    } else {
        const last = this.prefix[this.prefix.length - 1];
        this.prefix.push(last * num);
    }
};

ProductOfNumbers.prototype.getProduct = function(k) {
    const n = this.prefix.length;

    if (k >= n) {
        return 0;
    }

    return this.prefix[n - 1] / this.prefix[n - 1 - k];
};
