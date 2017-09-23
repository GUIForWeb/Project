fileBrowser.controllers.subControllers.Dragstart = function(){
	this.dataItem = function(event){
		event.stopPropagation();
		this.setScriptTag(event.currentTarget);
		console.log("start-validation");
		console.log(this.va["validation"]);
		this.va["dropable"] = true;
		if(this.va["validation"]){
			this.select.end.data();
			console.log("copy");
			console.log(this.va["selectedData"]);
			this.fbm.send.copy();
		}
	}
	this.selection = function(event){
		console.log()
		if(!this.va["dropable"]) {
			if (event.ctrlKey) 
				this.select.drag.ctrlKey = true;
			else
				this.select.drag.ctrlKey = false;
			this.select.drag.start(event);
		}
	}
}