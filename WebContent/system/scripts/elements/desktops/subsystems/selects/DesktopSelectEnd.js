system.elements.desktops.subsystems.selects.DesktopSelectEnd = function() {
	this.data = function() {
		this.va["selectedData"] = [];
		this.filter(this.va["selectedData"]);
		this.validation();
		for(di=0; di<this.iconArray.length; di++) {
			this.iconArray[di].isChosen == false;
			this.iconArray[di].isChangeable = true;
		}
	}
	this.validation = function() {
		if(this.va["selectedData"].length != 0){
			this.va["validation"] = true;
		}
		else {
			this.va["validation"] = false;
		}
			
	}
	this.filter = function(selectedData){
		return this.iconArray.filter(function( element ) {
			if(element.isChosen){
				if(element.type != "public")
					selectedData.push({"name":element.name,"type":element.type});
			}
		});
	}
}