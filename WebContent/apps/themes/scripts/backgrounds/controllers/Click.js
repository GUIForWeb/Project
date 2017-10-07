	function Click(){
		this.changeBt = function(){
			if(this.__proto__.change != true){
				event.stopPropagation();
				var iconObj = new Icon();
				iconObj.contentURL = "/apps/fileBrowser/comps/views/fileBrowser.jsf";
				iconObj.name = "File Browser";
				var winAndBarNode = gui.winAndBar.manager.newWinAndBar(iconObj);
				gui.winAndBar.repo.newWinAndBar(winAndBarNode);
			}
		}
		this.emptyBt = function(){
			this.submit();
		}
	}