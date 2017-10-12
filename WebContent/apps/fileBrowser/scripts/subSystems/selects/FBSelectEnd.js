apps.fileBrowser.subsystems.selects.FBSelectEnd = function() {
	this.data = function() {
		this.va["selectedData"] = [];
		this.filter(this.va["selectedData"]);
		this.validation();
		for(di=0; di<this.va["data"].length; di++) {
			this.va["data"][di].isChosen == false;
			this.va["data"][di].isChangeable = true;
		}
	}
	this.validation = function() {
		if(this.va["selectedData"].length != 0){
			this.va["validation"] = true;
		}
		else {
			this.va["validation"] = false;
		}
			
	}
}