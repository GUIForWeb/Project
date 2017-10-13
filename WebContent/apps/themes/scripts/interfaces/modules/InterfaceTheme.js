apps.themes.interfaces.modules.InterfaceTheme = function() {
	this.inputs = $("#interfaceThemeForm").find("input[type=text]");
	this.start = function() {
		this.controller = new InterfaceThemeController();
		this.controller.__proto__ = this;
		this.focus = new InterfaceThemeFocus();
		this.focus.__proto__ = this.controller;
		this.bTrial = new BarThemeTrial();
		this.bTrial.__proto__ = this.controller;
		this.cTrial = new ContextMenuThemeTrial();
		this.cTrial.__proto__ = this.controller;
		this.tTrial = new TaskbarThemeTrial();
		this.tTrial.__proto__ = this.controller;
		this.wTrial = new WindowThemeTrial();
		this.wTrial.__proto__ = this.controller;
		this.inputs.focusout(function(event){
			taskArray["interfaceTheme"].focus.out.input(event);
		});
	}
}