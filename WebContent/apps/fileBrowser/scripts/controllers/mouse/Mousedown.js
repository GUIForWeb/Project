fileBrowser.controllers.mouse.Mousedown = function() {
	this.selection = function(event){
		this.setScriptTag(event.target);
		if(this.tag["t"] == this.section[0]) {
			this.select.mousemove.start(event);
		}
	}
	this.button = function(event) {
		if(!this.select.mousemove.isOnGoing && event.button == 0) {
			if(event.ctrlKey){
				this.select.ctrl.click(event);
			}
			else if(!this.select.mousemove.isWorking){
				this.select.cancle();
				this.select.click(event);
				this.select.end.data(event);
			}
			else if(!this.select.mousemove.isOnGoing){
				this.setScriptTag(event.target);
				if(this.tag["t"] == this.section[0]) {
					this.select.cancle();
				}
			}
			if (taskArray["contextMenu"].isOnTheScreen) {
				taskArray["contextMenu"].disappear();
			}
		}
	}
}