function FBSender(){
	this.open = function(){
		this.json.data = {"status":"open","data":{"id":this.id,"name":this.va["clipboard"][0].name,"type":this.va["clipboard"][0].type}};
		this.ws.send(this.json);
	}
	this.newFolder = function(){
		this.json.data = {"status":"newFolder","data":{"id":this.id}};
		this.ws.send(this.json);
	}
	this.rename = function(){
		this.json.data = {"status":"rename","data":{"id":this.id,"src":this.va["prevValue"][0].name,"dest":this.va["clipboard"][0].name}};
		this.ws.send(this.json);
	}
	this.del = function(){
		this.json.data = {"status":"del","data":{"id":this.id,"name":this.va["clipboard"].name}};
		console.log(this.json);
		//this.ws.send(this.json);
	}
}