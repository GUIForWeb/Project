system.elements.desktops.controllers.mouses.DesktopMouseup = function() {
	this.selection = function(event) {
		if(event.button == 0 && $(event.target).prop("tagName") != "LI") 
		if(this.select.mousemove.isOnGoing){
			this.select.mousemove.end(event);
			this.select.end.data();
		}else if(this.select.mousemove.isWorking){
			this.select.cancle.all();
		}
	}
	this.background = function(event) {
		if(event.button == 0  && $(event.target).prop("tagName") != "LI") {
			if(this.select.mousemove.isWorking && this.va["selectedData"].length != 0)
				this.select.cancle.all();
		}
		/*
		if (event.button == 0 && taskArray["contextMenu"].isOnTheScreen) {
			taskArray["contextMenu"].disappear();
		}
		*/
	}
}