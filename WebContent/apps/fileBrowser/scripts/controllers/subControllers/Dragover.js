fileBrowser.controllers.subControllers.Dragover = function(){
	this.dataItem = function(event){
		event.preventDefault();
		this.va["dropable"] = true;
	}
}
