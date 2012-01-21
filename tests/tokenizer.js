test('tokenizer basic', function() {
	
	var t = new Tokenizer();

	t.onVowel(function(word) {
		console.log('vowel %s', word);
	});

	t.onConsonant(function(word) {
		console.log('consonant %s', word);
	});

	t.onMixed(function(part1, part2) {
		console.log('mixed %s', part1 + part2);
	});

	t.onOther(function(word) {
		console.log('other %s', word);
	});

	t.write('අරුනෝද සුසිරිපාල ').flush();

	ok(true);
});