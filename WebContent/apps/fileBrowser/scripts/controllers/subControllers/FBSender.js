function FBSender(){
	this.open = function(id,name,type){
		var json = {};
		json.app = "apps.fileBrowser.webSocket.FBWebSocket";
		json.data = {"status":"open","data":{"id":id,"name":name,"type":type}};
		this.ws.send(json);
	}
}