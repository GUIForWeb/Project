apps.themes.interfaces.subsystems.ContextMenuThemeOutlayerTrial = function(){
	this.changeBgColor = function(event) {
		this.outerSelector.css("background-color",event.target.value);
	}
	this.changeFontFamily = function(event) {
		this.outerSelector.css("font-family",event.target.value);
	}
	this.changeBorderRadius = function(event) {
		this.outerSelector.css("border-radius",event.target.value+"px");
	}
}