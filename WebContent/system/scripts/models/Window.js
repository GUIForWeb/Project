system.models.Window = function() {
	this.tagIdRule = "window";
	this.numId = 0;
	this.tagId = "";
	this.name = "";
	this.view = new WindowView(this);
	this.appendWindow = function(){
		if(this.view.isOnScreen)
			this.windowZoneSelector.append(this.view.windowSelector);
		this.tag = this.view.windowSelector[0];
		this.selector = this.view.windowSelector;
	}
	this.init = function(numId){
		this.numId = numId;
		this.tagId = this.tagIdRule + numId;
		this.view.getView();
	}
	this.restoreModel = function(winMap){
		this.view.isFullScreen = (winMap["isFullScreen"] == true);
		this.view.isOnScreen = (winMap["isOnScreen"] == true);
		this.name = winMap["name"];
		this.view.content = decodeURIComponent(winMap["content"]);
		this.contentURL = winMap["contentURL"]; 
	}
	this.addEvent = function(status,data){
		func = data.func
		delete data.func;
		if(status == "x"){
			this.view.xButtonSelector.click(data,function(event){
				eval(func);
			});
		} 	
	}
}	
