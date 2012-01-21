test('basic convert', function() {
	
	var dl = new DLConverter();
	equal(dl.convert('අරුනෝද සුසිරිපාල'), 'wrefkdao iqisßmd,');
});

test('symboles basic', function() {
	
	var dl = new DLConverter();
	equal(dl.convert('()+\'/?:'), '^&¤~$//(_');
	equal(dl.convert('!-=]['), '`)}‡');
})