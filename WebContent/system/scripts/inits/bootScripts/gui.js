$(window).resize(function(){location.reload();});
var taskArray = [];
var gui = new GUI("gui");
var func = new Function();

gui.setContextPath(contextPath);
gui.setContextURL(contextUrl);
gui.setTaskbarValues(taskbarValueArray);
gui.setIconTdValues(iconTdValueArray);

gui.setIconTableValues(iconTableValueArray);
gui.setIconJSONArray(iconJSONArray);
gui.setDataIconJSONArray(dataIconJSONArray);
gui.winDefaultValueArray = winDefaultValueArray;
gui.init();
gui.start();
gui.setWinCount(winCount);
gui.restoreWinAndBar(winAndBarJSONArray);

$(document).ready(function() {
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});
});
