system.elements.configures.subsystems.managers.ExecutionManager = function() {
	this.app = function(iconObj){
		this.iconObj = iconObj;
		switch(iconObj.tagIdRule){
			case "icon": 
				this.icon();
			break;
			case "dataIcon": 
				this.dataIcon();
			break;
		}
	}
	this.icon = function(){
		var winAndBarNode = this.winAndBar.manager.newWinAndBar(this.iconObj);
		this.winAndBar.repo.newWinAndBar(winAndBarNode);
	}
	this.dataIcon = function(){
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