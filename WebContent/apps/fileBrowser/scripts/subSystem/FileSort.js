function FileSort() {
	this.forward = 1;
	this.sort = function(col){
		this.col = col;
		if(this.forward == 1)
			this.lowToHigh();
		else if (this.forward == 0)
			this.highToLow();
		else if (this.forward == -1)
			this.reference();
	}
	this.reference = function(){
		var dArr = [];
		var fArr = [];
		Array.prototype.put = function(data){
			if(this[0] === undefined){
				this.push(data);
			}
			else {
				this.sortPut(data,0);
			}
		}
		Array.prototype.sortPut = function(data,num){
			if(this[num].name.toLowerCase() > data.name.toLowerCase()){
				var tmpData = this[num];
				this[num] = data;
				if(this[num+1] !== undefined){
					this.sortPut(tmpData,num+1);
				}
				else{
					this.push(tmpData);
				}
			}
			else {
				if(this[num+1] !== undefined){
					this.sortPut(data,num+1);
				}
				else {
					this.push(data);
				}
			}
		}
		for(di=0; di<this.data.length; di++){
			if(this.data[di].type == "directory"){
				dArr.put(this.data[di]);
			}
			else{
				fArr.put(this.data[di]);
			}
		}
		var data = dArr.concat(fArr);
		this.data = data; 
		this.displayHead();
		this.displayData();
		this.forward = 1;
	}
	this.displayData = function() {
		for(i=0; i<this.data.length; i++) {
			var tmpTr = $("<tr></tr>");
			tmpTr.addClass("fb-table-row");
			tmpTr.addClass("fileItem");
			var tmpTd0 = $("<td>"+this.data[i]["name"]+"</td>");
			var tmpTd1 = $("<td>"+this.data[i]["dateModified"]+"</td>");
			var tmpTd2 = $("<td>"+this.data[i]["type"]+"</td>");
			var tmpTd3 = $("<td>"+this.data[i]["size"]+"</td>");
			tmpTr.append(tmpTd0);
			tmpTr.append(tmpTd1);
			tmpTr.append(tmpTd2);
			tmpTr.append(tmpTd3);
			if(this.data[i]["type"] == "directory"){
				tmpTr.css("color","#ffbf00");
			}
			this.fbTable.append(tmpTr);
		}
	}
	this.displayHead = function() {
		this.fbTable.html("");
		var tmpTr = $("<tr></tr>");
		tmpTr.addClass("fb-table-header");
		var tmpTd0 = $("<th>Name</th>");
		var tmpTd1 = $("<th>Date</th>");
		var tmpTd2 = $("<th>Type</th>");
		var tmpTd3 = $("<th>Size</th>");
		tmpTr.append(tmpTd0);
		tmpTr.append(tmpTd1);
		tmpTr.append(tmpTd2);
		tmpTr.append(tmpTd3);
		this.fbTable.append(tmpTr);
		tmpTr = $("<tr></tr>");
		tmpTr.addClass("parent");
		tmpTr.addClass("fb-table-row");
		tmpTd0 = $("<td>..</td>");
		tmpTd1 = $("<td></td>");
		tmpTd2 = $("<td></td>");
		tmpTd3 = $("<td></td>");
		tmpTr.append(tmpTd0);
		tmpTr.append(tmpTd1);
		tmpTr.append(tmpTd2);
		tmpTr.append(tmpTd3);
		this.fbTable.append(tmpTr);
	}
	this.lowToHigh = function(){
		var rows, switching, i, x, y, shouldSwitch;
		switching = true;
		while (switching) {
			switching = false;
			rows = this.fbTable.find("TR");
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
		this.forward = 0;
	}
	this.highToLow = function(){
		var rows, switching, i, x, y, shouldSwitch;
		switching = true;
		while (switching) {
			switching = false;
			rows = this.fbTable.find("TR");
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
		this.forward = -1;
	}
}