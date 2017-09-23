fileBrowser.subsystem.select.SelectEnd = function() {
	this.data = function() {
		this.va["selectedData"] = [];
		this.filter(this.va["selectedData"]);
		this.validation();
		console.log(this.va["validation"]);
		console.log(this.va["selectedData"]);
	}
	this.validation = function() {
		if(this.va["selectedData"].length != 0)
			this.va["validation"] = true;
	}
}