apps.themes.backgrounds.controllers.BgThemeClick = function(){
	this.changeBt = function(){
		if(this.__proto__.change != true){
			event.stopPropagation();
			var iconObj = new Icon();
			iconObj.contentURL = "/apps/fileBrowser/comps/views/fileBrowser.jsf";
			iconObj.name = "File Browser";
			iconObj.options["fileSort"] = "/apps/themes/scripts/background/events/bgThemeFileSortOption.js";
			iconObj.options["dblclick"] = "/apps/themes/scripts/background/events/bgThemeDblclickOption.js";
			var winAndBarNode = gui.winAndBar.manager.newWinAndBar(iconObj);
			gui.winAndBar.repo.newWinAndBar(winAndBarNode);
		}
	}
	this.emptyBt = function(){
		this.socket.sender.empty();
	}
}