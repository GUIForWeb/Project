apps.fileBrowser.controllers.FBMouse = function() {
	this.down = new FBMousedown();
	this.down.__proto__ = this;
	this.move = new FBMousemove();
	this.move.__proto__ = this;
	this.out = new FBMouseout();
	this.out.__proto__ = this;
	this.over = new FBMouseover();
	this.over.__proto__ = this;
	this.up = new FBMouseup();
	this.up.__proto__ = this;
}