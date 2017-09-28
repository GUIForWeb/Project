system.elements.winAndBars.controllers.WinAndBarMouse = function() {
	this.out = new WinAndBarMouseout();
	this.out.__proto__ = this;
	this.over = new WinAndBarMouseover();
	this.over.__proto__ = this;
}