var busiestServers = function(k, arrival, load) {
    const count = new Array(k).fill(0);

    // Fenwick Tree
    const bit = new Array(k + 1).fill(0);

    function update(i, val) {
        i++;
        while (i <= k) {
            bit[i] += val;
            i += i & -i;
        }
    }

    function query(i) {
        let sum = 0;
        while (i > 0) {
            sum += bit[i];
            i -= i & -i;
        }
        return sum;
    }

    // Find server having given order among available servers
    function findKth(target) {
        let idx = 0;
        let step = 1;

        while (step * 2 <= k) {
            step *= 2;
        }

        while (step > 0) {
            const next = idx + step;

            if (next <= k && bit[next] < target) {
                idx = next;
                target -= bit[next];
            }

            step = Math.floor(step / 2);
        }

        return idx;
    }

    // Initially all servers are available
    for (let i = 0; i < k; i++) {
        update(i, 1);
    }

    // Min Heap: [finishTime, serverId]
    const busy = [];

    function push(time, server) {
        const val = [time, server];
        busy.push(val);

        let i = busy.length - 1;

        while (i > 0) {
            const p = Math.floor((i - 1) / 2);
            const parent = busy[p];

            if (
                parent[0] < time ||
                (parent[0] === time && parent[1] < server)
            ) break;

            busy[i] = parent;
            i = p;
        }

        busy[i] = val;
    }

    function pop() {
        const result = busy[0];
        const last = busy.pop();

        if (busy.length > 0) {
            let i = 0;

            while (true) {
                let child = 2 * i + 1;

                if (child >= busy.length) break;

                if (
                    child + 1 < busy.length &&
                    (busy[child + 1][0] < busy[child][0] ||
                    (busy[child + 1][0] === busy[child][0] &&
                     busy[child + 1][1] < busy[child][1]))
                ) {
                    child++;
                }

                if (
                    last[0] < busy[child][0] ||
                    (last[0] === busy[child][0] &&
                     last[1] <= busy[child][1])
                ) break;

                busy[i] = busy[child];
                i = child;
            }

            busy[i] = last;
        }

        return result;
    }

    for (let i = 0; i < arrival.length; i++) {
        const time = arrival[i];

        // Release completed servers
        while (busy.length > 0 && busy[0][0] <= time) {
            const [finishTime, server] = pop();
            update(server, 1);
        }

        // Number of currently free servers
        const totalFree = query(k);

        if (totalFree === 0) continue;

        const start = i % k;

        // Count free servers before start
        const before = query(start);

        let target;

        if (totalFree > before) {
            target = before + 1;
        } else {
            target = 1;
        }

        // Select next available server
        const server = findKth(target);

        update(server, -1);
        count[server]++;

        push(time + load[i], server);
    }

    const maxCount = Math.max(...count);

    const result = [];

    for (let i = 0; i < k; i++) {
        if (count[i] === maxCount) {
            result.push(i);
        }
    }

    return result;
};