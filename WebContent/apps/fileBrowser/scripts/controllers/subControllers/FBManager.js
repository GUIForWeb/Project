function FBManager(){
	this.json = {};
	this.json.app = "apps.fileBrowser.webSocket.FBWebSocket";
	this.send = new FBSender();
	this.send.__proto__ = this;
	this.receive = new FBReceiver();
	this.receive.__proto__ = this;
	this.onMessage = function(json){
		switch(json.status) {
		    case "reload":
		        this.receive.reload(json.data);
		        break;
		}
	}
}