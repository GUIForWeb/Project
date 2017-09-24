fileBrowser.subsystem.select.ShiftSelect = function() {
	this.isOnGoing = false;
	this.rIdx = null;
	this.row = function(event){
		this.setScriptTag(event.target.parentNode);
		if (this.tag["t"].children[0].innerHTML != ".."
				&& this.tag["s"].prop("tagName") == "TR") {
			var rIdx = this.tag["t"].rowIndex;
			var data = null;
			if(this.rIdx === null) {
				this.rIdx = rIdx;
				data = this.va["data"][rIdx-2];
				data.isChosen= true;
				data.isChangeable= false;
				this.tag["s"].css("background-color", "dimgray");
			}
			else if(rIdx != this.rIdx){
				var flag = false;
				this.isOnGoing = true;
				var trs = this.fbTable.find("tr");
				if(this.rIdx > rIdx) {
					var tmp = this.rIdx;
					this.rIdx = rIdx;
					rIdx = tmp;
					flag = true;
				}
				for(ti = 2; ti < trs.length; ti++){
					if(ti >= this.rIdx && ti<= rIdx) {
						data = this.va["data"][ti-2];
						data.isChosen= true;
						data.isChangeable= false;
						$(trs[ti]).css("background-color", "dimgray");
					}
					else {
						data = this.va["data"][ti-2];
						data.isChosen= false;
						data.isChangeable= true;
						$(trs[ti]).css("background-color", "white");
					}
				}
				if(flag)
					this.rIdx = rIdx;
				console.log(this.rIdx);
				console.log(rIdx);
			}
			
			/*
			var data = this.va["data"][rIdx-2];
			if(data.isChosen){
				data.isChosen= false;
				data.isChangeable= true;
				this.tag["s"].css("background-color", "white");
			}
			else {
				data.isChosen= true;
				data.isChangeable= false;
				this.tag["s"].css("background-color", "dimgray");
			}
			*/
		}
	}
}