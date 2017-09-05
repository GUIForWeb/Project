function FBSender(){
	this.x = function(){
		this.json.data = {"status":"x","data":{"id":this.id}};
		this.ws.send(this.json);
	}
	this.open = function(){
		this.json.data = {"status":"open","data":{"id":this.id,"name":this.va["selectedData"][0].name,"type":this.va["selectedData"][0].type}};
		this.ws.send(this.json);
	}
	this.newFolder = function(){
		this.json.data = {"status":"newFolder","data":{"id":this.id}};
		this.ws.send(this.json);
	}
	this.rename = function(){
		this.json.data = {"status":"rename","data":{"id":this.id,"src":this.va["prevData"][0].name,"dest":this.va["selectedData"][0].name}};
		console.log(this.json.data);
		this.ws.send(this.json);
	}
	this.del = function(){
		this.json.data = {"status":"del","data":{"id":this.id,"data":this.va["selectedData"]}};
		this.ws.send(this.json);
	}
	this.download = function(){
		this.json.data = {"status":"download","data":{"id":this.id,"data":this.va["selectedData"]}};
		this.ws.send(this.json);
	}
	this.cut = function(){
		this.json.data = {"status":"cut","data":{"id":this.id,"data":this.va["selectedData"]}};
		this.ws.send(this.json);
	}
	this.copy = function(){
		this.json.data = {"status":"copy","data":{"id":this.id,"data":this.va["selectedData"]}};
		console.log(this.json.data);
		this.ws.send(this.json);
	}
	this.paste = function(){
		this.json.data = {"status":"paste","data":{"id":this.id}};
		console.log(this.json.data);
		this.ws.send(this.json);
	}
}