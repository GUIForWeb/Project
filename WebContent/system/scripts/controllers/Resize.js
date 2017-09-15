guiLib.controllers.Resize = function() {
	this.va = [];
	this.start = new Resizestart();
	this.start.__proto__ = this;
	this.ing = new Resizing();
	this.ing.__proto__ = this;
	this.end = new Resizeend();
	this.end.__proto__ = this;
}