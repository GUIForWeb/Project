fileBrowser.controllers.subControllers.Dragstart = function(){
	this.fileItem = function(event){
		this.setScriptTag(event.currentTarget);
		if(this.ds.isWorking == false){
			this.va["selectedData"] =[{"name":this.tag["t"].children[0].innerHTML,"type":this.tag["t"].children[2].innerHTML}];
			if(this.tag["t"].children[0].innerHTML != "..")
				this.va["validation"] = true;
			else
				this.va["validation"] = false;
		}
		else if(this.ds.isWorking == true){
			this.va["selectedData"] = this.ds.list;
			this.va["validation"] = true;
		}
		this.fbm.send.copy();
		this.va["fileItem"] = true;
	}
	this.selection = function(event){
		this.ds.start(event);
	}
}