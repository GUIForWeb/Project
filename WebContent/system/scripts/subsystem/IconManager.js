function IconManager(){
	this.json = {"app":"system.controller.IconManager","data":{}}
	this.iconXY = function(json){
		console.log(json);
		this.json.data = Object.assign({},{"status":"iconXY"},json);
		this.ws.send(this.json);
	}
}