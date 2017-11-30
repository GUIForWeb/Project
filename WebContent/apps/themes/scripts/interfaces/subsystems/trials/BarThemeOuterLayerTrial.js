apps.themes.interfaces.subsystems.trials.BarThemeOuterLayerTrial = function(){
	this.changeBgColor = function(event) {
		this.barSelector.css("background-color",event.target.value);
	}
	this.changeWidth = function(){
		this.node.bar.disappear();
		this.setValues();
		this.node.bar.view.oWidth = this.va.iVal.barOWidth;
		this.node.bar.appear();
	}
	this.changeHeight = function(){
		this.node.bar.disappear();
		this.setValues();
		this.node.bar.view.oHeight = this.va.iVal.barOHeight;
		this.node.bar.appear();
	}
	this.changeBorderWidth = function(){
		this.node.bar.disappear();
		this.setValues();
		this.node.bar.view.oBorderWidth = this.va.iVal.barOBorderWidth;
		this.node.bar.appear();
	}
	this.setValues = function(){
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
}