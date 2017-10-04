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
			case "inode/directory":
				this.directory();
			break;
		}
	}
	this.text = function(){
		console.log(this.iconObj);
	}
	this.directory = function(){
		var name = this.iconObj.name;
		var path = "/Desktop/"+this.iconObj.name;
		var contentURL = "/apps/fileBrowser/comps/views/fileBrowser.jsf";
		this.iconObj.contentURL = contentURL+"?path="+encodeURIComponent(path);
		this.iconObj.name = "File Browser";
		this.icon();
		var win = this.nodeArray["winAndBar"].lastWin.win;
		win.contentURL = contentURL;
		var inputPath = win.view.contentSelector.find(".path");
		inputPath.val(path);
		this.iconObj.name = name;
	}
}