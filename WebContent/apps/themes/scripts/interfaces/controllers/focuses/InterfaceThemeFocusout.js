apps.themes.interfaces.controllers.focuses.InterfaceThemeFocusout = function() {
	this.input = function(event) {
		var dir = $(event.target).attr("dir");
		dir = dir.substring(0,1);
		switch(dir){
			case "w":
				taskArray.interfaceTheme.wTrial.switch(event);
				break;
			case "b":
				taskArray.interfaceTheme.bTrial.switch(event);
				break;
			case "t":
				taskArray.interfaceTheme.tTrial.switch(event);
				break;
			case "c":
				taskArray.interfaceTheme.cTrial.switch(event);
				break;
		}
	}
}