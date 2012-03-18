(function(exports) {
	
	function Qbox() {
		
		var callbacks = [];
		var loaded = false;

		this.ready = function(callback) {
			
			if(loaded) {
				callback();
			} else {
				callbacks.push(callback);
			}
		};

		this.start = function() {
			loaded = true;
			callbacks.forEach(function(callback) {
				callback();
			});
		};
	}

	exports.SCRIPTS = new Qbox();

	//forEach fix for IE
	if(!Array.prototype.forEach) {
		
		Array.prototype.forEach = function(callback) {

			for(var lc=0; lc<this.length; lc++) {
				callback(this[lc]);
			}
		};

		//tell them this is ie
		exports.ie = true;
	}

	//console fix

	if(!exports.console) {
		exports.console = {
			log: function() {},
			info: function() {},
			debug: function() {},
			warn: function() {},
			error: function() {}
		};
	}

})(window);