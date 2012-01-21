test('getType() consonents', function() {

	var us = new UnicodeSinhala();
	equal(us.getType('ක'), UnicodeSinhala.CONSONANT);
	equal(us.getType('ච'), UnicodeSinhala.CONSONANT);
	equal(us.getType('ෆ'), UnicodeSinhala.CONSONANT);

});

test('getType() not a consonent', function() {

	var us = new UnicodeSinhala();
	notEqual(us.getType('ා'), UnicodeSinhala.CONSONANT);
});

test('getType() dependant vowel', function() {

	var us = new UnicodeSinhala();
	equal(us.getType('්'), UnicodeSinhala.DEPENDENT_VOWEL);
	equal(us.getType('ා'), UnicodeSinhala.DEPENDENT_VOWEL);
	equal(us.getType('ෳ'), UnicodeSinhala.DEPENDENT_VOWEL);

});

test('getType() dependant vowel', function() {

	var us = new UnicodeSinhala();
	notEqual(us.getType('ෆ'), UnicodeSinhala.DEPENDENT_VOWEL);
});

test('getType() independant vowel', function() {

	var us = new UnicodeSinhala();
	equal(us.getType('අ'), UnicodeSinhala.INDEPENDENT_VOWEL);
	equal(us.getType('ඕ'), UnicodeSinhala.INDEPENDENT_VOWEL);
	equal(us.getType('ඖ'), UnicodeSinhala.INDEPENDENT_VOWEL);

});

test('getType() independant vowel', function() {

	var us = new UnicodeSinhala();
	notEqual(us.getType('ෆ'), UnicodeSinhala.INDEPENDENT_VOWEL);
});

test('getType() sign', function() {

	var us = new UnicodeSinhala();
	equal(us.getType('ං'), UnicodeSinhala.SIGN);
	equal(us.getType('ඃ'), UnicodeSinhala.SIGN);

});

test('getType() not a sign', function() {

	var us = new UnicodeSinhala();
	notEqual(us.getType('ා'), UnicodeSinhala.SIGN);
});

test('getType() punctuation', function() {

	var us = new UnicodeSinhala();
	equal(us.getType('෴'), UnicodeSinhala.PUNCTUATION);

});

test('getType() not a punctuation', function() {

	var us = new UnicodeSinhala();
	notEqual(us.getType('ා'), UnicodeSinhala.PUNCTUATION);
});
