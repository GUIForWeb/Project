fileBrowser.subsystem.Select = function() {
	this.contextmenu = new ContextMenuSelect();
	this.contextmenu.__proto__ = this;
	this.ctrl = new CtrlSelect();
	this.ctrl.__proto__ = this;
	this.mousemove = new MousemoveSelect();
	this.mousemove.__proto__ = this;
	this.end = new SelectEnd();
	this.end.__proto__ = this;
	this.click = new ClickSelect();
	this.click.__proto__ = this;
	this.shift = new ShiftSelect();
	this.shift.__proto__ = this;
	this.cancle = new SelectCancle();
	this.cancle.__proto__ = this;
	this.filter = function(selectedData){
		return this.va["data"].filter(function( element ) {
			if(element.isChosen){
				selectedData.push({"name":element.name,"type":element.type});
			}
		});
	}
} 