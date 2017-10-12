apps.themes.backgrounds.controllers.BgThemeDblclick = function(){
	this.imgFile = function(event){
		//set fbbrowser tag id
		var fbId = parseInt(event.currentTarget.parentNode.parentNode.id.replace("fbTable",""));
		var fb = taskArray.fileBrowser[fbId];
		this.va["imgFileData"] = fb.controller.va["selectedData"][0];
		this.va["imgFileData"].id = fbId;
		this.socket.sender.imgFileData();
	}
}