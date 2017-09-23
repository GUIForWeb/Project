fileBrowser.controllers.Mouse = function() {
	this.down = new Mousedown();
	this.down.__proto__ = this;
	this.move = new Mousemove();
	this.move.__proto__ = this;
	this.out = new Mouseout();
	this.out.__proto__ = this;
	this.over = new Mouseover();
	this.over.__proto__ = this;
	this.up = new Mouseup();
	this.up.__proto__ = this;
}