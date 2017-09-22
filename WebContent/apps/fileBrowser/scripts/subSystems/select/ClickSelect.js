fileBrowser.subsystem.select.ClickSelect = function() {
	this.button = function(event){
		this.setScriptTag(event.target.parentNode);
		if(this.tag["t"].children[0].innerHTML != ".."
			&& this.tag["s"].prop("tagName") == "TR") {
			var rIdx = this.tag["t"].rowIndex;
			this.va["data"][rIdx-2].isChosen = true;
			this.tag["s"].css("background-color","dimgray");
		}
	}	
}