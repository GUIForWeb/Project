apps.themes.interfaces.subsystems.trials.WindowThemeHeadLayerTrial = function(){
	this.changeBgColor = function(event) {
		this.headSelector.css("background-color",this.va.iVal.winHBgColor);
	}
	this.changeHeight = function(event) {
		this.node.win.disappear();
		this.node.win.view.hHeight = this.va.iVal.winHHeight;
		this.node.win.view.getView();
		this.node.win.appear();
		this.setChangedInputValues();
	}
	this.changeFontFamily = function(event) {
		this.headSelector.css("font-family",this.va.iVal.winHFontFamily);
	}
}