function FBWebSocket(ws){
	this.ws = ws;
	this.ws.onopen = function(message){ 
		console.log("open");
	};
	this.ws.onmessage = function(message){
		/*
		var json = JSON.parse(message.data);
		taskArray["fileBrowser"][json.id].fbm.json = json;
		taskArray["fileBrowser"][json.id].fbm.receive.command();
		*/
	};
	this.ws.onclose = function(message){ 
		console.log("close");
	};
	this.ws.onerror = function(message){
		console.log("error");
	};
	this.send = function(json){
		this.ws.send(json)
	}
}