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
				this.select.ctrl.row(event);
			}
			else if(event.shiftKey){
				this.select.shift.row(event);
			}
			else if(!this.select.shift.isWorking && !this.select.mousemove.isWorking){
				this.select.cancle.all();
				this.select.click.row(event);
			}
			else if(!this.select.mousemove.isOnGoing){
				this.setScriptTag(event.target);
				if(this.tag["t"] == this.section[0]) {
					this.select.cancle.all();
				}
			}
			if (taskArray["contextMenu"].isOnTheScreen) {
				taskArray["contextMenu"].disappear();
			}
		}
	}
}