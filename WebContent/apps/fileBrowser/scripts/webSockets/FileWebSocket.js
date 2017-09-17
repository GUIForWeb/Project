fileBrowser.webSockets.FileWebSocket = function(ip) {
	this.ip = ip;
	this.socket = new WebSocket("ws://" + this.ip + "/WebGUI/fs");
	this.socket.binaryType = "arraybuffer";
	this.send = function(data) {
		this.socket.send(data);
	}
	this.socket.onopen = function(event) {
		console.log("fm-open");
	};
	this.socket.onmessage = function(event) {
		if (event.isTrusted) {
			if (event.data == "error") {
				// location.reload();
			} else if (!(event.data instanceof ArrayBuffer)
					&& event.data.includes("receiving")) {
				var json = JSON.parse(event.data);
				taskArray["fileBrowser"][json.receiving.id].ws.onmessage(event);
			} else if (event.data instanceof ArrayBuffer) {
				this.json.data.data = event.data;
				taskArray["fileBrowser"][this.json.id].fbm.onMessage(this.json);
			}
		}
	};
	this.socket.onclose = function(message) {
		console.log("fm-close");
	};
	this.socket.onerror = function(message) {
		console.log("fm-error");
	};
	this.close = function() {
		this.socket.onclose();
		this.socket.onclose = null;
		this.socket.close();
	}
}