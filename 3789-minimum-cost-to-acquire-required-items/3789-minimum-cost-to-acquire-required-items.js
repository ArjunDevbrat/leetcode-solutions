var minimumCost = function(cost1, cost2, costBoth, need1, need2) {
    // Option 1: Buy only individual items
    const option1 = need1 * cost1 + need2 * cost2;

    // Option 2: Buy common items for the overlapping requirement
    const common = Math.min(need1, need2);

    const option2 =
        common * costBoth +
        (need1 - common) * cost1 +
        (need2 - common) * cost2;

    // Option 3: Buy only type 3 items
    const option3 = Math.max(need1, need2) * costBoth;

    return Math.min(option1, option2, option3);
};