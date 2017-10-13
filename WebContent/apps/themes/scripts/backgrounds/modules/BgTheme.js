apps.themes.backgrounds.modules.BgTheme = function(){
	this.start = function(){
		this.controller = new BgThemeController();
		this.controller.__proto__ = this;
		this.click = new BgThemeClick();
		this.click.__proto__ = this.controller;
		this.dblclick = new BgThemeDblclick();
		this.dblclick.__proto__ = this.controller;
		this.socket = new BgThemeWebSocket();
		this.socket.__proto__ = this.controller;
	}
	this.submit = function(){
		var form = $("#backgroundThemeForm0");
		var submit = $("#backgroundThemeForm0\\:submit");
		submit[0].click();
	}
}