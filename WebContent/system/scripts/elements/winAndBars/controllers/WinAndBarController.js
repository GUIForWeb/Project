system.elements.winAndBars.controllers.WinAndBarController = function() {
	this.getWinNumId = function(tag) {
		return parseInt(tag.id.replace(this.winTagIdRule, ""));
	}
	this.getBarNumId = function(tag) {
		return tag.id.replace(this.barTagIdRule, "");
	}
}