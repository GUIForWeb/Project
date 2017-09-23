fileBrowser.controllers.Drag = function() {
	this.ing = new Draging();
	this.ing.__proto__ = this;
	this.end = new Dragend();
	this.end.__proto__ = this;
	this.enter = new Dragenter();
	this.enter.__proto__ = this;
	this.over = new Dragover();
	this.over.__proto__ = this;
	this.start = new Dragstart();
	this.start.__proto__ = this;
	this.leave = new Dragleave();
	this.leave.__proto__ = this;
	this.drop = new Drop();
	this.drop.__proto__ = this;
}