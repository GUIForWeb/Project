apps.fileBrowser.subsystems.FBSelect = function() {
	this.contextmenu = new FBContextMenuSelect();
	this.contextmenu.__proto__ = this;
	this.ctrl = new FBCtrlSelect();
	this.ctrl.__proto__ = this;
	this.mousemove = new FBMousemoveSelect();
	this.mousemove.__proto__ = this;
	this.end = new FBSelectEnd();
	this.end.__proto__ = this;
	this.click = new FBClickSelect();
	this.click.__proto__ = this;
	this.shift = new FBShiftSelect();
	this.shift.__proto__ = this;
	this.cancle = new FBSelectCancle();
	this.cancle.__proto__ = this;
	this.filter = function(selectedData){
		return this.va["data"].filter(function( element ) {
			if(element.isChosen){
				selectedData.push({"name":element.name,"type":element.type});
			}
		});
	}
} 