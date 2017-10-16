apps.themes.interfaces.subsystems.trials.TaskbarThemeOutlayerTrial = function(){
	this.changeBgColor = function(event) {
		this.taskbarSelector.css("background-color",event.target.value);
	}

	this.changeOpacity = function(event) {
		this.taskbarSelector.css("opacity",event.target.value);
	}

	this.changeBorderWidth = function(event) {
		var oBorderWidth = this.va.iVal.tbarOBorderWidth;
		var oHeight = this.node.bar.view.oHeight + oBorderWidth*2;
		var oTop = $(window).height() - oHeight;
		this.taskbarSelector.height(oHeight);
		this.taskbarSelector.css("position", "absolute");
		this.taskbarSelector.offset({
			left : 0,
			top : oTop
		});
		this.taskbarSelector.find(".barOuterLayer").css("top",oBorderWidth);
		this.lOuterSelector.height(oHeight);
	}
	/*
	this.changeBgColor = function(event) {
		this.barSelector.css("background-color",event.target.value);
	}
	this.changeWidth = function(){
		this.node.bar.disappear();
		this.setBarValues();
		this.node.bar.view.oWidth = this.va.iVal.barOWidth;
		this.node.bar.appear();
	}
	this.changeHeight = function(){
		this.node.bar.disappear();
		this.setBarValues();
		this.node.bar.view.oHeight = this.va.iVal.barOHeight;
		this.node.bar.appear();
	}
	this.changeBorderWidth = function(){
		this.node.bar.disappear();
		this.setBarValues();
		this.node.bar.view.oBorderWidth = this.va.iVal.barOBorderWidth;
		this.node.bar.appear();
	}
	this.setBarValues = function(){
		var oWidth = this.va.iVal.barOWidth;
		var oHeight = this.va.iVal.barOHeight;
		var oBorderWidth = this.va.iVal.barOBorderWidth;
		this.node.bar.view.oWidth = oWidth;
		this.node.bar.view.oHeight = oHeight;
		this.node.bar.view.oBorderWidth = oBorderWidth;
		this.node.bar.view.nLeft = oBorderWidth;
		this.node.bar.view.nTop = oBorderWidth;
		this.node.bar.view.nWidth = oWidth - oBorderWidth*2;
		this.node.bar.view.nHeight = oHeight - oBorderWidth*2;
	}
	*/
}