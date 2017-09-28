system.winsAndBars.subsystems.AppManager = function() {
	this.run = function(iconObj){
		this.iconObj = iconObj;
		switch(iconObj.tagIdRule){
			case "icon": 
				this.app();
			break;
			case "dataIcon": 
				this.content();
			break;
		}
	}
	this.app = function(){
		var winAndBarNode = this.gm.newWinAndBar(this.iconObj);
		this.gr.newWinAndBar(winAndBarNode);
	}
	this.content = function(){
		switch(this.iconObj.type) {
			case "text/plain":
				this.text();
			break;
		}
	}
	this.text = function(){
		console.log(this.iconObj);
	}
}