'use strict';

function Prng(seed) {
    var m = Math.pow(2, 31)
    var multi = 36969
    var incr = 18000
    var state = 0

    function setState(seed) {state = seed/(Math.pow(2, 31)-1);}
    setState(seed);

    this.lcg = function() {
        state = (multi * state + incr) % m;
        return state / (m-1);
    }
};


/*
a = new Prng(UniverseHandler.Universe.getSeed());
a.lcg()
 */