fileBrowser.subsystem.FileSort = function() {
	this.string = new StringSort();
	this.string.__proto__ = this;
	this.date = new DateSort();
	this.date.__proto__ = this;
	this.int = new IntSort();
	this.int.__proto__ = this;
	this.display = this.string.sortFromLowToHigh;
	this.displayData = function() {
		for(i=0; i<this.va["data"].length; i++) {
			var tmpTr = $("<tr></tr>");
			tmpTr.addClass("fb-table-row");
			tmpTr.addClass("fileItem");
			var tmpTd0 = $("<td>"+this.va["data"][i]["name"]+"</td>");
			var tmpTd1 = $("<td>"+this.va["data"][i]["dateModified"]+"</td>");
			var tmpTd2 = $("<td>"+this.va["data"][i]["type"]+"</td>");
			var tmpTd3 = $("<td>"+this.va["data"][i]["size"]+"</td>");
			tmpTr.append(tmpTd0);
			tmpTr.append(tmpTd1);
			tmpTr.append(tmpTd2);
			tmpTr.append(tmpTd3);
			if(this.va["data"][i]["type"] == "directory"){
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
}