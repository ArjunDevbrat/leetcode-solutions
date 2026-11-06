var countServers = function(n, logs, x, queries) {
    logs.sort((a, b) => a[1] - b[1]);

    let sortedQueries = queries.map((q, i) => [q, i]);
    sortedQueries.sort((a, b) => a[0] - b[0]);

    let freq = new Map();
    let left = 0;
    let right = 0;
    let result = new Array(queries.length);

    for (let [q, index] of sortedQueries) {
        let start = q - x;

        while (right < logs.length && logs[right][1] <= q) {
            let server = logs[right][0];
            freq.set(server, (freq.get(server) || 0) + 1);
            right++;
        }

        while (left < right && logs[left][1] < start) {
            let server = logs[left][0];
            freq.set(server, freq.get(server) - 1);

            if (freq.get(server) === 0) {
                freq.delete(server);
            }

            left++;
        }

        result[index] = n - freq.size;
    }

    return result;
};