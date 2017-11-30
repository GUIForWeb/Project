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
gui.setIPAddress(ipAddress);
gui.setFileSeparator(fileSeparator);
gui.setTaskmenuValueArray(taskmenuValueArray);
gui.winDefaultValueArray = winDefaultValueArray;
gui.setMobileMode(isMobile);
gui.init();
gui.start();
gui.setWinCount(winCount);
gui.restoreWinAndBar(winAndBarJSONArray);
