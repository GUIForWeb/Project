system.elements.desktops.controllers.mouses.DesktopMousedown = function() {
	this.selection = function(){
		this.selection = function(event){
			var tagName = $(event.target).prop("tagName");
			if(tagName == "TD" || tagName == "TABLE"){
				this.setScriptTag(event.currentTarget);
				if(this.tag["t"] == this.background.selector[0] && event.button == 0) {
					this.select.mousemove.start(event);
				}
			}
		}
	}
	this.button = function(event) {
		if(!this.select.mousemove.isOnGoing && event.button == 0) {
			if(event.ctrlKey){
				this.select.ctrl.icon(event);
			}
			else if(event.shiftKey){
				this.select.shift.icon(event);
			}
			else if(!this.select.shift.isWorking && !this.select.mousemove.isWorking){
				this.select.cancle.all();
				this.select.click.icon(event);
			}
			else if(!this.select.mousemove.isOnGoing){
				this.setScriptTag(event.currentTarget);
				if(this.tag["t"] == this.background.selector[0]) {
					this.select.cancle.all();
				}
			}
			if (taskArray["contextMenu"].isOnTheScreen) {
				taskArray["contextMenu"].disappear();
			}
		}
	}
}