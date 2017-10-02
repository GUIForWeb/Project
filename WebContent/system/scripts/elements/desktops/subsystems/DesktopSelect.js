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
		return this.iconArray.filter(function( element ) {
			if(element.isChosen){
				if(element.dateModified !== undefined)
					selectedData.push({"name":element.name,"type":element.type});
			}
		});
	}
	this.selectData = function(data,flag){
		data.isChosen = flag;
		data.isChangeable = !flag;
	}
	this.hover = function(ishover, iconDiv){
		if(ishover){
			iconDiv.css("background-color","dimgray");
		}
		else {
			iconDiv.css("background-color","white");
		}
		iconDiv.css("opacity","1");
	}
}