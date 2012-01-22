(function(exports) {

	//get the font directory
	var scriptDir = exports.SCRIPT_DIR = getScriptDir();
	var fontDir = scriptDir + '/fonts';

	function Akuru() {

		var self = this;
		this.loaded = [];
		this.loadedObj = {};
		this.globalFont;
			
		this.load = function(fontname) {

			var cssBody = "@font-face { font-family: '" + fontname + "'; src: url('" + fontDir + "/" + fontname + ".ttf'); }";	
			cssBody += "\n em{ font-family: 'arial'; font-style: normal; }"
			cssBody += "\n ." + fontname + "{ font-family: " + fontname + "}";

			var style = document.createElement('style');
			style.type='text/css';
			style.innerHTML = cssBody;
			
			var headID = document.getElementsByTagName("head")[0];    
			headID.appendChild(style);
			this.loaded.push(fontname);
			this.loadedObj[fontname] = true;
		};

		this.global = function(fontname) {
			self.load(fontname);
			self.globalFont = fontname;
		}

		this.isLoaded = function(fontname) {
			return (this.loadedObj[fontname])? true: false;
		}
		
	}

	var akuru = exports.akuru = new Akuru();

	//font-conversion
	SCRIPTS.ready(function() {
		
		$(function() {
			
			//enable the global font
			// if(akuru.globalFont) {
			// 	$('body').addClass(akuru.globalFont);
			// }

			$('.akuru').forEach(enableAkuru());
			akuru.loaded.forEach(function(fontname) {
				$('.' + fontname).forEach(enableAkuru(fontname));
			});

			function enableAkuru(fontname) {

				return function(item) {
					item = $(item);
					var converted = parseAndConvert(item.html(), fontname);
					item.html(converted);
				}
				
			}
		});

	});

	/**
		Parse given html and convert it to DL sinhala format
	*/
	var sinhalaConverter = new DLConverter();

	function parseAndConvert(html, fontname) {
		
		var results = "";

		//used to identify current tag
		var tagStack = [];

		//adding the main div
		tagStack.push({
			name: 'div',
			convert: true
		});

		HTMLParser(html, {

			start: function( tag, attrs, unary ) {

				if(!unary) {
					var tagSpec = {
						name: tag,
						convert: isANestedAkuru(attrs)
					};
					tagStack.push(tagSpec);
				} 

				results += "<" + tag;

				for ( var i = 0; i < attrs.length; i++ ) {
					var attr = attrs[i];
					if(attr.name == 'style') {
						attr.escaped += ';font-family: ' + fontname + ';';
					}
				  	results += " " + attr.name + '="' + attr.escaped + '"';
				}	

				results += (unary ? "/" : "") + ">";
			},
			end: function( tag ) {

				tagStack.pop();

				results += '</' +  tag + '>';
			},
			chars: function( text ) {
				
				var tagSpec = tagStack[tagStack.length -1];
				console.log(text);
				if(tagSpec.convert) {
					results += sinhalaConverter.convert(text);
				} else {
					results += text;
				}
			},
			comment: function( text ) {
				results += "<!--" + text + "-->";
			}
		});

		/**
			Cheche for the nested akuru enabled tags.
			If so we are not converting them.
			They will be convert at some other point
		*/
		function isANestedAkuru(attrs) {
			
			var validated = true;
			if(attrs) {
				attrs.forEach(function(attr) {
					
					if(attr.name == 'class' && attr.value != "") {
						var classes = attr.value.split(' ') ;
						classes.forEach(function(className) {
							validated = !akuru.isLoaded(className);
						});
					}
				});
			}

			return validated;
		}

		return results;
	}

	function getScriptDir() {
		var scripts = document.getElementsByTagName('script');
		var scriptSrc= scripts[scripts.length - 1].src;

		scriptSrc = scriptSrc.split('?')[0].split('#')[0];
		scriptSrc = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));

		return scriptSrc;
	}

})(window);