var fontDir = getFontDir();

function Akuru() {

	this.loaded = [];
		
	this.load = function(fontname) {

		var cssBody = "@font-face { font-family: '" + fontname + "'; src: url('" + fontDir + "/" + fontname + ".ttf'); }";	
		cssBody += "\n em{ font-style: 'arial' }"
		cssBody += "\n ." + fontname + "{ font-family: " + fontname + "}";

		var style = document.createElement('style');
		style.type='text/css';
		style.innerHTML = cssBody;
		
		var headID = document.getElementsByTagName("head")[0];    
		headID.appendChild(style);
		this.loaded.push(fontname);
	};
	
}

var akuru = new Akuru();

//font-conversion
$(function() {
	
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

/**
	Parse given html and convert it to DL sinhala format
*/
var sinhalaConverter = new DLConverter();

function parseAndConvert(html) {
	
	var results = "";
	HTMLParser(html, {

		start: function( tag, attrs, unary ) {
			results += "<" + tag;

			for ( var i = 0; i < attrs.length; i++ )
			  results += " " + attrs[i].name + '="' + attrs[i].escaped + '"';

			results += (unary ? "/" : "") + ">";
		},
		end: function( tag ) {
			results += "</" + tag + ">";
		},
		chars: function( text ) {
			results += sinhalaConverter.convert(text);
		},
		comment: function( text ) {
			results += "<!--" + text + "-->";
		}
	});

	return results;
}

function getFontDir() {
	var scripts = document.getElementsByTagName('script');
	var scriptSrc= scripts[scripts.length - 1].src;

	scriptSrc = scriptSrc.split('?')[0].split('#')[0];
	scriptSrc = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));

	return scriptSrc + '/fonts';
}