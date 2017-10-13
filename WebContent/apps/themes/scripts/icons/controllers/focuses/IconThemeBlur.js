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
				this.tryBorderWidth(val);
				break;
			case "border_height":
				this.tryBorderHeight(val);
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
	this.tryBorderWidth = function(val){
		this.trial.tryTd.borderWidth(val);
		this.trial.tryIcon.appear();
	}
	this.tryBorderHeight = function(val){
		this.trial.tryTd.borderHeight(val);
		this.trial.tryIcon.appear();
	}
	this.applyBorderColor = function(val){
		this.va.tds.css("border-color",val);
	}
	this.applyWidth = function(val){
		this.trial.tryTd.width(val);
		this.trial.tryIcon.appear();
	}
	this.applyHeight = function(val){
		this.trial.tryTd.height(val);
		this.trial.tryIcon.appear();
	}
}