function Dragover(){
	this.fileItem = function(event){
		event.preventDefault();
		this.va["dropable"] = true;
	}
}
