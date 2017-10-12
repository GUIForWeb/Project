apps.themes.backgrounds.controllers.BgThemeDblclick = function(){
	this.imgFile = function(event){
		var fbId = parseInt(event.currentTarget.parentNode.id.replace("fbTable",""));
		var fb = taskArray.fileBrowser[fbId];
		this.va["imgFileData"] = fb.controller.va["selectedData"][0];
		this.va["imgFileData"].id = fbId;
		this.socket.sender.imgFileData();
		/*
		system["fileBrowser"]["default"].submit("option",id+"&"+tag.children[0].innerHTML);
		system["fileBrowser"][id].close();
		this.__proto__.change = false;
		this.submit();
		//this.__proto__.change = false;
		//submit background change to bgTheme
		*/
	}
}