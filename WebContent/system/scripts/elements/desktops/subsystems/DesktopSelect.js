system.elements.desktops.subsystems.DesktopSelect = function() {
	this.contextmenu = new DesktopContextMenuSelect();
	this.contextmenu.__proto__ = this;
	this.ctrl = new DesktopCtrlSelect();
	this.ctrl.__proto__ = this;
	this.mousemove = new DesktopMousemoveSelect();
	this.mousemove.__proto__ = this;
	this.end = new DesktopSelectEnd();
	this.end.__proto__ = this;
	this.click = new DesktopClickSelect();
	this.click.__proto__ = this;
	this.shift = new DesktopShiftSelect();
	this.shift.__proto__ = this;
	this.cancle = new DesktopSelectCancle();
	this.cancle.__proto__ = this;
	this.filter = function(selectedData){
		return this.manager.jsonArray.filter(function( element ) {
			if(element.isChosen){
				if(element.type !== undefined)
					selectedData.push({"name":element.name,"type":element.type});
			}
		});
	}
}