apps.fileBrowser.subsystems.fileSorts.FBStringSort = function() {
	this.flag = false;
	this.arrayPrototype = function() {
		Array.prototype.lowToHigh = function(data, num, option) {
			if (this[num] === undefined) {
				this.push(data);
			} else if (this[num][option].toLowerCase() > data[option]
					.toLowerCase()) {
				var tmpData = this[num];
				this[num] = data;
				this.lowToHigh(tmpData, num + 1, option);
			} else {
				this.lowToHigh(data, num + 1, option);
			}
		}
		Array.prototype.highToLow = function(data, num, option) {
			if (this[num] === undefined) {
				this.push(data);
			} else if (this[num][option].toLowerCase() < data[option]
					.toLowerCase()) {
				var tmpData = this[num];
				this[num] = data;
				this.highToLow(tmpData, num + 1, option);
			} else {
				this.highToLow(data, num + 1, option);
			}
		}
	}
	this.sort = function(option) {
		if (this.va["data"].length != 0) {
			this.arrayPrototype();
			this.option = option;
			if (!this.flag) {
				this.sortFromLowToHigh();
				this.__proto__.display = this.sortFromLowToHigh;
			} else if (this.flag) {
				this.sortFromHighToLow();
				this.__proto__.display = this.sortFromHighToLow;
			}
		} else {
			var trS = this.fbTable.find("tr");
			var tdS = null;
			this.va["data"] = [];
			for (ri = 2; ri < trS.length; ri++) {
				tdS = $(trS[ri]).find("td");
				var json = {};
				json.name = tdS[0].innerHTML;
				json.dateModified = tdS[1].innerHTML;
				json.type = tdS[2].innerHTML;
				json.size = parseInt(tdS[3].innerHTML);
				this.va["data"].push(json);
			}
			this.sort(option);
		}
	}
	this.sortFromHighToLow = function() {
		var dArr = [];
		var fArr = [];
		for (di = 0; di < this.va["data"].length; di++) {
			if (this.va["data"][di].type == "inode/directory") {
				dArr.highToLow(this.va["data"][di], 0, this.option);
			} else {
				fArr.highToLow(this.va["data"][di], 0, this.option);
			}
		}
		this.va["data"] = dArr.concat(fArr);
		this.flag = false;
		this.displayHead();
		this.displayData();
	}
	this.sortFromLowToHigh = function() {
		var dArr = [];
		var fArr = [];
		for (di = 0; di < this.va["data"].length; di++) {
			if (this.va["data"][di].type == "inode/directory") {
				dArr.lowToHigh(this.va["data"][di], 0, this.option);
			} else {
				fArr.lowToHigh(this.va["data"][di], 0, this.option);
			}
		}
		this.va["data"] = dArr.concat(fArr);
		this.flag = true;
		this.displayHead();
		this.displayData();
	}
}