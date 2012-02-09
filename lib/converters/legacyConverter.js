(function(exports) {
	
	function LegacyConverter() {

		var texts = getTexts();
		var tokenizer = new Tokenizer();
		var output = "";

		this.convert = function(unicodeText, fontname) {

			output = "";
			otherBuffer = "";

			tokenizer.onVowel(function(char) {

				flushOtherBuffer();
				output += texts[char];
			});

			tokenizer.onConsonant(function(char) {

				flushOtherBuffer();
				output += texts[char];
			});

			tokenizer.onMixed(function(part1, part2) {
				flushOtherBuffer();
				var mixed = part1 + part2;
				if(texts[mixed]) {
					output += texts[mixed];
				} else {
					output += texts[part1];
					output += texts[part2];
				}
			});

			tokenizer.onOther(function(char) {
				
				if(texts[char]) {
					flushOtherBuffer();
					output += texts[char];
				} else {
					otherBuffer += char;
				}
			});

			function flushOtherBuffer() {

				if(otherBuffer) {
					output += '<em>' + otherBuffer + '</em>';
					otherBuffer = ""
				}
			}

			tokenizer.write(unicodeText).flush();
			flushOtherBuffer();
			return output;
		};

		function getTexts() {
			
			return {
				",": "\"",
				".": "'",
				"(": "^",
				")": "￩",
				"%": "]",
				"/": "$",
				"–": "ￔ",
				"!": "ￒ",
				"=": "ￏ",
				"'": "ￎ",
				"+": "¤",
				"÷": "ￋ",
				";": "·",
				"'": "~",
				"?": "@",
				":": "(",
				"ත්‍රෛ": "ff;%",
				"ශෛ": "ffY",
				"චෛ": "ffp",
				"කෛ": "ffl",
				"මෛ": "ffu",
				"පෛ": "ffm",
				"දෛ": "ffo",
				"තෛ": "ff;",
				"නෛ": "ffk",
				"ධෛ": "ffO",
				"වෛ": "ffj",
				"ප්‍රෞ": "fm%!",
				"ෂ්‍යෝ": "fIHda",
				"ඡ්‍යෝ": "fPHda",
				"ඪ්‍යෝ": "fVHda",
				"ඝ්‍යෝ": "f>Hda",
				"ඛ්‍යෝ": "fLHda",
				"ළ්‍යෝ": "f<Hda",
				"ඵ්‍යෝ": "fMHda",
				"ඨ්‍යෝ": "fGHda",
				"ශ්‍යෝ": "fYHda",
				"ක්‍ෂ්‍යෝ": "fÌHda",
				"බ්‍යෝ": "fnHda",
				"ච්‍යෝ": "fpHda",
				"ඩ්‍යෝ": "fâHda",
				"ෆ්‍යෝ": "f*Hda",
				"ග්‍යෝ": "f.Hda",
				"ක්‍යෝ": "flHda",
				"ල්‍යෝ": "f,Hda",
				"ම්‍යෝ": "fuHda",
				"න්‍යෝ": "fkHda",
				"ප්‍යෝ": "fmHda",
				"ද්‍යෝ": "foHda",
				"ස්‍යෝ": "fiHda",
				"ට්‍යෝ": "fgHda",
				"ව්‍යෝ": "fjHda",
				"ත්‍යෝ": "f;Hda",
				"භ්‍යෝ": "fNHda",
				"ධ්‍යෝ": "fOHda",
				"ථ්‍යෝ": "f:Hda",
				"ෂ්‍යො": "fIHd",
				"ශ්‍යො": "fYHd",
				"ඛ්‍යො": "fLHd",
				"ක්‍ෂ්‍යො": "fÌHd",
				"බ්‍යො": "fnHd",
				"ව්‍යො": "fjHd",
				"ඩ්‍යො": "fvHd",
				"ෆ්‍යො": "f*Hd",
				"ග්‍යො": "f.Hd",
				"ක්‍යො": "flHd",
				"ම්‍යො": "fuHd",
				"ප්‍යො": "fmHd",
				"ද්‍යො": "foHd",
				"ස්‍යො": "fiHd",
				"ට්‍යො": "fgHd",
				"ව්‍යො": "fjHd",
				"ත්‍යො": "f;Hd",
				"භ්‍යො": "fNHd",
				"ධ්‍යො": "fOHd",
				"ථ්‍යො": "f:Hd",
				"ෂ්‍යෙ": "fIH",
				"ඡ්‍යෙ": "fPH",
				"ළ්‍යෙ": "f<H",
				"ණ්‍යෙ": "fKH",
				"ච්‍යෙ": "fpH",
				"ල්‍යෙ": "f,H",
				"න්‍යෙ": "fkH",
				"ශ්‍යෙ": "fYH",
				"ඛ්‍යෙ": "fLH",
				"ක්‍ෂ්යෙ": "fÌH",
				"බ්‍යෙ": "fnH",
				"ඩ්‍යෙ": "fvH",
				"ෆ්‍යෙ": "f*H",
				"ග්‍යෙ": "f.H",
				"ක්‍යෙ": "flH",
				"ම්‍යෙ": "fuH",
				"ප්‍යෙ": "fmH",
				"ද්‍යෙ": "foH",
				"ස්‍යෙ": "fiH",
				"ට්‍යෙ": "fgH",
				"ව්‍යෙ": "fjH",
				"ත්‍යෙ": "f;H",
				"භ්‍යෙ": "fNH",
				"ධ්‍යෙ": "fOH",
				"ථ්‍යෙ": "f:H",
				"ෂ්‍රෝ": "fI%da",
				"ඝ්‍රෝ": "f>%da",
				"ශ්‍රෝ": "fY%da",
				"ක්‍ෂ්‍රෝ": "fÌ%da",
				"බ්‍රෝ": "fn%da",
				"ඩ්‍රෝ": "fv%da",
				"ෆ්‍රෝ": "f*%da",
				"ග්‍රෝ": "f.%da",
				"ක්‍රෝ": "fl%da",
				"ප්‍රෝ": "fm%da",
				"ද්‍රෝ": "føda",
				"ස්‍රෝ": "fi%da",
				"ට්‍රෝ": "fg%da",
				"ත්‍රෝ": "f;%da",
				"ශ්‍රො": "fY%d",
				"ඩ්‍රො": "fv%d",
				"ෆ්‍රො": "f*%d",
				"ග්‍රො": "f.%d",
				"ක්‍රො": "fl%d",
				"ප්‍රො": "fm%d",
				"ද්‍රො": "fød",
				"ස්‍රො": "fi%d",
				"ට්‍රො": "fg%d",
				"ත්‍රො": "f;%d",
				"ශ්‍රේ": "fYa",
				"බ්‍රේ": "fí%",
				"ඩ්‍රේ": "fâ%",
				"ෆ්‍රේ": "f*a%",
				"ග්‍රේ": "f.a%",
				"ක්‍රේ": "fla%",
				"ප්‍රේ": "fma%",
				"ද්‍රේ": "føa",
				"ස්‍රේ": "fia%",
				"ත්‍රේ": "f;a%",
				"ධ්‍රේ": "fè%",
				"ෂ්‍රෙ": "fI%",
				"ශ්‍රෙ": "fY%",
				"බ්‍රෙ": "fn%",
				"ෆ්‍රෙ": "f*%",
				"ග්‍රෙ": "f.%",
				"ක්‍රෙ": "fl%",
				"ප්‍රෙ": "fm%",
				"ද්‍රෙ": "fø",
				"ස්‍රෙ": "fi%",
				"ත්‍රෙ": "f;%",
				"භ්‍රෙ": "fN%",
				"ධ්‍රෙ": "fO%",
				"්‍ය": "H",
				"්‍ර": "%",
				"ෂෞ": "fI!",
				"ඡෞ": "fP!",
				"ශෞ": "fY!",
				"බෞ": "fn!",
				"චෞ": "fp!",
				"ඩෞ": "fv!",
				"ෆෞ": "f*!",
				"ගෞ": "f.!",
				"කෞ": "fl!",
				"ලෞ": "f,!",
				"මෞ": "fu!",
				"නෞ": "fk!",
				"පෞ": "fm!",
				"දෞ": "fo!",
				"රෞ": "fr!",
				"සෞ": "fi!",
				"ටෞ": "fg!",
				"තෞ": "f;!",
				"භෞ": "fN!",
				"ඤෞ": "f[!",
				"ෂෝ": "fIda",
				"ඹෝ": "fUda",
				"ඡෝ": "fPda",
				"ඪෝ": "fVda",
				"ඝෝ": "f>da",
				"ඛෝ": "fLda",
				"ළෝ": "f<da",
				"ණෝ": "fKda",
				"ඵෝ": "fMda",
				"ඨෝ": "fGda",
				"ඬෝ": "fËda",
				"ශෝ": "fYda",
				"ඥෝ": "f{da",
				"ඳෝ": "f|da",
				"ක්‍ෂෝ": "fÌda",
				"බෝ": "fnda",
				"චෝ": "fpda",
				"ඩෝ": "fvda",
				"ෆෝ": "f*da",
				"ගෝ": "f.da",
				"හෝ": "fyda",
				"කෝ": "flda",
				"ලෝ": "f,da",
				"මෝ": "fuda",
				"නෝ": "fkda",
				"පෝ": "fmda",
				"දෝ": "foda",
				"රෝ": "frda",
				"සෝ": "fida",
				"ටෝ": "fgda",
				"වෝ": "fjda",
				"තෝ": "f;da",
				"භෝ": "fNda",
				"යෝ": "fhda",
				"ඤෝ": "f[da",
				"ධෝ": "fOda",
				"ථෝ": "f:da",
				"ෂො": "fId",
				"ඹො": "fUd",
				"ඡො": "fPd",
				"ඪො": "fVd",
				"ඝො": "f>d",
				"ඛො": "fLd",
				"ළො": "f<d",
				"ණො": "fKd",
				"ඵො": "fMd",
				"ඨො": "fGd",
				"ඬො": "fËd",
				"ශො": "fYd",
				"ඥො": "f{d",
				"ඳො": "f|d",
				"ක්‍ෂො": "fÌd",
				"බො": "fnd",
				"චො": "fpd",
				"ඩො": "fvd",
				"ෆො": "f*d",
				"ගො": "f.d",
				"හො": "fyd",
				"කො": "fld",
				"ලො": "f,d",
				"මො": "fud",
				"නො": "fkd",
				"පො": "fmd",
				"දො": "fod",
				"රො": "frd",
				"සො": "fid",
				"ටො": "fgd",
				"වො": "fjd",
				"තො": "f;d",
				"භො": "fNd",
				"යො": "fhd",
				"ඤො": "f[d",
				"ධො": "fOd",
				"ථො": "f:d",
				"ෂේ": "fIa",
				"ඹේ": "fò",
				"ඡේ": "fþ",
				"ඪේ": "f\a",
				"ඝේ": "f>a",
				"ඛේ": "fÄ",
				"ළේ": "f<a",
				"ණේ": "fKa",
				"ඵේ": "fMa",
				"ඨේ": "fGa",
				"ඬේ": "få",
				"ශේ": "fYa",
				"ඥේ": "f{a",
				"ඳේ": "f|a",
				"ක්‍ෂේ": "fÌa",
				"බේ": "fí",
				"චේ": "fÉ",
				"ඩේ": "fâ",
				"ෆේ": "f*",
				"ගේ": "f.a",
				"හේ": "fya",
				"පේ": "fma",
				"කේ": "fla",
				"ලේ": "f,a",
				"මේ": "fï",
				"නේ": "fka",
				"දේ": "foa",
				"රේ": "f¾",
				"සේ": "fia",
				"ටේ": "fÜ",
				"වේ": "fõ",
				"තේ": "f;a",
				"භේ": "fNa",
				"යේ": "fha",
				"ඤේ": "f[a",
				"ධේ": "fè",
				"ථේ": "f:a",
				"ෂෙ": "fI",
				"ඹෙ": "fU",
				"ඓ": "ft",
				"ඡෙ": "fP",
				"ඪෙ": "fV",
				"ඝෙ": "f>",
				"ඛෙ": "fn",
				"ළෙ": "f<",
				"ණෙ": "fK",
				"ඵෙ": "fM",
				"ඨෙ": "fG",
				"ඬෙ": "fË",
				"ශෙ": "fY",
				"ඥෙ": "f{",
				"ඳෙ": "fË",
				"ක්‍ෂෙ": "fÌ",
				"බෙ": "fn",
				"චෙ": "fp",
				"ඩෙ": "fv",
				"ෆෙ": "f*",
				"ගෙ": "f.",
				"හෙ": "fy",
				"කෙ": "fl",
				"ලෙ": "f,",
				"මෙ": "fu",
				"නෙ": "fk",
				"පෙ": "fm",
				"දෙ": "fo",
				"රෙ": "fr",
				"සෙ": "fi",
				"ටෙ": "fg",
				"වෙ": "fj",
				"තෙ": "f;",
				"භෙ": "fN",
				"යෙ": "fh",
				"ඤෙ": "f[",
				"ධෙ": "fO",
				"ථෙ": "f:",
				"තු": ";=",
				"ගු": ".=",
				"කු": "l=",
				"තූ": ";+",
				"ගූ": ".+",
				"කූ": "l+",
				"රු": "re",
				"රූ": "rE",
				"ආ": "wd",
				"ඇ": "we",
				"ඈ": "wE",
				"ඌ": "W!",
				"ඖ": "T!",
				"ඒ": "ta",
				"ඕ": "´",
				"ඳි": "¢",
				"ඳී": "£",
				"දූ": "¥",
				"දී": "§",
				"ලූ": "¨",
				"ර්‍ය": "©",
				"ඳූ": "ª",
				"ර්": "¾",
				"ඨි": "À",
				"ඨී": "Á",
				"ඡී": "Â",
				"ඛ්": "Ä",
				"ඛි": "Å",
				"ලු": "Æ",
				"ඛී": "Ç",
				"දි": "È",
				"ච්": "É",
				"රී": "Í",
				"ඪී": "Î",
				"ඪී": "Ð,",
				"චි": "Ñ",
				"ථී": "Ò",
				"ථී": "Ó",
				"චී": "Ö",
				"ඞ්": "Ù",
				"ඵී": "Ú",
				"ට්": "Ü",
				"ඵි": "Ý",
				"රි": "ß",
				"ටී": "à",
				"ටි": "á",
				"ඩ්": "â",
				"ඩී": "ã",
				"ඩි": "ä",
				"ඬ්": "å",
				"ඬි": "ç",
				"ධ්": "è",
				"ඬී": "é",
				"ධි": "ê",
				"ධී": "ë",
				"බි": "ì",
				"බ්": "í",
				"බී": "î",
				"ම්": "ï",
				"මි": "ñ",
				"ඹ්": "ò",
				"මී": "ó",
				"ඹි": "ô",
				"ව්": "õ",
				"ඹී": "ö",
				"ඳු": "÷",
				"ද්‍ර": "ø",
				"වී": "ù",
				"වි": "ú",
				"ඞ්": "û",
				"ඞී": "ü",
				"ඡි": "ý",
				"ඡ්": "þ",
				"දු": "ÿ",
				"ර්‍ණ": "“",
				"ණී": "”",
				"ඡි": "‰",
				"ඤු": "™",
				"ග": ".",
				"ළු": "¿",
				"ෂ": "I",
				"ං": "x",
				"ඃ": "#",
				"ඹ": "U",
				"ඡ": "P",
				"ඪ": "V",
				"ඊ": "B",
				"ඣ": "CO",
				"ඛ": "L",
				"ළ": "<",
				"ණ": "K",
				"ඵ": "M",
				"ඨ": "G",
				"ඃ": "#",
				"\"": "¶",
				"/": "$",
				")": "&",
				"-": ")",
				"ෆ": "*",
				"ල": ",",
				"-": "-",
				"රැ": "/",
				"ථ": ":",
				"ත": ";",
				"ළ": "&#60;",
				"ඝ": "&#62;",
				"රෑ": "?",
				"ඊ": "B",
				"ක‍": "C",
				"‍ෘ": "D",
				"ෑ": "E",
				"ත‍": "F",
				"ඨ": "G",
				"්‍ය": "H",
				"ෂ": "I",
				"න‍": "J",
				"ණ": "K",
				"ඛ": "L",
				"ඵ": "M",
				"භ": "N",
				"ධ": "O",
				"ඡ": "P",
				"ඍ": "R",
				"ඔ": "T",
				"ඹ": "U",
				"ඪ": "V",
				"උ": "W",
				"ශ": "Y",
				"ඤ": "[",
				"ඉ": "b",
				"ට": "g",
				"ය": "h",
				"ස": "i",
				"ව": "j",
				"න": "k",
				"ක": "l",
				"ප": "m",
				"බ": "n",
				"ද": "o",
				"ච": "p",
				"ර": "r",
				"එ": "t",
				"ම": "u",
				"ඩ": "v",
				"අ": "w",
				"හ": "y",
				"ඥ": "{",
				"ඳ": "|",
				"ක්‍ෂ": "Ì",
				"ැ": "e",
				"ෑ": "E",
				"ෙ": "f",
				"ු": "q",
				"ි": "s",
				"ූ": "Q",
				"ී": "S",
				"ෘ": "D",
				"ෲ": "DD",
				"ෟ": "!",
				"ා": "d",
				"්": "a",
				"￦": "\"",
				"�": "'",
				"￫": "^",
				"￩": "&",
				"ￔ": ")",
				"ￓ": "@",
				"ￒ": "`",
				"ￏ": "}",
				"ￎ": "~",
				"ￍ": "¤",
				"ￌ": "•",
				"ￊ": "›",
				"ﾶ": "∙",
				"!": "`",
				"ￕ": "]",
				"-": ")",
				"=": "}",
				"]": "‡",
				"[": "",
				" ": " ",
				"ඟ": "Õ",
				"ඟෝ": "fÕda",
				"ඟො": "fÕd",
				"ඟේ": "fÕa",
				"ඟෙ": "fÕ",
				"ඟී": "ÕS",
				"ජෛ": "ffc",
				"ජ්‍යෝ": "fcHda",
				"ජ්‍යො": "fcHd",
				"ජ්‍යෙ": "fcH",
				"ජෞ": "fc!",
				"ජෝ": "fcda",
				"ජො": "fcd",
				"ජේ": "fÊ",
				"ජෙ": "fc",
				"ජ්": "Ê",
				"ජී": "Ô",
				"ජි": "ð",
				"ජ": "c",
				"\n": "\n",
				"\r": "\r"
			};
		}
	}

	exports.LegacyConverter = LegacyConverter;

})(window);