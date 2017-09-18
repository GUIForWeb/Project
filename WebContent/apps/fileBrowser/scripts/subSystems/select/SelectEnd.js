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
	}
	this.dataItems = function() {
		console.log(this.va["data"]);
		this.filter(this.va["selectedData"]);
		console.log(this.va["selectedData"]);
	}
}