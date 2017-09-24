fileBrowser.controllers.drag.Dragstart = function(){
	this.dataItem = function(event){
		event.stopPropagation();
		this.setScriptTag(event.currentTarget);
		this.va["dropable"] = true;
		this.select.end.data();
		if(this.va["validation"]){
			event.originalEvent.dataTransfer.setData("dataItem", this.id);
			this.fbm.send.copy();
			taskArray["clipboard"] = true;
		}
	}
}