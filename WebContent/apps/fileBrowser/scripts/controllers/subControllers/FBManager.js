function FBManager(){
	this.json = {};
	this.send = new FBShipper();
	this.send.__proto__ = this;
	this.receive = new FBReceiver();
	this.receive.__proto__ = this;
}