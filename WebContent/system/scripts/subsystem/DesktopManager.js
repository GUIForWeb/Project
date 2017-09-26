system.subsystem.DesktopManager = function() {
	this.xy = [];
	this.json = {
		"app" : "system.webSockets.DesktopWebSocket",
		"data" : {}
	}
	this.iconXY = function(json) {
		this.json.data = Object.assign({}, {
			"status" : "iconXY"
		}, json);
		this.ws.send(this.json);
	}
	this.dataIconXY = function(jsonArray) {
		this.json.data = Object.assign({}, {
			"status" : "dataIconXY"
		}, {"data":jsonArray});
		var json = this.json
		this.ws.onopen(function(){
			gui.ws.send(json);
		});
	}
	this.insertDataIcon = function(jsonArray){
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
			tmpIcon.appendIcon();
			this.dataIconArray.push(tmpIcon);
		}
		this.dataIconXY(this.xy);
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