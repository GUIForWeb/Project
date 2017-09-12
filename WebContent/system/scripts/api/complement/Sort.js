function Sort() {
	this.forward = false;
	this.work = function(){
		if(this.forward)
			this.highToLow();
		else
			this.lowToHigh();
	}
	this.setCol = function(col){
		this.col = col;
	}
	this.lowToHigh = function(){
		var rows, switching, i, x, y, shouldSwitch;
		switching = true;
		while (switching) {
			switching = false;
			rows = this.va["s"].find("TR");
			for (i = 2; i < (rows.length-1); i++) {
				shouldSwitch = false;
				x = rows[i].getElementsByTagName("TD")[this.col];
				y = rows[i + 1].getElementsByTagName("TD")[this.col];
				if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
			}
		}
		this.forward = true;
	}
	this.highToLow = function(){
		var rows, switching, i, x, y, shouldSwitch;
		switching = true;
		while (switching) {
			switching = false;
			rows = this.va["s"].find("TR");
			for (i = 2; i < (rows.length-1); i++) {
				shouldSwitch = false;
				x = rows[i].getElementsByTagName("TD")[this.col];
				y = rows[i + 1].getElementsByTagName("TD")[this.col];
				if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
					shouldSwitch = true;
					break;
				}
			}
			if (shouldSwitch) {
				rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
				switching = true;
			}
		}
		this.forward = false;
	}
}