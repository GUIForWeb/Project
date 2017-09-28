fileBrowser.controllers.drags.Dragover = function(){
	this.dataItem = function(event){
		event.preventDefault();
		this.va["dropable"] = true;
		this.va["validation"] = true;
	}
}
