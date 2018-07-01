'use strict';
var UniverseHandler = function() {

	var instance = {
		Universe: {},
		stars: {},
		radius: 0,
		Svg: {}
	}

	/**
	 * Gets called through the eventlistener when all content is loaded.
	 * @return {boolean} returns true on success
	 */
	instance.init = function() {
		this.Universe = new UniverseObj(800);
		this.Svg = new SvgObj();
		this.radius = this.Universe.getSize();
		this.Svg.createUniverseBox(document.getElementById('universe'), this.radius);
		this.stars = this.Universe.getStars()
		this.Svg.fillUniverseBox(this.stars, this.radius)
		return true;
	}

	/**
	 * addEventListener wrapper with browser support
	 * @param {node}   target   The DOM node that's listened on
	 * @param {string}   event    An event like 'click'
	 * @param {Function} callback The function that gets called when the event happens on target.
	 * @return {boolean} returns true on success, otherwise false
	 */
    instance.addEventListener = function(target, event, callback) {
        if (target.addEventListener) {
            target.addEventListener(event, callback, false);
            return true;
        } else if (target.attachEvent) {
            target.attachEvent("on"+event, callback);
            return true;
        } else {
            target['on'+event] = callback;
            return true;
        }
        return false;
    };

    return instance;

}();
UniverseHandler.addEventListener(window, "load", function() {UniverseHandler.init()});