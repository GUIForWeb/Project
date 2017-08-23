function FBShipper(){
	this.open = function(id,name,type){
		this.json = {"status":"open","id":id,"name":name,"type":type};
		this.fbws.send(JSON.stringify(this.json));
	}
}