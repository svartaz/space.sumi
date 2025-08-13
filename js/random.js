export class XorShift {
    static until = 4294967296;
    ns;
    constructor(seed = 88675123) {
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
    lottery = (they) => they[this.nextUnit() * they.length];
    shuffle = (they) => they
        .map((it) => ({ it, value: this.nextUnit() }))
        .sort((a, b) => a.value - b.value)
        .map(({ it }) => it);
}
