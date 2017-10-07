apps.themes.icons.subsystems.IconThemeTrial = function() {
	this.tryTd = new IconThemeTdTrial();
	this.tryTd.__proto__ = this;
	this.tryIcon = new IconThemeIconTrial();
	this.tryIcon.__proto__ = this;
	this.restore = function(){
		gui.background.disappear();
		gui.background.setIconTdValues(gui.iconTdValueArray);
		gui.background.appear();
		gui.background.appendIconTd();
		gui.initIcon();
		gui.initDesktopDataItems();
		gui.bgSelector = gui.background.selector;
	}
}