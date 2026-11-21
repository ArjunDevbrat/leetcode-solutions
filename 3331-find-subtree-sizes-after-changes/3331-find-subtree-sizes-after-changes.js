
var findSubtreeSizes = function(parent, s) {
    const n = parent.length;

    const children = Array.from({ length: n }, () => []);

    for (let i = 1; i < n; i++) {
        children[parent[i]].push(i);
    }

    const newParent = [...parent];
    const last = new Array(26).fill(-1);
    const previous = new Array(n).fill(-1);

    const stack = [[0, false]];

    while (stack.length > 0) {
        const [node, exit] = stack.pop();
        const ch = s.charCodeAt(node) - 97;

        if (exit) {
            last[ch] = previous[node];
            continue;
        }

        previous[node] = last[ch];

        if (last[ch] !== -1) {
            newParent[node] = last[ch];
        }

        last[ch] = node;

        stack.push([node, true]);

        for (let i = children[node].length - 1; i >= 0; i--) {
            stack.push([children[node][i], false]);
        }
    }

    const newChildren = Array.from({ length: n }, () => []);

    for (let i = 1; i < n; i++) {
        newChildren[newParent[i]].push(i);
    }

    const order = [0];

    for (let i = 0; i < order.length; i++) {
        for (const child of newChildren[order[i]]) {
            order.push(child);
        }
    }

    const ans = new Array(n).fill(1);

    for (let i = order.length - 1; i > 0; i--) {
        const node = order[i];
        ans[newParent[node]] += ans[node];
    }

    return ans;
};
