system.elements.desktops.subsystems.selects.DesktopSelectCancle = function() {
	this.all = function(){
		this.background.view.tableSelector.find(".iconDiv").css("background-color", "white");
		this.va["selectedData"] = [];
		for(i=0; i<this.manager.jsonArray.length; i++) 
			this.manager.jsonArray[i].isChosen = false;
		this.mousemove.cancle();
		this.shift.cancle();
		this.select.ctrl.cancle();
		this.initAllValues();
	}
	this.row = function(selector) {
		if(selector.find("th").length == 0 && selector[0].children[0].innerHTML != ".."
			&& selector.prop("tagName") == "TR") {
			var rIdx = selector[0].rowIndex;
			var data = this.va["data"][rIdx-2];
			data.isChosen= false;
			data.isChangeable= true;
		}
	}
}