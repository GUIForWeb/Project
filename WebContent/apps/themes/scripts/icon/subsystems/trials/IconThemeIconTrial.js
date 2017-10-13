apps.themes.icons.subsystems.trials.IconThemeIconTrial = function() {
	this.xy = [];
	this.iconArray = [];
	this.iconCoordinate = [];
	this.appear = function() {
		this.appendIcon();
		this.appendDataIcon();
	}
	this.appendIcon = function(){
		this.iconArray = [];
		this.iconCoordinate = [];
		for (ci = 0; ci < gui.iconJSONArray.length; ci++) {
			var tmpIcon = new Icon();
			tmpIcon.contextPath = gui.contextPath;
			tmpIcon.init(gui.iconJSONArray[ci]);
			this.iconCoordinate[tmpIcon.x + "," + tmpIcon.y] = true;
			tmpIcon.view.width = this.va["td"]["iconTdWidth"];
			tmpIcon.view.height = this.va["td"]["iconTdHeight"];
			tmpIcon.appear();
		}
	}
	this.appendDataIcon = function(jsonArray){
		this.rowNum = this.va["table"].children().length;
		for(di=0; di < gui.dataIconJSONArray.length; di++) {
			var tmpIcon = new DataIcon();
			tmpIcon.contextPath = gui.contextPath;
			tmpIcon.init(gui.dataIconJSONArray[di]);
			this.filter(tmpIcon);
			tmpIcon.view.width = this.va["td"]["iconTdWidth"];
			tmpIcon.view.height = this.va["td"]["iconTdHeight"];
			tmpIcon.appear();
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