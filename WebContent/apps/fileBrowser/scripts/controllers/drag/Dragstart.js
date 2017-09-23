fileBrowser.controllers.drag.Dragstart = function(){
	this.dataItem = function(event){
		event.stopPropagation();
		this.setScriptTag(event.currentTarget);
		this.va["dropable"] = true;
		console.log("this.select.mousemove.isOnGoing");
		console.log(this.select.mousemove.isOnGoing);
		this.select.end.data();
		if(this.va["validation"]){
			event.originalEvent.dataTransfer.setData("dataItem", this.id);
			this.fbm.send.copy();
		}
	}
}