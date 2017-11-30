apps.themes.interfaces.subsystems.trials.BarThemeNameLayerTrial = function(){
	this.changeBgColor = function(event) {
		this.nameSelector.css("background-color",event.target.value);
	}
	/*
	this.changeBorderWidth = function(event){
		this.node.win.disappear();
		this.node.win.view.oBorderWidth = this.va.iVal.winOBorderWidth;
		this.node.win.view.getView();
		this.node.win.appear();
		this.setChangedInputValues();
	}
	this.changeBgColor = function(event) {
		this.winSelector.css("background-color",this.va.iVal.winOBgColor);
	}
	this.changeMinWidth = function(event) {
		this.node.win.view.minWidth = this.va.iVal.winMinWidth;
	}
	this.changeMinHeight = function(event) {
		this.node.win.view.minHeight = this.va.iVal.winMinHeight;
	}
	*/
}