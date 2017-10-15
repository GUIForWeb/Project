apps.themes.interfaces.subsystems.trials.WindowThemeButtonTrial = function(){
	this.getBtValues = function(){
		this.width = this.va.iVal.winBWidth;
		this.height = this.va.iVal.winBHeight;
		this.top = this.va.iVal.winBTop;
		this.borderWidth = this.va.iVal.winBBorderWidth;
	}
	this.changeBorderWidth = function(event) {
		this.getBtValues();
		this.trytheme();
		this.btSelector.css("border","solid "+this.borderWidth+"px "+this.va.iVal.winBBorderColor);
		this.setValToNode();
	}
	this.changeBorderColor = function(event) {
		var borderColor = event.target.value;
		this.btSelector.css("border","solid "+this.va.iVal.winBBorderWidth+"px "+borderColor);
	}
	this.changeBgColor = function(event) {
		this.btSelector.css("background-color",event.target.value);
	}
	this.changeWidth = function(event) {
		this.getBtValues();
		this.trytheme();
		this.btSelector.width(this.width);
		this.setValToNode();
	}
	this.changeHeight = function(event) {
		this.getBtValues();
		this.trytheme();
		this.btSelector.height(this.height);
		this.setValToNode();
	}
	
	this.changeTop = function(){
		this.getBtValues();
		this.trytheme();
		this.setValToNode();
	}
	
	this.trytheme = function() {
		this.gap = (this.borderWidth * 2) + this.width + this.top;
		var oBorderWidth = this.node.win.view.oBorderWidth;
		var oWidth = this.node.win.view.oWidth;
		this.xBLeft = oWidth - this.gap - (oBorderWidth*2);
		this.fBLeft = oWidth - (this.gap * 2) - (oBorderWidth*2);
		this.hBLeft = oWidth - (this.gap * 3) - (oBorderWidth*2);
		this.xBSelector.css("position","absolute").css("left",this.xBLeft).css("top",this.top);
		this.fBSelector.css("position","absolute").css("left",this.fBLeft).css("top",this.top);
		this.hBSelector.css("position","absolute").css("left",this.hBLeft).css("top",this.top);
	}
	this.setValToNode = function(){
		var view = this.node.win.view;
		view.bGap = this.gap;
		view.xBLeft = this.xBLeft;
		view.fBLeft = this.fBLeft;
		view.hBLeft = this.hBLeft;
		view.bWidth = this.width;
		view.bHeight = this.height;
		view.bTop = this.top;
		view.bBorderWidth = this.borderWidth;
	}
}