'use strict';
function SvgObj() {





	/**
	 * https://stackoverflow.com/questions/30940609/interacting-with-a-svg-image
	 * Creates a box to display the universe in
	 * @param  {node} node document.node of the HTML element the box should be placed in
	 * @param {integer} size The radius of the generated universe.
	 * @return {boolean}      returns true on success, false otherwise
	 */
	this.createUniverseBox = function(node, size) {
		if (!node) { return false; }
		// Get the height & width of the box
		var height = node.clientHeight;
		var width = node.clientWidth;
		// Convert the radius into a square
		var side = ((size+20)*2)+1;
		var boxOff = (601 - side)/2;
		// Clear the innerHTML of the node
		node.innerHTML = "";
		// attach the inline SVG
		node.innerHTML = '<svg id="viewbox" width="601" height="601" viewbox="'+boxOff+' '+boxOff+' '+side+' '+side+'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"></svg>'
		return true;
	}

	/**
	 * [fillUniverseBox description]
	 * @param  {[type]} stars [description]
	 * @return {[type]}       [description]
	 */
	this.fillUniverseBox = function(stars) {
		if (!stars) {console.log("svg.js - No stars found to plot."); return false;}
		var node = document.getElementById("viewbox");
		if (!node) {console.log("svg.js - The node with id 'viewbox' wasn't found."); return false;}
		for (var i = 0; i < stars.length; i++) {
			var id = "Star_"+i;
			var X = stars[i][0]+300;
			var Y = stars[i][1]+300;
			console.log("test");
			node.innerHTML += '<circle cx="'+X+'" cy="'+Y+'" r="2" fill="white" />'
		}
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
