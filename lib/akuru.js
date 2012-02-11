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
		};

		this.isLoaded = function(fontname) {
			return (this.loadedObj[fontname])? true: false;
		};

		this.convert = function(text, fontname) {
			
			return parseAndConvert(text, fontname);	
		};

		/*
			Enable AkuruLK for the given cssSelection
		*/	
		this.enable = function enable (cssSelector, fontname) {
			
			var div = $(cssSelector);	
			enableAkuru(div, fontname);
		};

		/*
			Calls when system is fully loaded (including the dom)
			If loaded execute imidiately
		*/
		this.ready = function(callback) {
			SCRIPTS.ready(function() {
				$(function() {
					callback();
				});
			});
		};
		
	}

	var akuru = exports.akuru = new Akuru();

	//font-conversion
	SCRIPTS.ready(function() {
		
		$(function() {
			
			//enable the global font
			// if(akuru.globalFont) {
			// 	$('body').addClass(akuru.globalFont);
			// }

			enableAkuru($('.akuru'));
			akuru.loaded.forEach(function(fontname) {

				enableAkuru($('.' + fontname), fontname);
			});

		});

	});

	/**
		Iterate through given nodes and parse
	*/
	function enableAkuru(nodes, fontname) {

		for(var lc=0; lc<nodes.length; lc++) {
			var div = $(nodes[lc]);
			var converted = parseAndConvert(div.html(), fontname);
			div.html(converted);
		}
	
	}

	/**
		Parse given html and convert it to DL sinhala format
	*/
	var sinhalaConverter = new LegacyConverter();

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
						convert: validateForConverting(tag, attrs)
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
				if(tagSpec.convert) {
					results += "<span class='akuru-converted' style='font-family: " + fontname + "'>" + sinhalaConverter.convert(text, fontname) + "</span>";
				} else {
					results += text;
				}
			},
			comment: function( text ) {
				results += "<!--" + text + "-->";
			}
		});

		/**

			Looking at the tag at attributes, check whether allows to convert or not
		*/
		function validateForConverting(tag, attrs) {
			
			var notConvertingTags = {
				"em": true,
				"pre": true,
				"code": true
			};

			var validated = true;
			if(notConvertingTags[tag]) {

				//do not validate for specific defined tags
				validated = false;
			} else if(attrs) {
				attrs.forEach(function(attr) {
					
					if(attr.name =='class' && attr.escaped == 'akuru-converted') {
						
						//not converting already parsed
						validated = false;
					} else if(attr.name == 'class' && attr.value != "") {
						
						// Check for the nested akuru enabled tags.
						// If so we are not converting them.
						// They will be convert at some other point
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