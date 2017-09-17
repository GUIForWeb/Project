fileBrowser.views.FileBrowserStatusView = function() {
	this.statusClass = "fb-status";
	this.fbInfoClass = "fb-info";
	this.fbDetailClass = "fb-detail";
	this.fbDetailGraphClass = "fb-detail-graph";
	this.infoLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.html("Status");
		tmpS.addClass(this.fbInfoClass);
		this.infoSelector = tmpS;
	}
	this.detailLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.addClass(this.fbDetailClass);
		this.detailSelector = tmpS;
	}
	this.statusLayer = function() {
		var tmpS = $("<div></div>");
		tmpS.addClass(this.statusClass);
		tmpS.append(this.infoSelector);
		tmpS.append(this.detailSelector);
		this.statusSelector = tmpS;
	}
	this.getView = function() {
		this.infoLayer();
		this.detailLayer();
		this.statusLayer();
	}
	this.graph = function(percentage) {
		var tmpS = $("<div></div>");
		tmpS.css("width", percentage + "%");
		tmpS.addClass(this.fbDetailGraphClass);
		this.detailSelector.html("");
		this.detailSelector.append(tmpS);
		this.graphSelector = tmpS;
	}
}