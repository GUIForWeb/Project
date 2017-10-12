apps.fileBrowser.controllers.drags.FBDragleave = function(){
	this.dataItem = function(event){
		event.preventDefault();
		this.va["dropable"] = false;
		this.va["pasteFlag"] = false;
		this.va["validation"] = false;
	}
}