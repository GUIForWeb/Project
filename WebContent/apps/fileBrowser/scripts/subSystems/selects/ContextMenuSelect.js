apps.fileBrowser.subsystems.selects.ContextMenuSelect = function() {
	this.click = function() {
		this.setScriptTag(event.target.parentNode);
		if(this.tag["t"].children[0].innerHTML != ".."
			&& this.tag["s"].prop("tagName") == "TR") {
			var rIdx = this.tag["t"].rowIndex;
			var data = this.va["data"][rIdx-2];
			if(!data.isChosen){
				var trs = this.fbTable.find("tr");
				for( di=0; di<this.va["data"].length; di++){
					data = this.va["data"][di];
					if(di != rIdx-2) {
						data.isChosen = false;
						data.isChangeable = true;
						$(trs[di+2]).css("background-color","white");
					} else {
						data.isChosen = true;
						data.isChangeable = false;
						this.tag["s"].css("background-color","dimgray");
					}
				}
			}
		}
	}
}