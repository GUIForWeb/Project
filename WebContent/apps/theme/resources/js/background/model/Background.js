function Background(){
	this.start = function(){
		this.controller = new Controller();
		this.controller.__proto__ = this;
		this.click = new Click();
		this.click.__proto__ = this.controller;
		this.dblclick = new DblClick();
		this.dblclick.__proto__ = this.controller;
	}
	this.submit = function(){
		var form = $("#backgroundThemeForm0");
		var submit = $("#backgroundThemeForm0\\:submit");
		submit[0].click();
	}
}