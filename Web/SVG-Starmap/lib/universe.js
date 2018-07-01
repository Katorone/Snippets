'use strict';
function UniverseObj(maxStars, seed) {

    var instance = {};
    var seed = 0;
    var stars = [];

    var makeSeed = function() {
        //if (!seed) { seed = parseInt( (Math.random()-0.5)*2 * (Math.pow(2, 31)-1)); }
        if (!seed) { seed = parseInt(Math.random() * (Math.pow(2, 31)-1)); }
        return seed
    }

    this.getSeed = function() {return seed;}

    this.getStars = function() {return stars;}

    this.getSize = function() {
        // loop through the stars and determine the size of the galaxy
        var largest = 0
        for (var i = 0; i < Object.keys(stars).length; i++) {
            var star = stars[i]
            if (Math.abs(star.x) > largest) {largest = Math.abs(star.x);}
            if (Math.abs(star.y) > largest) {largest = Math.abs(star.y);}
        }
        return largest;  
    }

    /**
     * Generates a random star designation
     * @param  {array} coords Array: [x, y]
     * @return {string}        Returns a string like Ka-730847
     */
    var createStarName = function(coords) {
        var des = "";
        var id = "";
        var c = "";
        for (var i in coords) {
            c = Math.abs(coords[i])
            des += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(parseInt(c*26));
            c = coords[i].toString()
            id += c.substr(c.length-3, 3);
        }
        return des+"-"+id;
    }

    /**
     * Generates the data of each star (type, size, color
     * @param  {float} coords Number [0, 1[
     * @return {Object}        Object containing the data
     */
    var createStarData = function(noise) {
        var result = {};
        var starData = getStarData();
        var perc = 0;
        // Find a matching percentage
        var l = starData.order.length - 1;
        for (var i = 0; i <= l; i++) {
            perc += starData[starData.order[i]].perc;
            // If the noise is smaller than the cummulative percentage, pick this category
            if (noise < perc || i == l) {result.type = starData.order[i]; break;}
        }
        perc = 0;
        // Find a matching type percentage
        l = starData[result.type].stars.length - 1
        for (var i = 0; i <= l; i++) {
            var sunType = starData[result.type].stars[i];
            perc += starData[starData.order[i]].perc;
            if (noise < sunType.perc || i == l) {
                result.name = sunType.name;
                result.size = parseInt((sunType.maxSize-sunType.minSize)*noise+sunType.minSize);
                result.temp = parseInt((sunType.maxTemp-sunType.minTemp)*noise+sunType.minTemp);
                result.color = sunType.color;
                break;
            }
        }
        return result;
    }

    // Creates a spiral galaxy with stars in random coordinates
    // Thanks to http://itinerantgames.tumblr.com/ for the guide.
    var createStarmap = function() {
        var r = new Prng(seed);
        // Prime the prng
        for (var i = 0; i<100;i++) {r.lcg()}
        var starPositions = {};
        var distance = 0;
        var angle = 0;

        var arms = parseInt((r.lcg()*6)+2)
        //var arms = 3
        var armDist = 2 * Math.PI / arms
        var armOffsetMax = 2;
        var rotationFactor = 5;
        var x = 0;
        var y = 0;
        for(var i = 0; i < maxStars; i++) {
            // Choose a distance from the center of the galaxy.
            distance = r.lcg();
            //distance = Math.pow(distance, 2);
            distance = distance*2
            // Choose an angle between 0 and 2 * PI.
            angle = r.lcg() * 2 * Math.PI;
            var armOffset = r.lcg()*armOffsetMax;
            armOffset = armOffset - armOffsetMax/2;
            armOffset = armOffset * (1/distance);
            var sqrdArmOffset = Math.pow(armOffset, 2);
            if (armOffset<0) {sqrdArmOffset = sqrdArmOffset * -1;}
            armOffset = sqrdArmOffset;
            var rotation = distance * rotationFactor;
            angle = parseInt(angle/armDist)*armDist+armOffset+rotation;


            // Translate from polar to cartesian coords.
            x = Math.cos(angle) * distance;
            y = Math.sin(angle) * distance;
            starPositions[i] = {};
            starPositions[i].x = x*300;
            starPositions[i].y = y*300;
            starPositions[i].noise = r.lcg();
            starPositions[i].id = createStarName([x, y]);
            starPositions[i].data = createStarData(starPositions[i].noise);
        }
        return starPositions;
    }

    // Star temperatures + RGB taken from:
    // http://www.vendian.org/mncharity/dir3/blackbody/
    // Then further simplified by data from:
    // https://www.outerspaceuniverse.org/different-colors-of-stars-why-stars-colored-differently.html
    var getStarData = function() {
        return {
            "order": ["M", "K", "G", "Dead", "A", "B", "K", "F"],
            "M": {
                "perc": 0.6119,
                "stars": [
                    {"name": 'Red Dwarf', 'perc': 0.975, 'color': '#ff3800', 'minSize': 83460, 'maxSize': 486850, 'minTemp': 1800, 'maxTemp': 3500},
                    {"name": 'Red Giant', 'perc': 0.020, 'color': '#ff3800', 'minSize': 13910000, 'maxSize': 69550000, 'minTemp': 3000, 'maxTemp': 3500},
                    {"name": 'Red Supergiant', 'perc': 0.005, 'color': '#ff3800', 'minSize': 69550000, 'maxSize': 1147575000, 'minTemp': 3000, 'maxTemp': 3500}
                ]
            },
            "K": {
                "perc": 0.114,
                "stars": [
                    {"name": 'Red Giant', 'perc': 0.005, 'color': '#ffc184', 'minSize': 13910000,'maxSize': 69550000, 'minTemp': 3500,'maxTemp': 5000},
                    {"name": 'Red Supergiant', 'perc': 0.02, 'color': '#ffc184', 'minSize': 69550000,'maxSize': 1147575000, 'minTemp': 3500,'maxTemp': 5000 },
                    {"name": 'Orange Dwarf', 'perc': 0.975, 'color': '#ffc184', 'minSize': 486850,'maxSize': 667680, 'minTemp': 3500,'maxTemp': 5000}
                ]
            },
            "G": {
                "perc": 0.055,
                "stars": [{"name": 'Yellow Dwarf', 'perc': 1, 'color': '#ffd9b6', 'minSize': 667680,'maxSize': 667680, 'minTemp': 5000,'maxTemp': 6100}]
            },
            "F": {
                "perc": 0.038,
                "stars": [{"name": 'Yellow Dwarf', 'perc': 1, 'color': '#fff5f5', 'minSize': 667680,'maxSize': 667680, 'minTemp': 6100,'maxTemp': 7600}]
            },
            "A": {
                "perc": 0.007,
                "stars": [{"name": 'Blue Giant', 'perc': 1, 'color': '#e6ebff', 'minSize': 973700,'maxSize': 173875000, 'minTemp': 7600,'maxTemp': 10000}]
            },
            "B": {
                "perc": 0.007,
                "stars": [{"name": 'Blue Giant', 'perc': 1, 'color': '#b7cfff', 'minSize': 973700,'maxSize': 173875000, 'minTemp': 10000,'maxTemp': 28000}]
            },
            "K": {
                "perc": 0.033,
                "stars": [{"name": 'White Dwarf', 'perc': 1, 'color': '#9fbfff', 'minSize': 5564,'maxSize': 139100, 'minTemp': 4000,'maxTemp': 150000}]
            },
            "Dead": {
                "perc": 0.1341,
                "stars": [
                    {"name": 'Brown Dwarf', 'perc': 0.24, 'color': '#a32c14', 'minSize': 3477500,'maxSize': 6955000, 'minTemp': 1300,'maxTemp': 2000},
                    {"name": 'Brown Dwarf', 'perc': 0.3, 'color': '#a32c14', 'minSize': 41730,'maxSize': 83460, 'minTemp': 700,'maxTemp': 1300},
                    {"name": 'Brown Dwarf', 'perc': 0.35, 'color': '#a32c14', 'minSize': 41730,'maxSize': 83460, 'minTemp': 500,'maxTemp': 700},
                    {"name": 'Blue Giant', 'perc': 0.05, 'color': '#9fbfff', 'minSize': 973700,'maxSize': 173875000, 'minTemp': 7300,'maxTemp': 40000},
                    {"name": 'Black Dwarf', 'perc': 0.01, 'color': '#524a49', 'minSize': 69550,'maxSize': 973700, 'minTemp': 5,'maxTemp': 10},
                    {"name": 'Neutron Star', 'perc': 0.05, 'color': '#9fbfff', 'minSize': 973700,'maxSize': 2225600, 'minTemp': 28000,'maxTemp': 40000}
                ]
            },
            "Special": {
                "perc": 0,
                "stars": [{"name": 'Sol', 'perc': 0, 'color': '#ffd9b6', 'minSize': 695500,'maxSize': 695500, 'minTemp': 5500,'maxTemp': 5500}]
            }
        }

    }

    this.init = function() {
        // set the seed of this universe
        seed = makeSeed();
        console.log("Created a universe with seed: "+seed);
        // Create the star coordinates
        stars = createStarmap();
        console.log("Populated the universe with "+Object.keys(stars).length+" stars.")
        var list = [];
        ["M", "K", "G", "F", "A", "B", "K", "Dead"].forEach(function(type) {
            var count = 0;
            for (var i = 0; i < Object.keys(stars).length; i++) {
                if (stars[i].data.type == type) {count++}
            }
            list.push(type+"("+count+")");
        })
        console.log("The universe consists of: "+list.join(', '));
        console.log("It has a radius of: "+parseInt(this.getSize()))
    };
    this.init();
};


