'use strict';
function SvgObj() {

	var radius = 0;
	var svg = {
		'size': {'x': 0, 'y': 0},
		'center': {'x': 0, 'y': 0}
	}
	var div = {
		size: {'x': 0, 'y': 0},
		center: {'x': 0, 'y': 0}
	}
	var transformMatrix = [];
	var svgMapNode = "";


    function getRadius(stars) {
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
	 * https://stackoverflow.com/questions/30940609/interacting-with-a-svg-image
	 * Creates a box to display the universe in
	 * @param  {node} node document.node of the HTML element the box should be placed in
	 * @param {integer} size The radius of the generated universe.
	 * @return {boolean}      returns true on success, false otherwise
	 */
	function createUniverseBox(node) {
		if (!node) { return false; }
		// Clear the innerHTML of the node
		node.innerHTML = "";
		// attach the inline SVG
		node.innerHTML = '<svg id="viewbox" width="'+div.size.x+'" height="'+div.size.y+'" viewBox="'+-svg.center.x+' '+-svg.center.y+' '+svg.size.x+' '+svg.size.y+'" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"></svg>'


		transformMatrix = [1, 0, 0, 1, 0, 0];
		svgMapNode = document.getElementById('viewbox');

/*

    <script type="text/javascript"><![CDATA[
        var transformMatrix = [1, 0, 0, 1, 0, 0];
        var svg = document.getElementById('viewbox-transformer');
        var viewbox = document.getElementById('viewbox');
        var centerX = 
        parseFloat(viewbox[2]) / 2;
        var centerY = parseFloat(viewbox[3]) / 2;
        var matrixGroup = svg.getElementById("matrix-group");
    ]]></script>

		node.innerHTML = '<g id="viewbox-transformer" transform="matrix(1 0 0 1 0 0)">\
							<svg id="viewbox" width="'+div.size.x+'" height="'+div.size.y+'" viewbox="'+-svg.center.x+' '+-svg.center.y+' '+svg.size.x+' '+svg.size.y+'" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"></svg>\
						  </g>'

 */



		return true;
	}

	/**
	 * Plot the stars on the svg element
	 * @param  {Objct} stars Contains star data
	 * @return {boolean}       True on success
	 */
	this.displayUniverse = function(stars) {
		if (!stars) {console.log("svg.js - No stars found to plot."); return false;}
		radius = parseInt(getRadius(stars));
		svg.size.x = ((radius*2)+1000);
		svg.size.y = svg.size.x;
		svg.center.x = parseInt(svg.size.x/2)+1;
		svg.center.y = parseInt(svg.size.y/2)+1;
		
		var node = document.getElementById("universe");
		if (!node) {console.log("svg.js - The node with id 'universe' wasn't found."); return false;}
		div.size.x = node.clientWidth;
		div.size.y = node.clientHeight;
		div.center.x = parseInt(div.size.x/2)+1;
		div.center.y = parseInt(div.size.y/2)+1;
		createUniverseBox(node);
		
		node = document.getElementById("viewbox");
		if (!node) {console.log("svg.js - The node with id 'viewbox' wasn't found."); return false;}
		var collector = "";
		for (var i = 0; i < Object.keys(stars).length; i++) {
			var star = stars[i];
			//collector += '<circle id="'+star.id+'" cx="'+star.x+'" cy="'+star.y+'" r="'+star.data.size+'" fill="'+star.data.color+'" />'
		collector += '<circle id="'+star.id+'" cx="'+star.x+'" cy="'+star.y+'" r="5" fill="'+star.data.color+'" />'
		}
		node.innerHTML = collector;
		return true;
	}


	this.starSystem = function(seed, planets) {
		// Create all planets with variable size
		//   Planets have 0-10 moons in different orbits

		// Loop from outer ring to inner ring, ending at the local star
		// 	Place planets on these rings
		// 	  Give all items their speed around their star and animate
		
		// Maybe add asteroid belts?
	}

};
