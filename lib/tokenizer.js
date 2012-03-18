(function(exports) {
	
	function Tokenizer() {

		var self = this;
		var sinhala = new UnicodeSinhala();

		//used to store the consonent for later usage when tokenizing
		var earlyConsonant = null;

		//setup event listeners	
		var eventCallbacks = {};

		['vowel', 'consonant', 'mixed', 'other'].forEach(function(event) {
			
			self['on' + capitalize(event)] = function(callback) {
				eventCallbacks[event] = callback;
			};
				
		});

		this.write = function(chunk) {
			if(chunk) {
				for(var lc=0; lc<chunk.length; lc++) {
					tokenize(chunk.charAt(lc));
				}
			}
			return self;
		};

		function tokenize(character) {
			
			var type = sinhala.getType(character);
			if(type == UnicodeSinhala.INDEPENDENT_VOWEL) {
				
				//this is an vowel
				if(eventCallbacks['vowel']) eventCallbacks['vowel'](character);
			} else if(type == UnicodeSinhala.CONSONANT) {

				//send the early consonent and add this one to that			
				if(earlyConsonant) {

					if(eventCallbacks['consonant']) eventCallbacks['consonant'](earlyConsonant);
				}
				earlyConsonant = character;
			} else if(type == UnicodeSinhala.DEPENDENT_VOWEL || type == UnicodeSinhala.SIGN) { 

				if(earlyConsonant) {
					//if there is an early consonent send the mixed
					if(eventCallbacks['mixed']) eventCallbacks['mixed'](earlyConsonant, character);
					earlyConsonant = null;
				} else {
					//cannot have a single DEPENDENT_VOWEL or SIGN without a consion
					//just ignore it
				}
			} else {
				
				//this should be something else
				self.flush();
				if(eventCallbacks['other']) eventCallbacks['other'](character);
			}
		}

		this.flush = function() {
			
			if(earlyConsonant) {
				if(eventCallbacks['consonant']) eventCallbacks['consonant'](earlyConsonant);
				earlyConsonant = null;
			}
		}

		function capitalize(str) {
			
			if(str) {
				return str.substring(0,1).toUpperCase() + str.substring(1);
			} else {
				return "";
			}
		}
	}

	exports.Tokenizer = Tokenizer;

})(window);