apps.themes.icons.controllers.focuses.IconThemeBlur = function() {
	this.inputText = function(event) {
		this.setScriptTag(event.target);
		var dir = this.tag["s"].attr("dir");
		var prevVal = this.va["prevData"][dir];
		var presVal = this.tag["s"].val();
		if(prevVal != presVal){
			this.va["prevData"][dir] = presVal;
			this.applyTheme(dir,presVal);
		}
	}
	this.applyTheme = function(name,val) {
		switch(name){
			case "border_width":
				this.applyBorderWidth(val);
				break;
			case "border_height":
				this.applyBorderHeight(val);
				break;
			case "border_color":
				this.applyBorderColor(val);
				break;
			case "width":
				this.applyWidth(val);
				break;
			case "height":
				this.applyHeight(val);
				break;
		}
	}
	this.applyBorderWidth = function(val){
		var height = this.va["prevData"]["border_height"];
		this.tds.removeAttr("style");
		var style = "border-left-width:"+val+ "px;"+"border-right-width:"+val+ "px;";
		style += "border-bottom-width:"+height+ "px;"+"border-top-width:"+height+ "px;";
		this.tds.attr("style",style)
	}
	this.applyBorderHeight = function(val){
		var width = this.va["prevData"]["border_width"];
		this.tds.removeAttr("style");
		var style = "border-bottom-width:"+val+ "px;"+"border-top-width:"+val+ "px;";
		style += "border-left-width:"+width+ "px;"+"border-right-width:"+width+ "px;";
		this.tds.attr("style",style)
	}
	this.applyBorderColor = function(val){
		this.tds.css("border-color",val);
	}
	this.applyWidth = function(val){
		var tmpIcon = null;
		this.tds.width(val);
		for(key in gui.iconIdArray){
			tmpIcon = gui.iconArray[gui.iconIdArray[key]];
			tmpIcon.disappear();
			tmpIcon.view.width = val;
			tmpIcon.appear();
		}
	}
	this.applyHeight = function(val){
		var tmpIcon = null;
		this.tds.height(val);
		for(key in gui.iconIdArray){
			tmpIcon = gui.iconArray[gui.iconIdArray[key]];
			tmpIcon.disappear();
			tmpIcon.view.height = val;
			tmpIcon.appear();
		}
	}
}