system.desktops.subsystems.DesktopManager = function() {
	this.ds = new DesktopSender();
	this.ds.__proto__ = this;
	this.func = new DesktopFunction();
	this.func.__proto__ = this;
	this.xy = [];
	this.appendIcon = function(){
		for (ci = 0; ci < this.iconJSONArray.length; ci++) {
			var tmpIcon = new Icon();
			tmpIcon.contextPath = this.contextPath;
			tmpIcon.init(this.iconJSONArray[ci]);
			this.iconCoordinate[tmpIcon.x + "," + tmpIcon.y] = true;
			tmpIcon.view.iconTdBorderWidth = this.iconTdValueArray["iconTdBorderWidth"];
			tmpIcon.view.iconTdBorderHeight = this.iconTdValueArray["iconTdBorderHeight"];
			tmpIcon.view.getView();
			tmpIcon.appear();
			this.iconArray[tmpIcon.tagId] = tmpIcon;
		}
	}
	this.appendDataIcon = function(jsonArray){
		var dNum = jsonArray.length;
		this.rowNum = this.iconTable.children().length;
		for(di=0; di < jsonArray.length; di++) {
			var tmpIcon = new DataIcon();
			tmpIcon.contextPath = this.contextPath;
			tmpIcon.init(jsonArray[di]);
			this.filter(tmpIcon);
			tmpIcon.view.iconTdBorderWidth = this.iconTdValueArray["iconTdBorderWidth"];
			tmpIcon.view.iconTdBorderHeight = this.iconTdValueArray["iconTdBorderHeight"];
			tmpIcon.view.getView();
			tmpIcon.appear();
			this.iconArray[tmpIcon.tagId] = tmpIcon;
		}
		this.ds.dataIconXYs(this.xy);
	}
	this.delDataIcon = function(ids){
		ids = ids.split(",");
		for(ii=0; ii<ids.length; ii++){
			$("#dataIcon"+ids[ii]).remove();
		}
	}
	this.filter = function(tmpIcon){
		if(tmpIcon.y >= this.rowNum) 
			this.xy.push(this.changeCol(tmpIcon,-1,0));
		else if(this.iconCoordinate[tmpIcon.x + "," + tmpIcon.y]){
			this.xy.push(this.changeRow(tmpIcon,tmpIcon.x,tmpIcon.y));
		}
		else
			this.iconCoordinate[tmpIcon.x + "," + tmpIcon.y] = true;
	}
	this.changeCol = function(tmpIcon,x,y){
		x++;
		y=0;
		if(this.iconCoordinate[x + "," + y]) {
			return this.changeRow(tmpIcon,x,y);
		}
		else {
			this.iconCoordinate[x + "," + y] = true;
			tmpIcon.x = x;
			tmpIcon.y = y;
			return {"id":tmpIcon.id,"x":x,"y":y};
		}
	}
	this.changeRow = function(tmpIcon,x,y){
		y++;
		if(y >= this.rowNum) {
			return this.changeCol(tmpIcon,x,y);
		}
		else if(this.iconCoordinate[x + "," + y]){
			return this.changeRow(tmpIcon,x,y);
		}
		else {
			this.iconCoordinate[x + "," + y] = true;
			tmpIcon.x = x;
			tmpIcon.y = y;
			return {"id":tmpIcon.id,"x":x,"y":y};
		}
	}
}