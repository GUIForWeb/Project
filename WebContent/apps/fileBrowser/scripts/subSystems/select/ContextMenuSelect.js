fileBrowser.subsystem.select.ContextMenuSelect = function() {
	this.click = function() {
		this.setScriptTag(event.target.parentNode);
		var rIdx = this.tag["t"].rowIndex;
		if(this.tag["t"].children[0].innerHTML != ".."
			&& this.tag["s"].prop("tagName") == "TR") {
			if(this.va["data"][rIdx-2].isChosen) {
				this.va["data"][rIdx-2].isChosen = true;
				
			} else {
				for( di=0; di<this.va["data"].length; di++){
					if(di != rIdx-2) {
						this.va["data"][di].isChosen = false;
						$(this.fbTable.find("tr")[di+2]).css("background-color","white");
					} else {
						this.va["data"][rIdx-2].isChosen = true;
						this.tag["s"].css("background-color","dimgray");
					}
				}
			}
		}
	}
}