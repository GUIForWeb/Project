fileBrowser.subsystems.selects.ClickSelect = function() {
	this.row = function(event){
		this.setScriptTag(event.target.parentNode);
		if(this.tag["s"].find("th").length == 0 && this.tag["t"].children[0].innerHTML != ".."
			&& this.tag["s"].prop("tagName") == "TR") {
			var rIdx = this.tag["t"].rowIndex;
			this.va["data"][rIdx-2].isChosen = true;
			this.va["data"][rIdx-2].isChangeable = false;
			this.va["selectedRow"] = rIdx;
			this.tag["s"].css("background-color","dimgray");
		}
	}	
}