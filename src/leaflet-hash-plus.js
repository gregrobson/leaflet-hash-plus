(function(window) {
	L.Hash = function(map) {
    this.map = map;
		this.onHashChange = L.Util.bind(this.onHashChange, this);

		if (map) {
			this.init(map);
		}
	};

	/**
	 *
	 * Returns map has { center: LantLng, zoom: int }
	 */
	L.Hash.parseHash = function(hash) {
		args = hash.substr(1).split("/"); // Assume it starts with a '#'

		// Fail on invalid number
		if (args.length != 3) {
			return false;
		}

		var zoom = (L.version >= '1.0.0') ? parseFloat(args[0]) : parseInt(args[0], 10),
		lat = parseFloat(args[1]),
		lon = parseFloat(args[2]);
		// Fail on invalid params
		if (isNaN(zoom) || isNaN(lat) || isNaN(lon)) {
			return false;
		}

		return {
			center: new L.LatLng(lat, lon),
			zoom: zoom
		};
	};

	L.Hash.formatHash = function(map) {
		var center = map.getCenter(),
				zoom = map.getZoom(),
				precision = Math.max(0, Math.ceil(Math.log(zoom) / Math.LN2));

		return "#" + [
			(L.version >= '1.0.0') ? zoom.toFixed(precision) : zoom,
			center.lat.toFixed(precision),
			center.lng.toFixed(precision)
		].join("/");
	},

	L.Hash.prototype = {
		map: null,
		isListening: false,

		parseHash: L.Hash.parseHash,
		formatHash: L.Hash.formatHash,

		ignoreHashChange: false,

		init: function(map) {
			this.map = map;

			// Make a hashchange when loaded.
			this.map.whenReady(this.onHashChange, this);
			this.startListening();
		},

		// Notified whenever the hash changes.
		onHashChange: function()
		{
			if (this.ignoreHashChange) {
				this.ignoreHashChange = false;
				return;
			}

			var state = this.parseHash(location.hash);
			if (false === state) {
				this.onMapMove();
				return;
			}

			// In all other cases - use the Hash, it was okay.
			this.map.setView(state.center, state.zoom);
			this.ignoreHashChange = false;
		},

		// When map is moved by user, or function is called, update the hash
		onMapMove: function() {
			console.log('mapMoved()');
			this.updateHash();
		},

		updateHash: function() {
			this.ignoreHashChange = false; // Update by us, not user, so ignore it
			location.hash = this.formatHash(this.map);
		},

		startListening: function() {
			if (this.isListening) {
				return;
			}

			// Listen to all hashchange events
			L.DomEvent.addListener(window, "hashchange", this.onHashChange);
			// When the map is updated, we update the hash
			this.map.on("moveend", this.onMapMove, this);
			this.isListening = true;
		},

		stopListening: function() {
			if (!this.isListening) {
				return;
			}

			this.map.off("moveend", this.onMapMove, this);

      L.DomEvent.removeListener(window, "hashchange", this.onHashChange);
			this.isListening = false;
		},
	};
	L.hash = function(map) {
		return new L.Hash(map);
	};
	L.Map.prototype.addHash = function() {
		this._hash = L.hash(this);
	};
	L.Map.prototype.removeHash = function() {
		this._hash.removeFrom();
	};
})(window);
