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

})(window);