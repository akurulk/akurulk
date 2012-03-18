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
			
			if(window.ie) {
				//ie specific eot font loading

				var cssBody = "@font-face {\n font-family: '" + fontname + "';\n src: url('" + fontDir + "/" + fontname + ".eot') \n }";
				cssBody += "\n em{ font-family: 'arial'; font-style: normal; }"
				cssBody += "\n ." + fontname + "{ font-family: " + fontname + "}";

			} else {

				var cssBody = "@font-face {\n font-family: '" + fontname + "';\n src: url('" + fontDir + "/" + fontname + ".ttf') \n }";
				cssBody += "\n em{ font-family: 'arial'; font-style: normal; }"
				cssBody += "\n ." + fontname + "{ font-family: " + fontname + "}";
			}

			var style = "<style type='text/css'>" + cssBody + "</style>";
			document.write(style);

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

		//parsing handler for akuru
		function AkuruHandler(callback, options) {

			this.reset = function DefaultHandler$reset () {
				results = "";
			};

			this.done = function DefaultHandler$done () {
				handleCallback(null);
			};

			this.writeTag = function DefaultHandler$writeTag (element) {
				
				if(element.name.substring(0,1) != '/') {
					//start tag
					var tagSpec = {
						name: element.name,
						convert: validateForConverting(element.name, createAttrs(element.raw))
					};
					tagStack.push(tagSpec);

				} else {
					//end tag
					tagStack.pop();
				}

				results+= "<" + element.raw + " style: 'font-family: derana;'>";
			} 

			this.writeText = function DefaultHandler$writeText (element) {
				
				var tagSpec = tagStack[tagStack.length -1];
				if(tagSpec.convert) {
					var fontFamily = (fontname)? "font-family: " + fontname + ";" : "";
					var legacyText = sinhalaConverter.convert(element.raw, fontname);
					// alert(legacyText);
					results += "<span class='akuru-converted' style='" + fontFamily + "'>" + legacyText + "</span>";
				} else {
					results += element.raw;
				}
			} 

			this.writeComment = function () {};

			this.writeDirective = function () {};

			this.error = function DefaultHandler$error (error) {
				handleCallback(error);
			}

			function handleCallback(error)  {
				
				if(callback) callback(error, results);
			}

			function createAttrs(raw) {
				
				console.log(raw);
				var attrs = [];
				var parts = raw.split(' ');

				for(var lc=1; lc<parts.length; lc++) {

					var innerParts = parts[lc].split('=');
					var attr = {};
					attr.name = innerParts[0];
					attr.escaped = attr.value = (innerParts[1])? innerParts[1].replace(/'/g, "").replace(/"/g, ""): "";

					attrs.push(attr);
				}

				console.log(attrs);
				return attrs;
			}
		}

		//using  HTMLPASRSER
		var handler = new AkuruHandler();
		var parser = new Tautologistics.NodeHtmlParser.Parser(handler);
		//start parsing
		try{
			parser.parseComplete(html);
		} catch(e) {
			for(var key in e) {
				alert(key + " " + e[key]);
			}
		}


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