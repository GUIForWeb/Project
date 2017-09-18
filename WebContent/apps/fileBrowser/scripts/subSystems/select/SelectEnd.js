fileBrowser.subsystem.select.SelectEnd = function() {
	this.dataItem = function() {
		if (this.tag["s"].prop("tagName") == "TR") {
			var rIdx = this.tag["t"].rowIndex;
			this.va["data"][rIdx-2].isChosen = true;
			this.va["selectedData"] = [ {
				"name" : this.tag["t"].children[0].innerHTML,
				"type" : this.tag["t"].children[2].innerHTML
			} ];
			this.tag["s"].css("background-color", "dimgray");
		}
		this.validation();
	}
	this.dataItems = function() {
		this.filter(this.va["selectedData"]);
		this.validation();
	}
	this.validation = function() {
		if(this.va["selectedData"].length != 0)
			this.va["validation"] = true;
	}
}