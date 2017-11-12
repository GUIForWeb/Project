apps.fileBrowser.subsystems.selects.FBSelectCancle = function() {
	this.all = function(){
		this.fbTable.find("tr").css("background-color", "white");
		this.va["selectedData"] = [];
		for(i=0; i<this.va["data"].length; i++) 
			this.va["data"][i].isChosen = false;
		this.mousemove.cancle();
		this.shift.cancle();
		this.select.ctrl.cancle();
		this.initAllValues();
	}
	this.row = function(selector) {
		if(selector.find("th").length == 0 && selector.attr("data-goal") != "toParent"
			&& selector.prop("tagName") == "TR") {
			var rIdx = selector[0].rowIndex;
			var data = this.va["data"][rIdx-2];
			data.isChosen= false;
			data.isChangeable= true;
		}
	}
}