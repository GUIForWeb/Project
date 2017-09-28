system.winsAndBars.controllers.Mouse = function() {
	this.out = new Mouseout();
	this.out.__proto__ = this;
	this.over = new Mouseover();
	this.over.__proto__ = this;
}