function FBManager(){
	this.send = new FBSender();
	this.send.__proto__ = this;
	this.receive = new FBReceiver();
	this.receive.__proto__ = this;
	this.onMessage = function(json){
		switch(json.status) {
		    case "open":
		        this.receive.open(json.data);
		        break;
		}
	}
}