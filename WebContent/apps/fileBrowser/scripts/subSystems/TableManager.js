fileBrowser.subsystems.TableManager = function() {
	this.jsonArray = [];
	this.getData = function() {
		var rows = this.fbTable.find("tr");
		rows = rows.slice(2,rows.length);
		this.getDataFromRows(rows,0);
		this.va["data"] = this.jsonArray;
	}
	this.getDataFromRows = function(rows,rNum){
		if(rows[rNum] !== undefined){
			var cols = $(rows[rNum]).find("td");
			this.getDataFromCols(cols);
			this.getDataFromRows(rows,++rNum);
		}
	}
	this.getDataFromCols = function(cols){
		var json = {};
		json.name = cols[0].innerHTML;
		json.dateModified = cols[1].innerHTML;
		json.type = cols[2].innerHTML;
		json.size = cols[3].innerHTML;
		json.isChangeable = false;
		json.isChosen = false;
		this.jsonArray.push(json);
	}
}