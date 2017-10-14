apps.themes.interfaces.modules.InterfaceTheme = function() {
	this.start = function() {
		this.form = $("#interfaceThemeForm");
		this.winTagId = $("#interfaceThemeForm").parent().parent().prop("id");
		this.node = gui.winAndBar.manager.nm.getNodeWithWinTag(this.winTagId);
		this.barTagId = this.node.bar.tagId;
		this.inputs = this.form.find("input[type=text]");
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
		this.winSelector = $("#"+this.winTagId);
		this.barSelector = $("#"+this.barTagId);
		//prevent init when reload
		this.initValues();
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
		this.controller.va.iVal["winOBorderWidth"] = this.node.win.view.oBorderWidth;
		this.controller.va.iVal["winOWidth"] = this.node.win.view.oWidth;
	}
	this.setChangedInputValues = function() {
		var val = null;
		for(ii=0; ii<this.inputs.length; ii++){
			this.inputs[ii].value = this.controller.va.iVal[this.inputs[ii].title];
			console.log(this.inputs[ii].value);
		}
	}
}