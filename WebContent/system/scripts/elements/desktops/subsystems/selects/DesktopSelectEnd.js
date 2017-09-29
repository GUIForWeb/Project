system.elements.desktops.subsystems.selects.DesktopSelectEnd = function() {
	this.data = function() {
		this.va["selectedData"] = [];
		this.filter(this.va["selectedData"]);
		this.validation();
		for(di=0; di<this.manager.jsonArray.length; di++) {
			this.manager.jsonArray[di].isChosen == false;
			this.manager.jsonArray[di].isChangeable = true;
		}
		console.log(this.va["selectedData"]);
	}
	this.validation = function() {
		if(this.va["selectedData"].length != 0){
			this.va["validation"] = true;
		}
		else {
			this.va["validation"] = false;
		}
			
	}
}