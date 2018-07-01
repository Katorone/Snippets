'use strict';

function Prng(seed) {
    var multi = 16807;
    var mod = 2147483647;
    var incr = mod/multi;
    var state = seed;

    this.lcg = function() {
        state = (state * multi + incr) % mod;
        return state / (mod-1);
    }
};


/*
a = new Prng(UniverseHandler.Universe.getSeed());
a.lcg()
 */
