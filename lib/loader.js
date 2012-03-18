/* 
	External Resource Loader
	------------------------
	loading zepto if jQuery is not loaded
*/

if(typeof(jQuery) == 'undefined' && typeof(Zepto) == 'undefined') {

    var type = (window.ie)? "jquery": "zepto";

	loadJs( SCRIPT_DIR + '/vendors/' + type + '.min.js', function() {
		SCRIPTS.start();
	});	
} else {
	SCRIPTS.start();
}

 function loadJs(url, loaded) {
    var scr = document.createElement('script');
    scr.type = 'text/javascript';
    scr.src = url;
    if (navigator.userAgent.indexOf('MSIE') > -1) {
        scr.onload = scr.onreadystatechange = function () {
            if (this.readyState == "loaded" || this.readyState == "complete") {
                if (loaded) { loaded(); }
            }
            scr.onload = scr.onreadystatechange = null;
        };
    } else {
        scr.onload = loaded;
    }
    document.getElementsByTagName('head')[0].appendChild(scr);
 };