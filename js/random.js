export class XorShift {
    constructor(seed = 88675123) {
        this.lottery = (they) => they[this.nextUnit() * they.length];
        this.shuffle = (they) => they
            .map((it) => ({ it, value: this.nextUnit() }))
            .sort((a, b) => a.value - b.value)
            .map(({ it }) => it);
        this.ns = new Uint32Array(4);
        this.ns[0] = 123456789;
        this.ns[1] = 362436069;
        this.ns[2] = 521288629;
        this.ns[3] = seed;
    }
    // XorShift
    next() {
        const e = this.ns[0] ^ (this.ns[0] << 11);
        this.ns[0] = this.ns[1];
        this.ns[1] = this.ns[2];
        this.ns[2] = this.ns[3];
        this.ns[3] = this.ns[3] ^ (this.ns[3] >>> 19) ^ (e ^ (e >>> 8));
        return this.ns[3];
    }
    nextUnit() {
        return this.next() / XorShift.until;
    }
    nextBetween(since, until) {
        return this.nextUnit() * (until - since) + since;
    }
}
XorShift.until = 4294967296;
if (false) {
    const random = new XorShift();
    for (let i = 0; i < 1000000; i++)
        console.assert(0 <= random.nextUnit() && random.nextUnit() < 1);
    let sum = 0;
    let min = Number.MAX_SAFE_INTEGER;
    let max = 0;
    let n = 1000000;
    for (let i = 0; i < n; i++) {
        const r = random.nextUnit();
        sum += r;
        if (max < r)
            max = r;
        if (r < min)
            min = r;
    }
    console.log("min", min);
    console.log("max", max);
    console.log("mean", sum / n);
}
