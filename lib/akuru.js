var fontDir = getFontDir();

function Akuru() {
	
	this.load = function(fontname) {

		var cssBody = "@font-face { font-family: '" + fontname + "'; src: url('" + fontDir + "/" + fontname + ".ttf'); }";	
		var style = document.createElement('style');
		style.type='text/css';
		style.innerHTML = cssBody;
		
		var headID = document.getElementsByTagName("head")[0];    
		headID.appendChild(style);
	};
	
}

function getFontDir() {
	var scripts = document.getElementsByTagName('script');
	var scriptSrc= scripts[scripts.length - 1].src;

	scriptSrc = scriptSrc.split('?')[0].split('#')[0];
	scriptSrc = scriptSrc.substring(0, scriptSrc.lastIndexOf('/'));

	return scriptSrc + '/fonts';
}

var akuru = new Akuru();