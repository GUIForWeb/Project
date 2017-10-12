apps.themes.backgrounds.controllers.BgThemeDblclick = function(){
	this.imgFile = function(event){
		//set fbbrowser tag id
		console.log(event.currentTarget.parentNode);
		var fbId = parseInt(event.currentTarget.parentNode.id.replace("fbTable",""));
		console.log(fbId);
		var fb = taskArray.fileBrowser[fbId];
		console.log(fb);
		this.va["imgFileData"] = fb.controller.va["selectedData"][0];
		this.va["imgFileData"].id = fbId;
		this.socket.sender.imgFileData();
	}
}