apps.fileBrowser.subsystems.selects.FBShiftSelect = function() {
	this.isOnGoing = false;
	this.rIdx0 = null;
	this.rIdx1 = null;
	this.row = function(event){
		this.setScriptTag(event.target.parentNode.parentNode);
		if (this.tag["s"].attr("data-goal") != "toParent"
				&& this.tag["s"].prop("tagName") == "TR") {
			var rIdx = this.tag["t"].rowIndex;
			var data = null;
			if(this.va["selectedRow"] != null){
				this.rIdx0 = this.va["selectedRow"];
				this.rIdx1 = rIdx;
				this.init();
				this.widing();
			}
			else if(this.rIdx0 === null) {
				this.rIdx0 = rIdx;
				this.init();
			}
			else if(this.rIdx0 != this.rIdx1){
				this.rIdx1 = rIdx;
				this.widing();
			}
		}
	}
	this.init = function(){
		data = this.va["data"][this.rIdx0-2];
		data.isChosen= true;
		data.isChangeable= false;
		this.tag["s"].css("background-color", "dimgray");
		this.isOnGoing = true;
		this.isWorking = true;
	}
	this.widing = function(){
		var flag = false;
		var trs = this.fbTable.find("tr");
		if(this.rIdx0 > this.rIdx1) {
			var tmp = this.rIdx0;
			this.rIdx0 = this.rIdx1;
			this.rIdx1 = tmp;
			flag = true;
		}
		for(ti = 2; ti < trs.length; ti++){
			if(ti >= this.rIdx0 && ti<= this.rIdx1) {
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
		if(flag) {
			this.rIdx0 = this.rIdx1;
			this.rIdx1 = null;
		}
		this.isOnGoing = false;
	}
	this.cancle = function(){
		this.shift.isWorking = false;
		this.shift.rIdx0 = null;
		this.shift.rIdx1 = null;
	}
}