essentialLibrary.webSockets.WebSocket = function (ip) {
	this.socket = new WebSocket("ws://" + ip + ":8080/WebGUI/ws");
	this.socket.binaryType = "arraybuffer";
	this.socket.onopen = function(message) {
		console.log("ws-open");
	};
	this.onmessage = function(message) {
		this.socket.onmessage(message);
	}
	this.onopen = function(func){
		console.log("ws-open");
		this.socket.onopen = func;
	}
	this.socket.onmessage = function(message) {
		if (message.isTrusted) {
			if (message.data == "ws-error") {
				location.reload();
			} else {
				var json = JSON.parse(message.data);
				if (json.receiving !== undefined) {
					json = json.receiving;
					eval(json.app + ".onMessage(" + JSON.stringify(json.data)
							+ ")");
				}
			}
		}
	};
	this.socket.onclose = function(message) {
		console.log("ws-close");
	};
	this.socket.onerror = function(message) {
		console.log("ws-error");
	};
	this.send = function(data) {
		var be = {};
		if(data.data instanceof ArrayBuffer){
			this.socket.send(data.data);
		} else {
			be.sending = data;
			this.socket.send(JSON.stringify(be));
		}
	}
}