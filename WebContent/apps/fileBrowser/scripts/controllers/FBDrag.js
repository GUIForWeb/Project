apps.fileBrowser.controllers.FBDrag = function() {
	this.ing = new FBDraging();
	this.ing.__proto__ = this;
	this.end = new FBDragend();
	this.end.__proto__ = this;
	this.enter = new FBDragenter();
	this.enter.__proto__ = this;
	this.over = new FBDragover();
	this.over.__proto__ = this;
	this.start = new FBDragstart();
	this.start.__proto__ = this;
	this.leave = new FBDragleave();
	this.leave.__proto__ = this;
	this.drop = new FBDrop();
	this.drop.__proto__ = this;
}