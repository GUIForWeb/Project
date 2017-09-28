system.elements.winAndBars.controllers.WinAndBarResize = function() {
	this.va = [];
	this.start = new WinAndBarResizestart();
	this.start.__proto__ = this;
	this.ing = new WinAndBarResizing();
	this.ing.__proto__ = this;
	this.end = new WinAndBarResizeend();
	this.end.__proto__ = this;
}