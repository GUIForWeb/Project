system.elements.desktops.controllers.DesktopDrag = function() {
	this.start = new DesktopDragstart();
	this.start.__proto__ = this;
	this.ing = new DesktopDraging();
	this.ing.__proto__ = this;
	this.end = new DesktopDragend();
	this.end.__proto__ = this;
	this.over = new DesktopDragover();
	this.over.__proto__ = this;
	this.drop = new DesktopDrop();
	this.drop.__proto__ = this;
}