apps.themes.icons.modules.IconTheme = function() {
	//input selector Array 
	this.init = function() {
		this.controller = new IconThemeController();
		this.controller.__proto__ = this;
		this.focus = new IconThemeFocus();
		this.focus.__proto__ = this.controller;
		this.trial = new IconThemeTrial();
		this.trial.__proto__ = this.controller;
		this.form = $("#iconThemeForm");
		this.initElementsForTheme();
		this.initValues();
		this.initInputSelectorArray();
	}
	this.initElementsForTheme = function() {
		this.controller.va["table"] = gui.background.view.tableSelector;
		this.controller.va["tds"] = this.controller.va["table"].children("tr").children("td");
	}
	this.initValues = function() {
		var tdVals = gui.iconTdValueArray;
		this.controller.va["prevData"]["width"] = tdVals.iconTdWidth;
		this.controller.va["prevData"]["height"] = tdVals.iconTdHeight;
		this.controller.va["prevData"]["border_width"] = tdVals.iconTdBorderWidth;
		this.controller.va["prevData"]["border_height"] = tdVals.iconTdBorderHeight;
		this.controller.va["prevData"]["border_color"] = tdVals.iconTdBorderColor;
	}
	this.initInputSelectorArray = function() {
		var tmpInputs = $("#iconThemeForm").find("input:text");
		tmpInputs.blur(function(event){
			taskArray["iconTheme"].focus.blur.inputText(event);
		});
	}
}