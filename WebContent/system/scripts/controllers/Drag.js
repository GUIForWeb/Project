guiLib.controllers.Drag = function() {
	this.start = new Dragstart();
	this.start.__proto__ = this;
	this.ing = new Draging();
	this.ing.__proto__ = this;
	this.end = new Dragend();
	this.end.__proto__ = this;
}