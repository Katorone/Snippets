'use strict';
function UniverseObj(maxStars) {

    var instance = {};
    var seed = 0;
    var seedString ="";
    var stars = [];

    this.getStars = function() {return stars;}

    this.getSize = function() {
        // loop through the stars and determine the size of the galaxy
        var largest = 0
        for (var i = 0; i < stars.length; i++) {
            if (Math.abs(stars[i][0]) > largest) {largest = Math.abs(stars[i][0]);}
            if (Math.abs(stars[i][1]) > largest) {largest = Math.abs(stars[i][1]);}
        }
        return largest;  
    }


    // Creates a spiral galaxy with stars in random coordinates
    this.createStarmap = function() {
        var expandRate = 2;
        var points = [];
        //var numArms = this.extractNumberFromSeed(3, 6);
        var numArms = 3;
        var num = parseInt(maxStars/numArms);
        console.log("Building a spiral universe with "+numArms+" arms and "+num*numArms+" stars in total.")
        for (var arm = 1; arm <= numArms; arm++) {
            for (var point = 0; point < num; point++) {
                // Calculate the base coordinates
                var X = expandRate * point * Math.cos(point+10 + (Math.PI * arm));
                var Y = expandRate * point * Math.sin(point+10 + (Math.PI * arm));  
                // Apply some repeatable randomization
                var offset = 20
                X += parseInt(Math.random()*offset)-(offset/2); //random number between -5 & +5 but always the same for these coordinates
                Y += parseInt(Math.random()*offset)-(offset/2); // ^ same
                // store the coordinates
                X = parseInt(X);
                Y = parseInt(Y);
                points.push([X, Y]);
            }
        }
        return points;
    }

    /**
     * Extracts a number from the seed between min & max
     * @param  {int} min A number between 0 and 9
     * @param  {int} max A number between 0 and 9
     * @return {int}     A number between min and max
     */
    this.extractNumberFromSeed = function(min, max) {
        var number = parseInt((min+max)/2);
        var len = seedString.length;
        for (var i = 0; i < len; i++) {
            var n = parseInt(seedString.charAt(i));
            if (n >= min && n <= max) {number = n; break;}
        };
        return number;
    }

    this.init = function() {
        // set the seed of this universe
        seed = parseInt(Math.random()*1000000000000);
        seedString = seed.toString();
        // Create the star coordinates
        stars = this.createStarmap();
        console.log("Created a universe with seed: "+seed);
    };
    this.init();
};

