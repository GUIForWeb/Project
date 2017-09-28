system.elements.winAndBars.controllers.WinAndBarDrag = function() {
	this.start = new WinAndBarDragstart();
	this.start.__proto__ = this;
	this.ing = new WinAndBarDraging();
	this.ing.__proto__ = this;
	this.end = new WinAndBarDragend();
	this.end.__proto__ = this;
	this.over = new WinAndBarDragover();
	this.over.__proto__ = this;
	this.drop = new WinAndBarDrop();
	this.drop.__proto__ = this;
}