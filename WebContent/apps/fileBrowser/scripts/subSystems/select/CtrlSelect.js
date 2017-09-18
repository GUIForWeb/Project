fileBrowser.subsystem.select.CtrlSelect = function() {
	this.fileItemArray = [];
	this.isWorking = false;
	this.choose = function(event) {
		this.isWorking = true;
		this.setScriptTag(event.target.parentNode);
		if (this.tag["t"].children[0].innerHTML != ".."
				&& this.tag["s"].prop("tagName") == "TR") {
			var rIdx = this.tag["t"].rowIndex;
			
			if(this.va["data"][rIdx-2].isChosen){
				this.va["data"][rIdx-2].isChosen= false;
				this.tag["s"].css("background-color", "white");
			}
			else {
				this.va["data"][rIdx-2].isChosen= true;
				this.tag["s"].css("background-color", "dimgray");
			}
		}
	}
}