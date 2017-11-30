apps.themes.interfaces.subsystems.ContextMenuThemeOuterLayerTrial = function(){
	this.changeBgColor = function(event) {
		this.outerSelector.css("background-color",event.target.value);
	}
	this.changeFontFamily = function(event) {
		this.outerSelector.css("font-family",event.target.value);
	}
	this.changeFontSize= function(event) {
		this.outerSelector.css("font-size",event.target.value+"%");
	}
	this.changeBorderRadius = function(event) {
		this.outerSelector.css("border-radius",event.target.value+"px");
	}
	this.changeHeight = function(evnet) {
		this.outerSelector.height(event.target.value);
	}
	this.changeWidth = function(evnet) {
		this.outerSelector.width(event.target.value);
		this.outerSelector.find("ul").width(event.target.value);
	}
}