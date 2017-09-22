fileBrowser.subsystem.Select = function() {
	this.contextmenu = new ContextMenuSelect();
	this.contextmenu.__proto__ = this;
	this.ctrl = new CtrlSelect();
	this.ctrl.__proto__ = this;
	this.drag = new DragSelect();
	this.drag.__proto__ = this;
	this.end = new SelectEnd();
	this.end.__proto__ = this;

	this.cancle = function(){
		this.fbTable.find("tr").css("background-color", "white");
		this.va["selectedData"] = [];
		for(i=0; i<this.va["data"].length; i++) 
			this.va["data"][i].isChosen = false;
		this.ctrl.isWorking = false;
		this.drag.isWorking = false;
	}
	
	this.filter = function(selectedData){
		return this.va["data"].filter(function( element ) {
			if(element.isChosen){
				selectedData.push({"name":element.name,"type":element.type});
			}
		});
	}
} 