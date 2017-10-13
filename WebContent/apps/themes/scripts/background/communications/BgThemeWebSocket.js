apps.themes.backgrounds.communications.BgThemeWebSocket = function() {
	this.sender = new BgThemeSender();
	this.sender.__proto__ = this;
	this.receiver = new BgThemeReceiver();
	this.receiver.__proto__ = this;
	this.onMessage = function(json){
		switch(json.status){
			case "updateBgImg":
				this.receiver.updateBgImg();
				break;
		}
	}
}