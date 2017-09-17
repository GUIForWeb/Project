fileBrowser.controllers.subControllers.Dragover = function(){
	this.fileItem = function(event){
		event.preventDefault();
		this.va["dropable"] = true;
	}
}
