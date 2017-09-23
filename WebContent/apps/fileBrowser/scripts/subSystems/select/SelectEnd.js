fileBrowser.subsystem.select.SelectEnd = function() {
	this.data = function() {
		this.va["selectedData"] = [];
		this.filter(this.va["selectedData"]);
		this.validation();
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