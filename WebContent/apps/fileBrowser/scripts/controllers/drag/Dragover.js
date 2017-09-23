fileBrowser.controllers.drag.Dragover = function(){
	this.dataItem = function(event){
		console.log(event.originalEvent.dataTransfer.getData("dataItem"))
		event.preventDefault();
		this.va["dropable"] = true;
		this.va["validation"] = true;
	}
}
