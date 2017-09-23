fileBrowser.controllers.subControllers.Dragover = function(){
	this.dataItem = function(event){
		event.preventDefault();
		console.log("validation",this.va["validation"]);
		this.va["dropable"] = true;
		this.va["pasteFlag"] = true;
		this.va["validation"] = true;
	}
}
