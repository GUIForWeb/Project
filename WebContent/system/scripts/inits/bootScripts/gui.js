$(window).resize(function(){location.reload();});

var gui = new GUI("gui");
var func = new Function();

iconDataList = func.javaListToJSMap(iconDataList);
windowList = func.javaListToJSMap(windowList);
barList = func.javaListToJSMap(barList);

windowInBarList = func.javaListToJSMap(windowInBarList);

gui.setContextPath(contextPath);
gui.setContextURL(contextUrl);
gui.setTaskbarValues(taskbarValueArray);
gui.setIconTdValues(iconTdValueArray);

gui.setIconTableValues(iconTableValueArray);
gui.setIconDataList(iconDataList);
gui.setDesktopDataArray(desktopDataArray);
gui.winDefaultValueArray = winDefaultValueArray;
gui.init();
gui.start();
gui.setWinCount(winCount);
gui.restoreWinAndBar(winAndBarJSON);

$(document).ready(function() {
	$(window).keydown(function(event){
		if(event.keyCode == 13) {
			event.preventDefault();
			return false;
		}
	});
});
