/**
	Define Unicode Sinhale alphabet

	Signs = 3458 - 3459
	indepedentVowels = 3461 -3478.
	consonants = 3482 - 3526.
	dependentVowels = 3535 - 3571.
	punchuations = 3572
*/
(function(exports) {
	
	function UnicodeSinhala() {
	
		this.getType = function getType(unicodeChar) {
			
			if(unicodeChar) {
				
				var charCode = unicodeChar.toString().charCodeAt(0);
				if(charCode >= 3482 && charCode <= 3526) {

					return UnicodeSinhala.CONSONANT;
				} else if(charCode >= 3535 && charCode <= 3571) {

					return UnicodeSinhala.DEPENDENT_VOWEL;
				} else if(charCode == 3530 || charCode == 3458) {
					
					return UnicodeSinhala.DEPENDENT_VOWEL;
				} else if(charCode >= 3461 && charCode <= 3478) {

					return UnicodeSinhala.INDEPENDENT_VOWEL;
				} else if(charCode >= 3458 && charCode <= 3459) {

					return UnicodeSinhala.SIGN;
				} else if(charCode >= 3458 && charCode <= 3459) {

					return UnicodeSinhala.SIGN;
				} else if(charCode == 3572) {

					return UnicodeSinhala.PUNCTUATION;
				} else {

					return UnicodeSinhala.OTHER;
				}
					
			} else {
				return UnicodeSinhala.OTHER;
			}
		};
	}

	UnicodeSinhala.INDEPENDENT_VOWEL = 4; //
	UnicodeSinhala.CONSONANT = 8; //
	UnicodeSinhala.DEPENDENT_VOWEL = 16; // 
	UnicodeSinhala.PUNCTUATION = 32;
	UnicodeSinhala.SIGN = 64; //
	UnicodeSinhala.OTHER = 128;

	exports.UnicodeSinhala = UnicodeSinhala;

})(window);