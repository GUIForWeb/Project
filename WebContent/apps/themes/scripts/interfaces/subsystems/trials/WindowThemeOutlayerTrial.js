apps.themes.interfaces.subsystems.trials.WindowThemeOutlayerTrial = function(){
	this.changeBorderWidth = function(event){
		this.node.win.disappear();
		this.node.win.view.oBorderWidth = this.va.iVal.winOBorderWidth;
		this.node.win.view.getView();
		this.node.win.appear();
		this.setChangedInputValues();
		/*
		var input = this.inputs.filter(function(idx){
			if(this.title == "winOBorderWidth")
				return this;
		});
		input.val(this.va.iVal.winOBorderWidth);
		input.focus();
		*/
	}
	this.changeBgColor = function(event) {
		this.winSelector.css("background-color",this.va.iVal.winOBgColor);
	}
}