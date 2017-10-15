apps.themes.interfaces.modules.InterfaceTheme = function() {
	this.init = function() {
		this.form = $("#interfaceThemeForm");
		this.winTagId = $("#interfaceThemeForm").parent().parent().prop("id");
		this.node = gui.winAndBar.manager.nm.getNodeWithWinTag(this.winTagId);
		this.barTagId = this.node.bar.tagId;
		this.inputs = this.form.find("input[type=text]");
		this.controller = new InterfaceThemeController();
		this.controller.__proto__ = this;
		this.focus = new InterfaceThemeFocus();
		this.focus.__proto__ = this.controller;
		this.mouse = new InterfaceThemeMouse();
		this.mouse.__proto__ = this.controller;
		this.bTrial = new BarThemeTrial();
		this.bTrial.__proto__ = this.controller;
		this.cTrial = new ContextMenuThemeTrial();
		this.cTrial.__proto__ = this.controller;
		this.tTrial = new TaskbarThemeTrial();
		this.tTrial.__proto__ = this.controller;
		this.wTrial = new WindowThemeTrial();
		this.wTrial.__proto__ = this.controller;
		this.winSelector = $("#"+this.winTagId);
		this.barSelector = $("#"+this.barTagId);
		this.contentSelector = this.winSelector.find(".windowContentLayer");
		this.appendFunctions();
	}
	this.appendFunctions = function(){
		this.inputs.focusout(function(event){
			taskArray["interfaceTheme"].focus.out.input(event);
		});
		this.inputs.mousedown(function(event){
			taskArray["interfaceTheme"].mouse.down.input(event);
		});
		this.inputs.mouseup(function(event){
			taskArray["interfaceTheme"].mouse.up.input(event);
		});
	}
	this.initValues = function(){
		var val = null;
		for(ii=0; ii<this.inputs.length; ii++){
			if(isNaN(this.inputs[ii].value))
				val = this.inputs[ii].value;
			else
				val = parseFloat(this.inputs[ii].value);
			this.controller.va.iVal[this.inputs[ii].title] = val;
		}
	}
}