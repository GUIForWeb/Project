apps.fileBrowser.subsystems.selects.FBClickSelect = function() {
	this.row = function(event){
		this.setScriptTag(event.target.parentNode.parentNode);
		if(this.tag["s"].find("th").length == 0 && this.tag["s"].attr("data-goal") != "toParent"
			&& this.tag["s"].prop("tagName") == "TR") {
			var rIdx = this.tag["t"].rowIndex;
			this.va["data"][rIdx-2].isChosen = true;
			this.va["data"][rIdx-2].isChangeable = false;
			this.va["selectedRow"] = rIdx;
			this.tag["s"].css("background-color","dimgray");
		}
	}	
}