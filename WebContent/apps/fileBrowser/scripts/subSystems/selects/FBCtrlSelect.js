apps.fileBrowser.subsystems.selects.FBCtrlSelect = function() {
	this.isWorking = false;
	this.cancle = function(){
		this.select.ctrl.isWorking = false;
	}
	this.row = function(event) {
		this.setScriptTag(event.target.parentNode.parentNode);
		if (this.tag["s"].attr("data-goal") != "toParent"
				&& this.tag["s"].prop("tagName") == "TR") {
			var rIdx = this.tag["t"].rowIndex;
			var data = this.va["data"][rIdx-2];
			this.isWorking = true;
			if(data.isChosen){
				data.isChosen= false;
				data.isChangeable= true;
				this.tag["s"].css("background-color", "white");
			}
			else {
				data.isChosen= true;
				data.isChangeable= false;
				this.tag["s"].css("background-color", "dimgray");
				this.va["selectedRow"] = rIdx;
			}
		}
	}
}