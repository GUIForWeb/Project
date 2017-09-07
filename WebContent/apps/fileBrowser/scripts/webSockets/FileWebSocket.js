function FileWebSocket(ip){
	this.ip = ip;
	this.socket = new WebSocket("ws://"+this.ip+"/WebGUI/fs");
	this.socket.binaryType = "arraybuffer";
	this.send = function(data) {
		this.socket.send(data);
	}
	this.socket.onopen = function(event){
		console.log("fm-open");
	};
	this.socket.onmessage = function(message){
		if(message.isTrusted){
			if(message.data == "error"){
				//location.reload();
			}
			else {
				gui.ws.onmessage(message);
			}
		}
	};
	this.socket.onclose = function(message){ 
		console.log("fm-close");
	};
	this.socket.onerror = function(message){
		console.log("fm-error");
	};
	this.close = function(){
		this.socket.onclose();
		this.socket.onclose = null;
		this.socket.close();
	}
}