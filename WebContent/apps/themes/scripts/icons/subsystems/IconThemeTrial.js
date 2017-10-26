apps.themes.icons.subsystems.IconThemeTrial = function() {
	this.tryTd = new IconThemeTdTrial();
	this.tryTd.__proto__ = this;
	this.tryIcon = new IconThemeIconTrial();
	this.tryIcon.__proto__ = this;
	this.restore = function(){
		location.reload();
	}
}