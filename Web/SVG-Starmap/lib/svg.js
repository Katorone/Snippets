'use strict';
function SvgObj() {

	/**
	 * https://stackoverflow.com/questions/30940609/interacting-with-a-svg-image
	 * Creates a box to display the universe in
	 * @param  {node} node document.node of the HTML element the box should be placed in
	 * @param {integer} size The radius of the generated universe.
	 * @return {boolean}      returns true on success, false otherwise
	 */
	this.createUniverseBox = function(node, radius) {
		if (!node) { return false; }
		// Get the height & width of the box
		var height = node.clientHeight;
		var width = node.clientWidth;
		// Convert the radius into a square
		var side = parseInt(((radius+20)*2)+1);
		var boxOff = radius-20;
		// Clear the innerHTML of the node
		node.innerHTML = "";
		// attach the inline SVG
		node.innerHTML = '<svg id="viewbox" width="'+width+'" height="'+height+'" viewbox="'+boxOff+' '+boxOff+' '+side+' '+side+'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"></svg>'
		//node.innerHTML = '<svg id="viewbox" width="'+width+'" height="'+height+'" viewbox="0 0 '+side+' '+side+'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve"></svg>'
		return true;
	}

	/**
	 * Plot the stars on the svg element
	 * @param  {Objct} stars Contains star data
	 * @return {boolean}       True on success
	 */
	this.fillUniverseBox = function(stars, radius) {
		if (!stars) {console.log("svg.js - No stars found to plot."); return false;}
		var node = document.getElementById("viewbox");
		if (!node) {console.log("svg.js - The node with id 'viewbox' wasn't found."); return false;}
		for (var i = 0; i < Object.keys(stars).length; i++) {
			var star = stars[i];
			var id = star.id;
			var X = star.x+(radius*2)+1;
			var Y = star.y+(radius*2)+1;
			var color = star.data.color;
			node.innerHTML += '<circle cx="'+X+'" cy="'+Y+'" r="2" fill="'+color+'" />'
		}
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
