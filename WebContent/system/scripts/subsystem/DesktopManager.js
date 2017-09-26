system.subsystem.DesktopManager = function() {
	this.refresh = function(jsonArray){
		this.iconTable.find(".dataIcon").remove();
		var dNum = jsonArray.length;
		for(di=0; di < jsonArray.length; di++) {
			var tmpIcon = new DataIcon();
			tmpIcon.contextPath = this.contextPath;
			tmpIcon.init(jsonArray[di]);
			this.iconCoordinate[tmpIcon.x + "," + tmpIcon.y] = true;
			tmpIcon.view.iconTdBorderWidth = this.iconTdValueArray["iconTdBorderWidth"];
			tmpIcon.view.iconTdBorderHeight = this.iconTdValueArray["iconTdBorderHeight"];
			tmpIcon.view.getView();
			tmpIcon.appendIcon();
			this.dataIconArray.push(tmpIcon);
		}
	}
}