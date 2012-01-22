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

			$('.akuru').forEach(enableAkuru);
			akuru.loaded.forEach(function(fontname) {
				$('.' + fontname).forEach(enableAkuru);
			});

			function enableAkuru(item) {

				item = $(item);
				var converted = parseAndConvert(item.html());
				item.html(converted);
				
			}
		});

	});

	/**
		Parse given html and convert it to DL sinhala format
	*/
	var sinhalaConverter = new DLConverter();

	function parseAndConvert(html) {
		
		var results = "";
		var allowConvertion = true;
		var innerTags = 0;
		HTMLParser(html, {

			start: function( tag, attrs, unary ) {

				if(allowConvertion) {
					//if conversion stopped, we are not checking this for inner tags
					allowConvertion = isANestedAkuru(attrs);
				} 
				innerTags += 1;

				results += "<" + tag;

				for ( var i = 0; i < attrs.length; i++ )
				  results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';

				results += (unary ? "/" : "") + ">";
			},
			end: function( tag ) {

				if(--innerTags == 0) {
					//when come to the closing of the first tag where conversion stopping started
					allowConvertion = true;
					innerTags = 0;
				}
				results += "</" + tag + ">";
			},
			chars: function( text ) {
				
				if(allowConvertion) {
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